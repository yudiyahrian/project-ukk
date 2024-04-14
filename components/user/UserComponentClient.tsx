"use client";

import { FC, useRef } from "react";
import { ExtendedPost } from "../../types/prisma";
import PostComponent from "../Post";
import { useSession } from "next-auth/react";

interface PostComponentClientProps {
  posts: ExtendedPost[];
}

const PostComponentClient: FC<PostComponentClientProps> = ({ posts }) => {
  const ref = useRef<(HTMLElement | null)[]>([]);

  const { data: session } = useSession();

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const likesAmount = post.Like.length;
        const commentsAmount = post.Comment.length;

        const currentLike = post.Like.find(
          (like) => like.userId === session?.user.id
        );
        const savedExist = post.UserSaved.find(
          (save) => save.userId === session?.user.id
        );

        const currentSaved = !!savedExist;

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={(el) => (ref.current[index] = el)}>
              <PostComponent
                post={post}
                likesAmount={likesAmount}
                commentAmount={commentsAmount}
                currentLike={currentLike?.liked}
                currentSaved={currentSaved}
              />
            </li>
          );
        }

        return (
          <PostComponent
            key={post.id}
            post={post}
            likesAmount={likesAmount}
            commentAmount={commentsAmount}
            currentLike={currentLike?.liked}
            currentSaved={currentSaved}
          />
        );
      })}
    </ul>
  );
};

export default PostComponentClient;
