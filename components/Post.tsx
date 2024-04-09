"use client";

import { MessageSquare } from "lucide-react";
import PhotoCarousel from "./carousel/PhotoCarousel";
import { Like, Photo, Post, User } from "@prisma/client";
import { FC, useRef } from "react";
import { formatTimeToNow } from "@utils/utils";
import { PostLikeClient } from "./like";
import Link from "next/link";

interface PostProps {
  post: Post & {
    user: User;
    Like: Like[];
    photos: Photo[];
  };
  commentAmount: number;
  likesAmount: number;
  currentLike?: boolean | null;
}

export const PostComponent: FC<PostProps> = ({
  post,
  commentAmount,
  likesAmount,
  currentLike,
}) => {
  const postRef = useRef<HTMLDivElement>(null);
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <span>
              Posted by{" "}
              <Link href={`/user/${post.user.name}`}>u/{post.user.name}</Link>
            </span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          <a href={`/post/${post.id}`}>
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
        <PostLikeClient
          initialLikesAmount={likesAmount}
          postId={post.id}
          initialLike={currentLike}
        />
        <p className="text-opacity-70 text-black">&#x2022;</p>
        <a href={`/post/${post.id}`} className="w-fit flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          {commentAmount} comments
        </a>
      </div>
    </div>
  );
};

export default PostComponent;
