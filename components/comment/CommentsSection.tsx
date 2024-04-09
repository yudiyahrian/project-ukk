import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";
// import CreateComment from "./CreateComment";
// import PostComment from "./PostComment";

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const session = await getAuthSession();

  const comments = await prisma.comment.findMany({
    where: {
      postId,
      // "replyToId: null" prevents gettin comments. Instead, i used "replyToId: undefined".
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
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px mb-4" />

      <CreateComment postId={postId} />

      <div className="flex flex-col gap-y-6 mt-4">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentLikesAmount =
              topLevelComment.CommentLike.length;

            const topLevelCommentLike = topLevelComment.CommentLike.find(
              (like) => like.userId === session?.user.id
            );

            return (
              <div key={topLevelComment.id} className="flex flex-col">
                <div className="mb-2">
                  <PostComment
                    postId={postId}
                    likesAmount={topLevelCommentLikesAmount}
                    currentLike={topLevelCommentLike}
                    comment={topLevelComment}
                  />
                </div>

                {/* render replies */}
                {topLevelComment.replies
                  .sort((a, b) => b.CommentLike.length - a.CommentLike.length)
                  .map((reply) => {
                    const replyLikesAmount = reply.CommentLike.length;

                    const replyLike = reply.CommentLike.find(
                      (like) => like.userId === session?.user.id
                    );

                    return (
                      <div
                        key={reply.id}
                        className="ml-2 py-2 pl-4 border-l-2 border-zinc-200"
                      >
                        <PostComment
                          comment={reply}
                          currentLike={replyLike}
                          likesAmount={replyLikesAmount}
                          postId={postId}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentsSection;
