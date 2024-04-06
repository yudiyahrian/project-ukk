"use client";

import { LucideThumbsUp, MessageSquare } from "lucide-react";
import PhotoCarousel from "./carousel/PhotoCarousel";
import { Like, Photo, Post, User } from "@prisma/client";
import { FC, useRef } from "react";
import { formatTimeToNow } from "@utils/utils";

interface PostProps {
  post: Post & {
    user: User;
    Like: Like[];
    photos: Photo[];
  };
  commentAmount: number;
  LikesAmount: number;
  currentLike?: Like;
}

export const PostComponent: FC<PostProps> = ({
  post,
  commentAmount,
  LikesAmount,
  currentLike,
}) => {
  const postRef = useRef<HTMLDivElement>(null);
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <span>Posted by u/{post.user.name}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          <a href={``}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>

          {post.description && (
            <p className="text-zinc-500 text-sm">{post.description}</p>
          )}

          {post.photos.length !== 0 && (
            <div className="relative text-sm h-fit w-full" ref={postRef}>
              <PhotoCarousel photos={post.photos} />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 bg-gray-50 z-20 text-sm p-4 sm:px-6">
        <a href="" className="w-fit flex items-center gap-2">
          <LucideThumbsUp className="h-4 w-4" /> {LikesAmount} likes
        </a>
        <p className="text-opacity-70 text-black">&#x2022;</p>
        <a href="" className="w-fit flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          {commentAmount} comments
        </a>
      </div>
    </div>
  );
};

export default PostComponent;
