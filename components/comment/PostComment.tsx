"use client";

import { FC, useRef, useState } from "react";
import UserAvatar from "../UserAvatar";
import { Comment, CommentLike, User } from "@prisma/client";
import { formatTimeToNow } from "@/utils/utils";
import { Button, Label, Textarea } from "../ui";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/utils/validators/comment";
import { toast } from "@/hooks/use-toast";
import CommentLikes from "./CommentLikes";

type ExtendedComment = Comment & {
  CommentLike: CommentLike[];
  user: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  likesAmount: number;
  currentLike: CommentLike | undefined;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  likesAmount,
  currentLike,
  postId,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const { mutate: postComment, isPending } = useMutation({
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

      return res;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Comment could not posted successfully, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setIsReplying(false);
      router.refresh();
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.user.name || null,
            image: comment.user.image || null,
          }}
          className="h-6 w-6"
        />

        <div className="ml-2 flex items-center gap-x-2">
          <p className="tesx-sm font-medium text-gray-900">
            u/{comment.user.name}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 my-2">{comment.content}</p>

      <div className="flex gap-2 items-center flex-wrap">
        <CommentLikes
          commentId={comment.id}
          initialLikesAmount={likesAmount}
          initialLike={currentLike?.liked}
        />

        <p className="text-opacity-70 text-black">&#x2022;</p>

        <button
          onClick={() => {
            if (!session) return router.push("/sign-in");
            setIsReplying(true);
          }}
          className="inline-flex items-center justify-center transition-colors gap-2 text-sm"
        >
          <MessageSquare className="h-4 w-4" />
          Reply
        </button>

        {isReplying ? (
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

              <div className="mt-2 flex gap-2 justify-end">
                <Button
                  tabIndex={-1}
                  variant="subtle"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isPending}
                  disabled={input.length === 0}
                  onClick={() => {
                    if (!input) return;
                    postComment({
                      postId,
                      content: input,
                      replyToId: comment.replyToId ?? comment.id,
                    });
                    setInput("");
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostComment;
