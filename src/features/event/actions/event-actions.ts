"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { EventModel } from "@/app/generated/prisma/models/Event";
import {
  createEventSchema,
  deleteEventSchema,
  updateEventSchema,
} from "../schemas/event-schemas";

export type EventWithStats = EventModel & {
  reservationCount: number;
  availableSpots: number | null;
};

const ACTIVITIES_PATH = "/activities";

export async function createEvent(input: unknown): Promise<ActionResponse<EventModel>> {
  const parsed = createEventSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos invalidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await isAdminCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "Usuario no autorizado",
    };
  }

  try {
    const event = await prisma.event.create({
      data: {
        title: parsed.data.title,
        date: parsed.data.date,
        location: parsed.data.location ?? undefined,
        description: parsed.data.description ?? undefined,
        type: parsed.data.type ?? "Actividad",
        link: parsed.data.link ?? undefined,
        capacity: parsed.data.capacity ?? null,
        isActive: parsed.data.isActive ?? true,
      },
    });

    revalidatePath(ACTIVITIES_PATH);

    return {
      success: true,
      data: event,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo crear el evento",
    };
  }
}

export async function getEvents(): Promise<EventModel[]> {
  try {
    return await prisma.event.findMany({
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.error("[GET_EVENTS_ERROR]", error);
    throw new Error("Error al obtener los eventos.");
  }
}

export async function getActiveEvents(): Promise<EventWithStats[]> {
  try {
    const events = await prisma.event.findMany({
      where: { isActive: true },
      orderBy: { date: "asc" },
      include: {
        _count: {
          select: {
            reservations: {
              where: { status: { not: "CANCELLED" } },
            },
          },
        },
      },
    });

    return events.map((e) => ({
      ...e,
      reservationCount: e._count.reservations,
      availableSpots: e.capacity !== null ? e.capacity - e._count.reservations : null,
    }));
  } catch (error) {
    console.error("[GET_ACTIVE_EVENTS_ERROR]", error);
    throw new Error("Error al obtener los eventos activos.");
  }
}

export async function getEventById(id: string): Promise<EventWithStats | null> {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            reservations: {
              where: { status: { not: "CANCELLED" } },
            },
          },
        },
      },
    });

    if (!event) return null;

    return {
      ...event,
      reservationCount: event._count.reservations,
      availableSpots: event.capacity !== null ? event.capacity - event._count.reservations : null,
    };
  } catch (error) {
    console.error("[GET_EVENT_BY_ID_ERROR]", error);
    throw new Error("Error al obtener el evento.");
  }
}

export async function updateEvent(input: unknown): Promise<ActionResponse<EventModel>> {
  const parsed = updateEventSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos invalidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await isAdminCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "Usuario no autorizado",
    };
  }

  const { id, ...data } = parsed.data;

  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...data,
        location: data.location ?? undefined,
        description: data.description ?? undefined,
        link: data.link ?? undefined,
        capacity: data.capacity ?? null,
      },
    });

    revalidatePath(ACTIVITIES_PATH);

    return {
      success: true,
      data: event,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo actualizar el evento",
    };
  }
}

export async function deleteEvent(input: unknown): Promise<ActionResponse<void>> {
  const parsed = deleteEventSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos invalidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await isAdminCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "Usuario no autorizado",
    };
  }

  try {
    await prisma.event.delete({
      where: { id: parsed.data.id },
    });

    revalidatePath(ACTIVITIES_PATH);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo eliminar el evento",
    };
  }
}

