import { z } from "zod";

const roleTypeSchema = z.enum(["COACH", "DIRECTIVA"]);

export const createMemberSchema = z.object({
  name: z.string().trim().min(1),
  roleTitle: z.string().trim().min(1),
  bio: z.string().trim().min(1),
  imageUrl: z.string().trim().min(1).optional().nullable(),
  type: roleTypeSchema,
  order: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const updateMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  roleTitle: z.string().trim().min(1),
  bio: z.string().trim().min(1),
  imageUrl: z.string().trim().min(1).optional().nullable(),
  type: roleTypeSchema,
  order: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const deleteMemberSchema = z.object({
  id: z.string().min(1),
});

/**
 * Schema for uploading member images to Cloudinary
 * Accepts base64 encoded image data or file path
 */
export const uploadMemberImageSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type),
      "Only JPEG, PNG, WebP, and GIF images are supported"
    ),
  memberId: z.string().min(1),
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
export type DeleteMemberInput = z.infer<typeof deleteMemberSchema>;
export type UploadMemberImageInput = z.infer<typeof uploadMemberImageSchema>;
