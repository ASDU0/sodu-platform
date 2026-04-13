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
  order: z.coerce.number().int().min(0),
  isActive: z.boolean(),
});

export const deleteMemberSchema = z.object({
  id: z.string().min(1),
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
export type DeleteMemberInput = z.infer<typeof deleteMemberSchema>;

