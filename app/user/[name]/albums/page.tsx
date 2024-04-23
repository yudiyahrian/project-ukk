import CreateAlbum from "@components/CreateAlbum";
import UserAlbumClient from "@components/user/UserAlbumClient";
import AlbumComponent from "@components/user/UserAlbumComponent";
import { getAuthSession } from "@utils/auth";
import { prisma } from "@utils/prisma";
import { Plus } from "lucide-react";

type Props = {
  params: { name: string };
};

const Albums = async (props: Props) => {
  const formattedUrl = decodeURIComponent(props.params.name);
  const session = await getAuthSession();
  const userData = await prisma.user.findUnique({
    where: {
      name: formattedUrl,
    },
    include: {
      Album: {
        include: {
          photos: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });
  const profileAlbum = await prisma.album.findUnique({
    where: {
      id: "user-profile-image",
      userId: null,
    },
    include: {
      photos: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userData?.id,
        },
      },
    },
  });
  const bannerAlbum = await prisma.album.findUnique({
    where: {
      id: "user-banner-image",
      userId: null,
    },
    include: {
      photos: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userData?.id,
        },
      },
    },
  });
  const isSelf = session?.user.id === userData?.id;
  return (
    <>
      <div className="flex flex-wrap gap-5 items-start mt-5">
        {isSelf && (
          <CreateAlbum>
            <div className="flex items-start flex-col">
              <div className="h-36 w-36 bg-[#dfe1e9] flex justify-center items-center rounded-md border border-black/10">
                <Plus />
              </div>
              <h3 className="font-semibold text-sm mt-1">Create album</h3>
            </div>
          </CreateAlbum>
        )}
        <AlbumComponent
          album={profileAlbum}
          key={profileAlbum?.id}
          isSelf={isSelf}
        />
        <AlbumComponent
          album={bannerAlbum}
          key={bannerAlbum?.id}
          isSelf={isSelf}
        />
        <UserAlbumClient albums={userData?.Album ?? []} isSelf={isSelf} />
      </div>
    </>
  );
};

export default Albums;
