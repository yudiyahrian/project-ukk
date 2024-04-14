import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/utils/config";
import { prisma } from "@/utils/prisma";
import PostFeed from "./PostFeed";

type Props = {};

const GeneralFeed = async (props: Props) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Like: true,
      user: true,
      Comment: true,
      photos: true,
      UserSaved: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });
  return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
