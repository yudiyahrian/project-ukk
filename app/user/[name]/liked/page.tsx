import { Empty } from "@components/user/Empty";
import { prisma } from "@/utils/prisma";
import PostComponentClient from "@components/user/UserComponentClient";

type Props = {
  params: { name: string };
};

const Liked = async (props: Props) => {
  const formattedUrl = decodeURIComponent(props.params.name);
  const userData = await prisma.user.findUnique({
    where: {
      name: formattedUrl,
    },
    include: {
      Like: {
        orderBy: {
          createdAt: "desc",
        },

        include: {
          post: {
            include: {
              Like: true,
              user: true,
              Comment: true,
              photos: true,
              UserSaved: true,
            },
          },
        },
      },
    },
  });

  const posts = userData?.Like.flatMap((like) => like.post!) ?? [];

  return (
    <>
      {userData && posts && posts.length !== 0 ? (
        //!TODO: Make it able to see liked post & photo. current: post only
        <PostComponentClient posts={posts} />
      ) : (
        <Empty title="liked" isSelf={false} />
      )}
    </>
  );
};

export default Liked;
