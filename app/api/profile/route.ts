import { PrismaClient } from "@prisma/client";
import { getAuthSession } from "@utils/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Action to update or edit
export const PUT = async (req: NextRequest) => {
  const session = await getAuthSession();
  const { image, name, description, bannerImage, id } = await req.json();
  let updateData: {
    image?: string;
    name?: string;
    description?: string;
    bannerImage?: string;
  } = {};

  if (image) {
    updateData.image = image;
    await prisma.photo.create({
      data: {
        photo: image,
        albumId: "user-profile-image",
        userId: session?.user.id,
      },
    });
  }

  if (name) {
    updateData.name = name;
  }

  if (description !== null) {
    updateData.description = description === "" ? null : description;
  }

  if (bannerImage) {
    updateData.bannerImage = bannerImage;
    await prisma.photo.create({
      data: {
        photo: bannerImage,
        albumId: "user-banner-image",
        userId: session?.user.id,
      },
    });
  }

  const profile = await prisma.user.update({
    where: {
      id: id,
    },
    data: updateData,
  });

  return NextResponse.json({
    profile,
  });
};
