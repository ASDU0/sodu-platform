import { z } from "zod";

export const createCommentSchema = z.object({
  bookId: z.string().min(1),
  userName: z.string().trim().min(1).optional(),
  content: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});

export const updateCommentSchema = z.object({
  id: z.string().min(1),
  content: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  isActive: z.boolean(),
});

export const deleteCommentSchema = z.object({
  id: z.string().min(1),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;

