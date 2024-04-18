import {
  Comment,
  Post,
  User,
  Like,
  Photo,
  UserSaved,
  Album,
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
