import { prisma } from "@/utils/prisma";
import { prismaExclude } from "@utils/prisma_function";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { name: string } }
) => {
  try {
    const prompt = await prisma.user.findUnique({
      where: {
        name: params.name,
      },
      select: prismaExclude("User", ["password", "role", "emailVerified"]),
    });
    if (!prompt) return new NextResponse("User Not Found", { status: 404 });

    return new NextResponse(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
