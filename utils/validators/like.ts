import { z } from "zod";

export const PostLikeValidator = z.object({
  postId: z.string(),
  liked: z.boolean(),
});

export type PostLikeRequest = z.infer<typeof PostLikeValidator>;

export const CommentLikeValidator = z.object({
  commentId: z.string(),
  liked: z.boolean(),
});

export type CommentLikeRequest = z.infer<typeof CommentLikeValidator>;
