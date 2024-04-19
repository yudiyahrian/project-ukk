"use client"

import PhotoProfile from "./upload";
import ProfileForm from "./form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEdgeStore } from "@utils/edgestore";

export interface formValues {
  name: string;
  description: string;
  image: string | File;
  bannerImage: string | File;
}

export default function Profile() {
  const { data: session, update: UpdateSession } = useSession();
  const user = session?.user;
  const { edgestore } = useEdgeStore();

  const [formValues, setFormValues] = useState<formValues>({
    name: user?.name ?? '',
    description: '',
    image: "",
    bannerImage: "",
  });

  const onChange = (value: string, name: string) => {
    return setFormValues({ ...formValues, [name]: value })
  }

  const saveChanges = async () => {
    await edgestore.myPublicImages.confirmUpload({
      url: formValues.image as string,
    });

    await edgestore.myPublicImages.confirmUpload({
      url: formValues.bannerImage as string
    });

    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user?.id,
        image: formValues.image,
        name: formValues.name,
        // banner: formValues.bannerImage
        // description: formValues.description
      })
    })
      .then((response) => {
        UpdateSession({
          name: formValues.name,
          image: formValues.image,
          // description: formValues.description,
          // banner: formValues.bannerImage
        })
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const disabled =
    formValues.name === user?.name &&
    formValues.image === "" &&
    formValues.bannerImage === "" &&
    formValues.description === '';

  return (
    <div className="flex flex-col gap-7 w-4/5 pb-4">
      <p className="text-2xl font-bold text-black">User Setting</p>
      <ProfileForm formValues={formValues} onChange={onChange} />

      <PhotoProfile formValues={formValues} onChange={onChange} />

      <button disabled={disabled} onClick={saveChanges} className="self-end px-12 py-2.5 rounded-md font-semibold text-sm bg-black text-[#f4f4f5] opacity-80 hover:opacity-100 transition-all disabled:opacity-35 disabled:cursor-default">Save</button>
    </div>
  );
}
