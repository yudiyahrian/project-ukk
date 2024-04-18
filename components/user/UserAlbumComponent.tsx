"use client";

import { FC } from "react";
import { Album, Photo } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAlbumDropdown from "./UserAlbumDropdown";
interface AlbumComponentProps {
  album:
    | (Album & {
        photos: Photo[];
      })
    | null;
  isSelf: boolean;
}

const AlbumComponent: FC<AlbumComponentProps> = ({ album, isSelf }) => {
  const pathname = usePathname();
  return (
    album && (
      <>
        <div className="relative">
          <UserAlbumDropdown album={album} isSelf={isSelf} />
          <Link href={`${pathname}/${album.id}`}>
            {album.photos[0] ? (
              <Image
                src={album.photos[0].photo ?? ""}
                alt={`${album.name}-cover`}
                width={0}
                height={0}
                sizes="100vw"
                className="h-36 w-36 object-cover rounded-md border border-black/10"
              />
            ) : (
              <div className="h-36 w-36 bg-[#dfe1e9] rounded-md border border-black/10"></div>
            )}
            <h3 className="font-semibold text-sm mt-1">{album.name}</h3>
            <p className="font-normal text-xs">
              {album.photos.length === 0 ? "" : `${album.photos.length} item`}
            </p>
          </Link>
        </div>
      </>
    )
  );
};

export default AlbumComponent;
