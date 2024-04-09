"use client";

import { FC, useState } from "react";
import { Button, Label, Textarea } from "../ui";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/utils/validators/comment";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: comment, isPending } = useMutation({
    mutationFn: async ({ postId, content, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        content,
        replyToId,
      };

      const res = await fetch(`/api/post/comment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          return loginToast();
        } else {
          return toast({
            title: "Something went wrong",
            description: "Your like was not registered, please try again",
            variant: "destructive",
          });
        }
      }

      return res;
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isPending}
            disabled={input.length === 0}
            onClick={() => comment({ postId, content: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
