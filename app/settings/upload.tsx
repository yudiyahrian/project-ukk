"use client";

import { useSession } from "next-auth/react";

import { useEdgeStore } from "@/utils/edgestore";
import { useState } from "react";
import SettingsInput from "@components/SettingsInput";
import { formValues } from "./page";
import SettingsDropzone from "@components/SettingsDropzone";

interface Props {
  formValues: formValues;
  onChange: (value: string, name: string) => void;
}

export default function PhotoProfile({ formValues, onChange }: Props) {
  const [progresses, setProgresses] = useState({
    image: 0,
    bannerImage: 0,
  });
  const { edgestore } = useEdgeStore();

  const { data: session } = useSession();
  const user = session?.user;

  const onChangeFile = async (file: File, name: string) => {
    setProgresses({ ...progresses, [name]: 1 });

    if (file) {
      const res = await edgestore.myPublicImages.upload({
        file,
        options: {
          temporary: true,
        },
        input: { type: "profile" },
        onProgressChange: (progress) => {
          if (progress !== 0) {
            setProgresses({ ...progresses, [name]: progress });
          }
        },
      });

      if (res) {
        onChange(res.url, name);
      }
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <p className="uppercase text-[10px] font-bold text-[#8a8a8c]">Images</p>
      <div className="flex flex-col gap-6">
        <SettingsInput
          label="Avatar"
          description="Image must be .png or .jpg format"
          input={
            <SettingsDropzone
              width={200}
              height={180}
              progress={progresses.image}
              value={formValues.image}
              initialValue={user?.image ?? null}
              onChange={(file) => {
                if (file) {
                  onChangeFile(file, 'image',)
                }
              }}
              dropzoneOptions={{
                maxSize: 5024 * 5024
              }}
              children
            />
          }
        />

        <SettingsInput
          label="Banner Image"
          description="Image must be .png or .jpg format"
          input={
            <SettingsDropzone
              width={400}
              height={250}
              progress={progresses.bannerImage}
              value={formValues.bannerImage}
              initialValue={user?.bannerImage ?? null}
              onChange={(file) => {
                if (file) {
                  onChangeFile(file, 'bannerImage',)
                }
              }}
              dropzoneOptions={{
                maxSize: 5024 * 5024
              }}
              children
            />
          }
        />
      </div>
    </section>
  );
}

const DropZone = () => {

}