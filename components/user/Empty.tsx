"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

type empty = {
  title: string;
  isSelf: boolean;
};

export const Empty = ({ title, isSelf }: empty) => {
  const params = useParams<{ name: string }>();
  const name = decodeURIComponent(params.name);
  return (
    <>
      <div className="flex justify-center items-center text-center flex-col text-lg font-bold">
        <div className="w-48 h-48 relative">
          <Image
            priority={true}
            src={"/assets/images/empty.svg"}
            alt="empty"
            fill
            sizes="60vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <p>
          {isSelf
            ? `Looks like you haven't ${title} anything yet`
            : `u/${name} hasn't ${title} yet`}
        </p>
      </div>
    </>
  );
};
