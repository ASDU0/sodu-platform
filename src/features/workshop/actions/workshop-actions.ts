"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { WorkshopModel as Workshop } from "@/app/generated/prisma/models/Workshop";
import { workshopSchema, updateWorkshopSchema } from "../schemas/workshop-schema";

const WORKSHOPS_PATH = "/admin/workshops";
const TALLERES_PATH = "/talleres";

export async function createWorkshop(input: unknown): Promise<ActionResponse<Workshop>> {
  const parsed = workshopSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
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
    const workshop = await prisma.workshop.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        startsAt: new Date(parsed.data.startsAt),
        location: parsed.data.location,
        capacity: parsed.data.capacity,
        imageUrl: parsed.data.imageUrl || undefined,
        isActive: parsed.data.isActive,
      },
    });

    revalidatePath(WORKSHOPS_PATH);
    revalidatePath(TALLERES_PATH);
    return {
      success: true,
      data: workshop,
    };
  } catch (error) {
    console.error("[createWorkshop] Error al crear en BD:", error);
    return {
      success: false,
      error: "Error al crear el taller",
    };
  }
}

export async function updateWorkshop(id: string, input: unknown): Promise<ActionResponse<Workshop>> {
  const parsed = updateWorkshopSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
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
    const workshop = await prisma.workshop.update({
      where: { id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        startsAt: new Date(parsed.data.startsAt),
        location: parsed.data.location,
        capacity: parsed.data.capacity,
        imageUrl: parsed.data.imageUrl || undefined,
        isActive: parsed.data.isActive,
      },
    });

    revalidatePath(WORKSHOPS_PATH);
    revalidatePath(TALLERES_PATH);
    return {
      success: true,
      data: workshop,
    };
  } catch {
    return {
      success: false,
      error: "Error al actualizar el taller",
    };
  }
}

export async function deleteWorkshop(id: string): Promise<ActionResponse<void>> {
  const currentUser = await isAdminCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "Usuario no autorizado",
    };
  }

  try {
    await prisma.workshop.delete({
      where: { id },
    });

    revalidatePath(WORKSHOPS_PATH);
    revalidatePath(TALLERES_PATH);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Error al eliminar el taller",
    };
  }
}

export async function getWorkshops(): Promise<Workshop[]> {
  return prisma.workshop.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  return prisma.workshop.findUnique({
    where: { id },
  });
}