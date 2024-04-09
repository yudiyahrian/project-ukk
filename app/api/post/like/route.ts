import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { PostLikeValidator } from "@/utils/validators/like";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, liked } = PostLikeValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    if (liked) {
      if (!existingLike) {
        await prisma.like.create({
          data: {
            liked,
            userId: session.user.id,
            postId,
          },
        });
      }
    } else {
      if (existingLike) {
        await prisma.like.deleteMany({
          where: {
            userId: session.user.id,
            postId,
          },
        });
      }
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not register your like, please try again", {
      status: 500,
    });
  }
}
