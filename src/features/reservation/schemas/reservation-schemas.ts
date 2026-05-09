import { z } from "zod";

const reservationStatusSchema = z.enum(["PENDING", "CONFIRMED", "CANCELLED"]);

export const createReservationSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().trim().email("Correo electrónico inválido"),
  phone: z.string().trim().optional().nullable(),
  notes: z.string().trim().optional().nullable(),
});

export const createReservationAdminSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().trim().min(2),
  email: z.string().trim().email("Correo electrónico inválido"),
  phone: z.string().trim().optional().nullable(),
  notes: z.string().trim().optional().nullable(),
  status: reservationStatusSchema.default("CONFIRMED"),
});

export const updateReservationStatusSchema = z.object({
  id: z.string().min(1),
  status: reservationStatusSchema,
});

export const deleteReservationSchema = z.object({
  id: z.string().min(1),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type CreateReservationAdminInput = z.infer<typeof createReservationAdminSchema>;
export type UpdateReservationStatusInput = z.infer<typeof updateReservationStatusSchema>;
export type DeleteReservationInput = z.infer<typeof deleteReservationSchema>;
