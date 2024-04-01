import { Post } from "./Post";
export const PostFeed = () => {
  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      <Post />
    </ul>
  );
};
