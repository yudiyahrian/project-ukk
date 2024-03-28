"use client";

import { useSession } from "next-auth/react";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/utils/edgestore";
import { useState } from "react";

export default function PhotoProfile() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const { data: session, update: UpdateSession } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1, // 1MB
        }}
        onChange={(file) => {
          setFile(file);
        }}
      >
        <div>
          <img
            src={user?.image ?? "/assets/images/default.png"}
            className="max-h-36"
            alt={`profile photo of ${user?.name}`}
            referrerPolicy={"no-referrer"}
          />
        </div>
      </SingleImageDropzone>
      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-150"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <button
        className="bg-white text-black rounded px-2 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({
              file,
              input: { type: "profile" },
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });

            await fetch("/api/profile", {
              method: "PUT", // Method put is to update
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: res.url,
                id: user?.id,
              }),
            })
              .then((response) => {
                UpdateSession({ image: res.url });
                console.log(response);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
