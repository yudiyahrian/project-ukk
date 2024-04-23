"use client";

import PhotoProfile from "./upload";
import ProfileForm from "./form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@utils/edgestore";
import { toast } from "@hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<formValues>({
    name: user?.name ?? "",
    description: user?.description ?? "",
    image: "",
    bannerImage: "",
  });

  const onChange = (value: string, name: string) => {
    return setFormValues({ ...formValues, [name]: value });
  };

  const saveChanges = async () => {
    setIsLoading(true);
    if (formValues.image !== "") {
      await edgestore.myPublicImages.confirmUpload({
        url: formValues.image as string,
      });
    }
    if (formValues.bannerImage !== "") {
      await edgestore.myPublicImages.confirmUpload({
        url: formValues.bannerImage as string,
      });
    }

    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user?.id,
        image: formValues.image,
        name: formValues.name,
        bannerImage: formValues.bannerImage,
        description: formValues.description,
      }),
    })
      .then((response) => {
        UpdateSession({
          name: formValues.name,
          image: formValues.image,
          description: formValues.description,
          bannerImage: formValues.bannerImage,
        });
        setIsLoading(false);
        return toast({
          title: "Success update profile",
          description: "Your profile has been updated",
          variant: "default",
        });
      })
      .catch((e) => {
        return toast({
          title: "Something went wrong.",
          description: "Your profile was not updated, please try again later.",
          variant: "destructive",
        });
      });
  };

  const disabled =
    formValues.name === user?.name &&
    formValues.image === "" &&
    formValues.image === user.image &&
    formValues.bannerImage === user.bannerImage &&
    formValues.bannerImage === "" &&
    formValues.description === user?.description;

  return (
    <div className="flex flex-col gap-7 w-4/5 pb-4">
      <p className="text-2xl font-bold text-black">User Setting</p>
      <ProfileForm formValues={formValues} onChange={onChange} />

      <PhotoProfile formValues={formValues} onChange={onChange} />

      <Button
        disabled={disabled}
        onClick={saveChanges}
        isLoading={isLoading}
        className="self-end px-12 py-2.5 rounded-md font-semibold text-sm bg-black text-[#f4f4f5] opacity-80 hover:opacity-100 transition-all disabled:opacity-35 disabled:cursor-default"
      >
        Save
      </Button>
    </div>
  );
}
