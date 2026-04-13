import { z } from "zod";

export const createPilarSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  order: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const updatePilarSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  order: z.coerce.number().int().min(0),
  isActive: z.boolean(),
});

export const deletePilarSchema = z.object({
  id: z.string().min(1),
});

export type CreatePilarInput = z.infer<typeof createPilarSchema>;
export type UpdatePilarInput = z.infer<typeof updatePilarSchema>;
export type DeletePilarInput = z.infer<typeof deletePilarSchema>;

