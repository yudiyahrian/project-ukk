"use client";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { LucideThumbsUp } from "lucide-react";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { PostLikeRequest } from "@/utils/validators/like";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface PostLikeClientProps {
  postId: string;
  initialLikesAmount: number;
  initialLike?: boolean | null;
}

const PostLikeClient: FC<PostLikeClientProps> = ({
  postId,
  initialLikesAmount,
  initialLike,
}) => {
  const { loginToast } = useCustomToast();
  const [likesAmount, setLikesAmount] = useState<number>(initialLikesAmount);
  const [currentLike, setCurrentLike] = useState(initialLike);
  const prevLike = usePrevious(currentLike);

  const router = useRouter();

  useEffect(() => {
    setCurrentLike(initialLike);
  }, [initialLike]);

  const { mutate: like } = useMutation({
    mutationFn: async (liked: boolean) => {
      const payload: PostLikeRequest = {
        postId,
        liked,
      };

      const res = await fetch(`/api/post/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setLikesAmount((prev) => Math.max(0, prev - 1));
        setCurrentLike(prevLike);
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

      router.refresh();
    },
    onMutate: (liked: boolean) => {
      // Update likes amount based on like/unlike operation
      if (liked) {
        setLikesAmount((prev) => prev + 1); // Increment likes when liking
      } else {
        setLikesAmount((prev) => Math.max(0, prev - 1)); // Decrement likes when unliking, ensuring it never goes below 0
      }

      // Toggle current like state
      setCurrentLike(liked);
    },
  });

  return (
    <div className="w-fit flex items-center gap-2">
      <button
        className="inline-flex items-center justify-center transition-colors gap-2"
        onClick={() => like(!currentLike)}
      >
        <LucideThumbsUp
          className={cn("h-4 w-4 text-zinc-700", {
            "text-blue-600 fill-blue-600": currentLike,
          })}
        />{" "}
        {likesAmount} likes
      </button>
    </div>
  );
};

export default PostLikeClient;
