import { getAuthSession } from "@/utils/auth";
import { Post, Like } from "@prisma/client";
import { notFound } from "next/navigation";
import PostLikeClient from "./PostLikeClient";

interface PostLikeServerProps {
  postId: string;
  initialLikesAmount?: number;
  initialLike?: boolean | null;
  getData?: () => Promise<(Post & { Like: Like[] }) | null>;
}

const PostLikeServer = async ({
  postId,
  initialLikesAmount,
  initialLike,
  getData,
}: PostLikeServerProps) => {
  const session = await getAuthSession();

  let likesAmount: number = 0;
  let currentLike: boolean | null | undefined = undefined;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    likesAmount = post.Like.length;

    currentLike = post.Like.find(
      (like) => like.userId === session?.user?.id
    )?.liked;
  } else {
    likesAmount = initialLikesAmount!;
    currentLike = initialLike;
  }

  return (
    <PostLikeClient
      postId={postId}
      initialLikesAmount={likesAmount}
      initialLike={currentLike}
    />
  );
};

export default PostLikeServer;
