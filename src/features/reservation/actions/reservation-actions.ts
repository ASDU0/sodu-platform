"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { Reservation, ReservationStatus } from "@/app/generated/prisma/client";
import {
  createReservationSchema,
  createReservationAdminSchema,
  updateReservationStatusSchema,
  deleteReservationSchema,
} from "../schemas/reservation-schemas";

export type ReservationWithEvent = Reservation & {
  event: { id: string; title: string; date: Date };
};

export type GetReservationsInput = {
  eventId?: string;
  status?: ReservationStatus;
  query?: string;
};

// --- PÚBLICO: cualquier visitante puede reservar ---

export async function createReservation(input: unknown): Promise<ActionResponse<Reservation>> {
  const parsed = createReservationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const event = await prisma.event.findUnique({
    where: { id: parsed.data.eventId },
  });

  if (!event || !event.isActive) {
    return { success: false, error: "El evento no está disponible" };
  }

  if (event.capacity !== null) {
    const count = await prisma.reservation.count({
      where: {
        eventId: parsed.data.eventId,
        status: { not: "CANCELLED" },
      },
    });
    if (count >= event.capacity) {
      return { success: false, error: "El evento ya no tiene cupos disponibles" };
    }
  }

  const existing = await prisma.reservation.findUnique({
    where: {
      eventId_email: {
        eventId: parsed.data.eventId,
        email: parsed.data.email,
      },
    },
  });

  if (existing) {
    return { success: false, error: "Ya tienes una reserva registrada para este evento" };
  }

  try {
    const reservation = await prisma.reservation.create({
      data: {
        eventId: parsed.data.eventId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        notes: parsed.data.notes ?? null,
        status: "PENDING",
      },
    });

    revalidatePath(`/actividades/${parsed.data.eventId}`);
    revalidatePath("/actividades");

    return { success: true, data: reservation };
  } catch {
    return { success: false, error: "No se pudo registrar la reserva" };
  }
}

// --- ADMIN: solo administradores ---

export async function createReservationAdmin(input: unknown): Promise<ActionResponse<Reservation>> {
  const parsed = createReservationAdminSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await isAdminCurrentUser();
  if (!currentUser) return { success: false, error: "Usuario no autorizado" };

  const existing = await prisma.reservation.findUnique({
    where: {
      eventId_email: {
        eventId: parsed.data.eventId,
        email: parsed.data.email,
      },
    },
  });

  if (existing) {
    return { success: false, error: "Ya existe una reserva con ese correo para este evento" };
  }

  try {
    const reservation = await prisma.reservation.create({
      data: {
        eventId: parsed.data.eventId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        notes: parsed.data.notes ?? null,
        status: parsed.data.status,
      },
    });

    revalidatePath("/dashboard/reservations");
    revalidatePath(`/actividades/${parsed.data.eventId}`);

    return { success: true, data: reservation };
  } catch {
    return { success: false, error: "No se pudo crear la reserva" };
  }
}

export async function getReservations(
  input?: GetReservationsInput
): Promise<ReservationWithEvent[]> {
  const currentUser = await isAdminCurrentUser();
  if (!currentUser) throw new Error("No autorizado");

  try {
    return await prisma.reservation.findMany({
      where: {
        ...(input?.eventId && { eventId: input.eventId }),
        ...(input?.status && { status: input.status }),
        ...(input?.query && {
          OR: [
            { name: { contains: input.query, mode: "insensitive" } },
            { email: { contains: input.query, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        event: { select: { id: true, title: true, date: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[GET_RESERVATIONS_ERROR]", error);
    throw new Error("Error al obtener las reservas.");
  }
}

export async function updateReservationStatus(
  input: unknown
): Promise<ActionResponse<Reservation>> {
  const parsed = updateReservationStatusSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await isAdminCurrentUser();
  if (!currentUser) return { success: false, error: "Usuario no autorizado" };

  try {
    const reservation = await prisma.reservation.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    revalidatePath("/dashboard/reservations");

    return { success: true, data: reservation };
  } catch {
    return { success: false, error: "No se pudo actualizar el estado" };
  }
}

export async function deleteReservation(input: unknown): Promise<ActionResponse<void>> {
  const parsed = deleteReservationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await isAdminCurrentUser();
  if (!currentUser) return { success: false, error: "Usuario no autorizado" };

  try {
    await prisma.reservation.delete({ where: { id: parsed.data.id } });
    revalidatePath("/dashboard/reservations");
    return { success: true };
  } catch {
    return { success: false, error: "No se pudo eliminar la reserva" };
  }
}
