
import PostBtn from "@/components/PostBtn";
import ChangeFeedBtn from "./components/ChangeFeedBtn";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <div className="w-full h-full relative flex justify-center">
      <ChangeFeedBtn />

      <div className='flex flex-col gap-2 w-1/2 h-full px-4'>
        <PostBtn />
        <Feed />
      </div>
    </div>
  );
}
