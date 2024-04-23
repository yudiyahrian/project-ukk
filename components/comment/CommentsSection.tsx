"use client";

import React, { useState } from "react";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";
import { useSession } from "next-auth/react";
import { ExtendedComment } from "../../types/prisma";

interface CommentsSectionProps {
  postId: string;
  comments: ExtendedComment[];
}

const CommentsSection = ({ postId, comments }: CommentsSectionProps) => {
  const [displayedComments, setDisplayedComments] = useState(5); // Initial number of comments to display
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [seeReplies, setSeeReplies] = useState<{
    [commentId: string]: boolean;
  }>({}); // State to manage open/close state of replies

  const loadMoreComments = () => {
    setLoading(true);
    setDisplayedComments(displayedComments + 5); // Increase the number of displayed comments by 2
    setLoading(false);
  };

  const toggleReplies = (commentId: string) => {
    setSeeReplies((prevSeeReplies) => {
      const isOpen = prevSeeReplies[commentId]
        ? !prevSeeReplies[commentId]
        : true;
      return { ...prevSeeReplies, [commentId]: isOpen };
    });
  };

  const commentsToShow = comments
    .filter((comment) => !comment.replyToId)
    .slice(0, displayedComments);

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px mb-4" />

      <CreateComment postId={postId} />

      <div className="flex flex-col gap-y-6 mt-4">
        {commentsToShow.map((topLevelComment) => {
          const topLevelCommentLikesAmount = topLevelComment.CommentLike.length;

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

              {/* See Replies Button */}
              {topLevelComment.replies.length !== 0 && (
                <button
                  onClick={() => toggleReplies(topLevelComment.id)}
                  className="flex justify-start mb-2 text-sm hover:text-blue-500"
                >
                  {seeReplies[topLevelComment.id]
                    ? "Hide Replies"
                    : `See ${topLevelComment.replies.length} Replies`}
                </button>
              )}

              {/* render replies if See Replies button is clicked */}
              {seeReplies[topLevelComment.id] && (
                <div className="ml-2 py-2 pl-4 border-l-2 border-zinc-200">
                  {topLevelComment.replies
                    .sort((a, b) => b.CommentLike.length - a.CommentLike.length)
                    .map((reply) => {
                      const replyLikesAmount = reply.CommentLike.length;
                      const replyLike = reply.CommentLike.find(
                        (like) => like.userId === session?.user.id
                      );

                      return (
                        <div className="mb-2">
                          <PostComment
                            key={reply.id}
                            comment={reply}
                            currentLike={replyLike}
                            likesAmount={replyLikesAmount}
                            postId={postId}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {comments.length > displayedComments && (
        <LoadMoreButton onClick={loadMoreComments} loading={loading} />
      )}
    </div>
  );
};

const LoadMoreButton = ({ onClick, loading }: any) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex justify-start mb-2 text-sm hover:text-blue-500"
  >
    {loading ? "Loading..." : "Load more comment"}
  </button>
);

export default CommentsSection;
