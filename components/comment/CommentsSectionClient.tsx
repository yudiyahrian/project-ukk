import { Session } from "next-auth";
import { ExtendedComment } from "../../types/prisma";
import PostComment from "./PostComment";

type Props = {
  initialComments: ExtendedComment[];
  session: Session | null;
  postId: string;
};
export const CommentSectionClient = ({ ...props }: Props) => {
  return (
    <div className="flex flex-col gap-y-6 mt-4">
      {props.initialComments
        .filter((comment) => !comment.replyToId)
        .map((topLevelComment) => {
          const topLevelCommentLikesAmount = topLevelComment.CommentLike.length;

          const topLevelCommentLike = topLevelComment.CommentLike.find(
            (like) => like.userId === props.session?.user.id
          );

          return (
            <div key={topLevelComment.id} className="flex flex-col">
              <div className="mb-2">
                <PostComment
                  postId={props.postId}
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
                    (like) => like.userId === props.session?.user.id
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
                        postId={props.postId}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
