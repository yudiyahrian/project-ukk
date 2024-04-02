import vine from "@vinejs/vine";

export const commentSchema = vine.object({
  content: vine.string().trim().minLength(2),
  postId: vine.string().trim(),
  toUserId: vine.string().trim(),
});
