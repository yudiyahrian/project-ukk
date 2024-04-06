"use client";

import { FC, useEffect, useRef } from "react";
import { ExtendedPost } from "../types/prisma";
import PostComponent from "./Post";
import { useIntersection } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@utils/config";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const getPosts = async ({ pageParam = 1 }) => {
    const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

    const res = await fetch(query);
    const data = await res.json();
    return data as ExtendedPost[];
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-query"],
    queryFn: getPosts,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: () => {
      return {
        pageParams: [1],
        pages: [initialPosts],
      };
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  // flatMap does the same thing with map but more performance
  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const likesAmount = post.Like.length;
        const commentsAmount = post.Comment.length;

        const currentLike = post.Like.find(
          (like) => like.userId === session?.user.id
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <PostComponent
                post={post}
                LikesAmount={likesAmount}
                commentAmount={commentsAmount}
                currentLike={currentLike}
              />
            </li>
          );
        }

        return (
          <PostComponent
            key={post.id}
            post={post}
            LikesAmount={likesAmount}
            commentAmount={commentsAmount}
            currentLike={currentLike}
          />
        );
      })}
    </ul>
  );
};

export default PostFeed;
