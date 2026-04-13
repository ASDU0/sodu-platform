import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().trim().min(1),
  date: z.coerce.date(),
  location: z.string().trim().min(1).optional().nullable(),
  description: z.string().trim().min(1).optional().nullable(),
  type: z.string().trim().min(1).optional(),
  link: z.string().trim().min(1).optional().nullable(),
  isActive: z.boolean().optional(),
});

export const updateEventSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1),
  date: z.coerce.date(),
  location: z.string().trim().min(1).optional().nullable(),
  description: z.string().trim().min(1).optional().nullable(),
  type: z.string().trim().min(1),
  link: z.string().trim().min(1).optional().nullable(),
  isActive: z.boolean(),
});

export const deleteEventSchema = z.object({
  id: z.string().min(1),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type DeleteEventInput = z.infer<typeof deleteEventSchema>;

