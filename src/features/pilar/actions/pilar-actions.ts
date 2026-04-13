"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { PilarModel } from "@/app/generated/prisma/models/Pilar";
import {
  createPilarSchema,
  deletePilarSchema,
  updatePilarSchema,
} from "../schemas/pilar-schemas";

const SOCIEDAD_PATH = "/sociedad";

export async function createPilar(input: unknown): Promise<ActionResponse<PilarModel>> {
  const parsed = createPilarSchema.safeParse(input);

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
    const pilar = await prisma.pilar.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        order: parsed.data.order ?? 0,
        isActive: parsed.data.isActive ?? true,
      },
    });

    revalidatePath(SOCIEDAD_PATH);

    return {
      success: true,
      data: pilar,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo crear el pilar",
    };
  }
}

export async function getPilars(): Promise<PilarModel[]> {
  try {
    return await prisma.pilar.findMany({
      orderBy: {
        order: "asc",
      },
    });
  } catch (error) {
    console.error("[GET_PILARS_ERROR]", error);
    throw new Error("Error al obtener los pilares.");
  }
}

export async function updatePilar(input: unknown): Promise<ActionResponse<PilarModel>> {
  const parsed = updatePilarSchema.safeParse(input);

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
    const pilar = await prisma.pilar.update({
      where: { id },
      data,
    });

    revalidatePath(SOCIEDAD_PATH);

    return {
      success: true,
      data: pilar,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo actualizar el pilar",
    };
  }
}

export async function deletePilar(input: unknown): Promise<ActionResponse<void>> {
  const parsed = deletePilarSchema.safeParse(input);

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
    await prisma.pilar.delete({
      where: { id: parsed.data.id },
    });

    revalidatePath(SOCIEDAD_PATH);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo eliminar el pilar",
    };
  }
}

