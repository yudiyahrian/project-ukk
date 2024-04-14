"use client";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { PostSaveValidator } from "@utils/validators/post";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

interface SavePostButtonProps {
  postId?: string | null;
  photoId?: string | null;
  initialSaved?: boolean | null;
}

const SavedPostButton: FC<SavePostButtonProps> = ({
  postId,
  photoId,
  initialSaved,
}) => {
  const { loginToast } = useCustomToast();
  const [currentSaved, setCurrentSaved] = useState(initialSaved);
  const prevSaved = usePrevious(currentSaved);
  const router = useRouter();

  useEffect(() => {
    setCurrentSaved(initialSaved);
  }, [initialSaved]);

  const { mutate: save } = useMutation({
    mutationFn: async (saved: boolean) => {
      const payload: PostSaveValidator = {
        saved,
        postId,
        photoId,
      };

      const res = await fetch(`/api/post/save`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setCurrentSaved(prevSaved);
        if (res.status === 401) {
          return loginToast();
        } else {
          return toast({
            title: "Something went wrong",
            description: "Save failed, please try again",
            variant: "destructive",
          });
        }
      }
      router.refresh();
    },
    onMutate: (saved: boolean) => {
      // Toggle current saved state
      setCurrentSaved(saved);
    },
  });

  return (
    <div className="ml-auto">
      <button className="transition-colors" onClick={() => save(!currentSaved)}>
        <Bookmark
          className={cn("h-5 w-5 text-zinc-700", {
            "text-blue-600 fill-blue-600": currentSaved,
          })}
        />
      </button>
    </div>
  );
};

export default SavedPostButton;
