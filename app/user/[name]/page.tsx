import { Empty } from "@components/user/Empty";
import { prisma } from "@/utils/prisma";
import PostComponentClient from "@components/user/UserComponentClient";

type Props = {
  params: { name: string };
};

const OverView = async (props: Props) => {
  const formattedUrl = decodeURIComponent(props.params.name);
  const userData = await prisma.user.findUnique({
    where: {
      name: formattedUrl,
    },
    include: {
      Post: {
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
      },
    },
  });

  return (
    <>
      {userData && userData.Post.length !== 0 ? (
        <PostComponentClient posts={userData.Post} />
      ) : (
        <Empty title="posted" isSelf={false} />
      )}
    </>
  );
};

export default OverView;
