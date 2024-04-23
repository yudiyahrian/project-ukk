import { z } from "zod";

export const createAlbumValidator = z.object({
  name: z
    .string()
    .min(1, { message: "Album name must be longer than 1 characters" }),
  description: z.string().nullable(),
  id: z.string().optional(),
});

export type CreateAlbumValidator = z.infer<typeof createAlbumValidator>;
