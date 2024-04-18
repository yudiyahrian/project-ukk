import UserAlbumDropdown from "@components/user/UserAlbumDropdown";
import { getAuthSession } from "@utils/auth";
import { prisma } from "@utils/prisma";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { id: string; name: string };
};

const AlbumDetail = async (props: Props) => {
  const formattedUrl = decodeURIComponent(props.params.name);
  const session = await getAuthSession();
  const albumData = await prisma.album.findUnique({
    where: {
      id: props.params.id,
    },
    include: {
      photos: true,
    },
  });
  const userData = await prisma.user.findUnique({
    where: {
      name: formattedUrl,
    },
  });

  const isSelf = session?.user.id === userData?.id;

  return (
    albumData && (
      <>
        <div className="flex flex-wrap gap-5 mt-5">
          {isSelf && (
            <Link
              href={`/create?album=${props.params.id}`}
              className="h-36 w-36 bg-[#dfe1e9] flex flex-col justify-center items-center rounded-md border border-black/10"
            >
              <Plus />
              <h3 className="font-semibold text-sm mt-1">Add photo</h3>
            </Link>
          )}
          {albumData.photos.map((photo, index) => {
            return (
              <div className="relative" key={photo.id}>
                <UserAlbumDropdown photo={photo} isSelf={isSelf} />
                <Image
                  src={photo.photo}
                  alt={`photo-${index}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-fit h-36 rounded-sm object-cover"
                />
              </div>
            );
          })}
        </div>
      </>
    )
  );
};

export default AlbumDetail;
