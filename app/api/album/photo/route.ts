import { getAuthSession } from "@utils/auth";
import { prisma } from "@utils/prisma";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const { id, userId } = (await req.json()) as {
      id: string;
      userId: string | null;
    };

    if (userId && userId !== session.user.id) {
      return new Response("Cannot delete another user photo", { status: 403 });
    }

    const deletedPhoto = await prisma.photo.delete({
      where: {
        id: id,
        userId: {
          not: null,
        },
      },
      include: {
        Post: {
          include: {
            photos: true,
          },
        },
      },
    });

    if (deletedPhoto.Post && deletedPhoto.Post?.photos.length < 2) {
      await prisma.post.delete({
        where: {
          id: deletedPhoto.Post.id,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Could not post to breadit at this time, please try again later.",
      { status: 500 }
    );
  }
}
