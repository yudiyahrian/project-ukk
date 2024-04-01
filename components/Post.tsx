import { LucideThumbsUp, MessageSquare } from "lucide-react";

export const Post = () => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="hidden md:block">
          {/* <PostVoteClient
                initialVotesAmount={votesAmount}
                postId={post.id}
                initialVote={currentVote?.type}
              /> */}
        </div>

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <span>Posted by u/MikuChan</span> 26 November 2023
          </div>

          <a href={``}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              Title
            </h1>
          </a>

          <div className="relative text-sm max-h-40 w-full overflow-clip">
            {/* <EditorOutput content={post.content} />
                {postRef.current?.clientHeight === 160 ? (
                  <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
                ) : null} */}
          </div>
        </div>
      </div>

      <div className="flex gap-2 bg-gray-50 z-20 text-sm p-4 sm:px-6">
        <a href="" className="w-fit flex items-center gap-2">
          <LucideThumbsUp className="h-4 w-4" />0 likes
        </a>
        <p className="text-opacity-70 text-black">&#x2022;</p>
        <a href="" className="w-fit flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />0 comments
        </a>
      </div>
    </div>
  );
};
