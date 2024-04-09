import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { CommentValidator } from "@/utils/validators/comment";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, content, replyToId } = CommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.comment.create({
      data: {
        content,
        postId,
        userId: session.user.id,
        replyToId,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Could not create comment at this time, please try again later.",
      { status: 500 }
    );
  }
}
