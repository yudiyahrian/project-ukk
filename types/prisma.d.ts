import {
  Comment,
  Post,
  User,
  Like,
  Photo,
  UserSaved,
  Album,
  CommentLike,
} from "@prisma/client";

export type ExtendedPost = Post & {
  photos: Photo[];
  Like: Like[];
  user: User;
  Comment: Comment[];
  UserSaved: UserSaved[];
};

export type ExtendedAlbum = Album & {
  photos: Photo[];
};

export type CommentBase = Comment & {
  user: User;
  CommentLike: CommentLike[];
};
export type ExtendedComment = CommentBase & {
  replies: CommentBase[];
};
