import PhotoCarousel from "@components/carousel/PhotoCarousel";
import CommentsSection from "@components/comment/CommentsSection";
import PostLikeServer from "@components/like/PostLikeServer";
import { Photo, Post } from "@prisma/client";
import { prisma } from "@utils/prisma";
import { formatTimeToNow } from "@utils/utils";
import { format } from "date-fns";
import { Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  let post: (Post & { photos: Photo[] }) | null = null;

  post = await prisma.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      photos: true,
    },
  });

  if (!post) return notFound();

  const user = await prisma.user.findFirst({
    where: {
      id: post.userId,
    },
    include: {
      Follower: true,
      Post: true,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
      replyToId: undefined,
    },
    include: {
      user: true,
      CommentLike: true,
      replies: {
        include: {
          user: true,
          CommentLike: true,
        },
      },
    },
  });

  return (
    <div className="sm:container max-w-7xl h-full pt-12">
      <div>
        {/* TODO: BUTTON TO TAKE US BACK */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">
            <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
              <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
                <Link
                  href={`/user/${user && user.name}`}
                  className="max-h-40 mt-1 truncate text-xs text-gray-500"
                >
                  Posted by u/{user?.name}{" "}
                  {formatTimeToNow(new Date(post?.createdAt))}
                </Link>
                <h1 className="text-xl font-semibold pt-1 leading-6 text-gray-900">
                  {post?.title}
                </h1>

                {post.description && (
                  <p className="text-zinc-500 pt-2 text-sm">
                    {post.description}
                  </p>
                )}

                {post.photos.length !== 0 && (
                  <div className="relative text-sm pt-2 h-fit w-full">
                    <PhotoCarousel photos={post.photos} />
                  </div>
                )}

                <div className="flex gap-2 z-20 text-sm mt-5">
                  <Suspense fallback={<PostLikeShell />}>
                    <PostLikeServer
                      postId={post?.id}
                      getData={async () => {
                        return await prisma.post.findUnique({
                          where: {
                            id: params.postId,
                          },
                          include: {
                            Like: true,
                          },
                        });
                      }}
                    />
                  </Suspense>
                  <p className="text-opacity-70 text-black">&#x2022;</p>
                  <span className="w-fit flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {comments.length} comments
                  </span>
                </div>

                <Suspense
                  fallback={
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                  }
                >
                  <CommentsSection postId={post.id} comments={comments} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* INFO SIDEBAR */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About this post</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created at</dt>
                <dd className="text-gray-700">
                  {post && format(post.createdAt, "MMMM d, yyyy")}
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created by</dt>
                <dd className="text-gray-700">
                  <Link
                    href={`/user/${user && user.name}`}
                    className="text-gray-900"
                  >
                    u/{user && user.name}
                  </Link>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Follower</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">
                    {user && user.Follower.length}
                  </div>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Posts</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">
                    {user && user.Post.length}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

function PostLikeShell() {
  return (
    <div className="w-fit flex items-center gap-2">
      <button className="inline-flex items-center justify-center transition-colors gap-2">
        <Loader2 className="h-4 w-5 animate-spin text-zinc-500" />
      </button>
    </div>
  );
}

export default Page;
