import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { postSaveValidator } from "@/utils/validators/post";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { saved, postId, photoId } = postSaveValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (postId) {
      const existingSave = await prisma.userSaved.findFirst({
        where: {
          userId: session.user.id,
          postId,
        },
      });

      if (saved) {
        if (!existingSave) {
          await prisma.userSaved.create({
            data: {
              userId: session.user.id,
              postId,
            },
          });
        }
      } else {
        if (existingSave) {
          await prisma.userSaved.deleteMany({
            where: {
              userId: session.user.id,
              postId,
            },
          });
        }
      }
    } else if (photoId) {
      const existingSave = await prisma.userSaved.findFirst({
        where: {
          userId: session.user.id,
          photoId,
        },
      });

      if (saved) {
        if (!existingSave) {
          await prisma.userSaved.create({
            data: {
              userId: session.user.id,
              photoId,
            },
          });
        }
      } else {
        if (existingSave) {
          await prisma.userSaved.deleteMany({
            where: {
              userId: session.user.id,
              photoId,
            },
          });
        }
      }
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not register your save, please try again", {
      status: 500,
    });
  }
}
