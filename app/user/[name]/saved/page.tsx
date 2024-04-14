import { Empty } from "@components/user/Empty";
import { prisma } from "@/utils/prisma";
import PostComponentClient from "@components/user/UserComponentClient";

type Props = {
  params: { name: string };
};

const Saved = async (props: Props) => {
  const formattedUrl = decodeURIComponent(props.params.name);
  const userData = await prisma.user.findUnique({
    where: {
      name: formattedUrl,
    },
    include: {
      UserSaved: {
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

  const posts = userData?.UserSaved.flatMap((save) => save.post!) ?? [];

  return (
    <>
      {userData && posts && posts.length !== 0 ? (
        //!TODO: Make it able to see saved post & photo. current: post only
        <PostComponentClient posts={posts} />
      ) : (
        <Empty title="saved" isSelf={false} />
      )}
    </>
  );
};

export default Saved;
