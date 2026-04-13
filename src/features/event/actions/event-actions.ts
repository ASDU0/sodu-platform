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
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.error("[GET_EVENTS_ERROR]", error);
    throw new Error("Error al obtener los eventos.");
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

