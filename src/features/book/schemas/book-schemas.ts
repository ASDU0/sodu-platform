import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  description: z.string().trim().min(1),
  coverUrl: z.string().trim().min(1),
  rating: z.number().min(0).max(5),
  isActive: z.boolean().optional(),
});

export const updateBookSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  description: z.string().trim().min(1),
  coverUrl: z.string().trim().min(1),
  rating: z.number().min(0).max(5),
  isActive: z.boolean(),
});

export const deleteBookSchema = z.object({
  id: z.string().min(1),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type DeleteBookInput = z.infer<typeof deleteBookSchema>;

