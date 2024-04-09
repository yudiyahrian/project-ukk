import { prisma } from "@/utils/prisma";
import { getAuthSession } from "@utils/auth";
import { prismaExclude } from "@utils/prisma_function";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { name: string } }
) => {
  try {
    return new NextResponse();
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
