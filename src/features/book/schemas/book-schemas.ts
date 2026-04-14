import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  description: z.string().trim().min(1),
  coverUrl: z.string().trim().optional(),
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

/**
 * Schema for uploading book cover images to Cloudinary
 */
export const uploadBookImageSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 3 * 1024 * 1024, "Image must be less than 3MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are supported"
    ),
  bookId: z.string().min(1),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type DeleteBookInput = z.infer<typeof deleteBookSchema>;
export type UploadBookImageInput = z.infer<typeof uploadBookImageSchema>;

