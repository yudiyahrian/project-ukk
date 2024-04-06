import { Comment, Post, User, Like, Photo } from "@prisma/client";

export type ExtendedPost = Post & {
  photos: Photo[];
  Like: Like[];
  user: User;
  Comment: Comment[];
};
