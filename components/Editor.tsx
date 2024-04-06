"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostCreationRequest, PostValidator } from "@/utils/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import type EditorJS from "@editorjs/editorjs";
import { useEdgeStore } from "@/utils/edgestore";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface EditorProps {
  userId: string;
}

const Editor: FC<EditorProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      userId,
      title: "",
      description: null,
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const _descriptionRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        defaultBlock: "image",
        minHeight: 0,
        data: {
          blocks: [],
        },
        tools: {
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const res = await edgestore.myPublicImages.upload({
                    file,
                    input: { type: "post" },
                  });
                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      userId,
      description,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        userId,
        title,
        description,
        content,
      };
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return res;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published, please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // r/mycommunity/submit into r/mycommunity;
      router.push("/");
      router.refresh();

      return toast({
        description: "Your post has been published.",
      });
    },
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      description: data.description,
      content: blocks,
      userId,
    };

    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");
  const { ref: descriptionRef, ...props } = register("description");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <TextareaAutosize
        ref={(e) => {
          titleRef(e);

          // @ts-ignore
          _titleRef.current = e;
        }}
        {...rest}
        placeholder="Title"
        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
      />
      <hr className="border-0 border-b-[.065rem] border-solid border-b-black/10 mb-3" />
      <form
        id="breadit-post-form"
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextareaAutosize
          ref={(e) => {
            descriptionRef(e);

            // @ts-ignore
            _descriptionRef.current = e;
          }}
          {...props}
          placeholder="Description"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-base focus:outline-none"
        />
        <div className="prose prose-stone dark:prose-invert w-1/2">
          <div id="editor" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
