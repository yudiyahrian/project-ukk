import { prisma } from "@/utils/prisma";
import { authOptions } from "@utils/auth";
import { useEdgeStore } from "@utils/edgestore";
import { PostValidator } from "@utils/validators/post";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = await req.json();

    const { userId, title, description, content } = PostValidator.parse(body);

    // console.log(content.blocks[0].data.text);

    const imageData: { url: string; caption: string }[] = [];

    // Iterate through each block
    content.blocks.forEach((block: any) => {
      // Check if the block type is "image"
      if (block.type === "image") {
        // Extract URL and caption from data object
        const url: string = block.data.file.url;
        const caption: string = block.data.caption;

        // Push URL and caption pair as an object into the array
        imageData.push({ url, caption });
      }
    });

    // Step 1: Insert the post into the database
    const createdPost = await prisma.post.create({
      data: {
        title,
        description,
        userId,
      },
    });

    // Step 2: Insert each photo associated with the post

    if (imageData.length !== 0) {
      for (const photo of imageData) {
        await prisma.photo.create({
          data: {
            photo: photo.url,
            caption: photo.caption,
            userId: userId,
            postId: createdPost.id, // Associate the photo with the created post
          },
        });
      }
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
