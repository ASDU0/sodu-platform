import { z } from "zod";

export const updateConfigSchema = z.object({
  email: z.string().trim().email(),
  location: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  mission: z.string().trim().min(1),
  vision: z.string().trim().min(1),
  memberCount: z.coerce.number().int().min(0),
  yearsActive: z.coerce.number().int().min(0),
});

export type UpdateConfigInput = z.infer<typeof updateConfigSchema>;

