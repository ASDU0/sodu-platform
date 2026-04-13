"use server";

import { prisma } from "@/lib/prisma";
import type { ActionResponse } from "@/types/action-response";
import type { ConfigModel } from "@/app/generated/prisma/models/Config";
import { updateConfigSchema } from "../schemas/config-schemas";
import {getCurrentUser} from "@/lib/get-user";
import {getValidationErrors} from "@/lib/utils/zod-errors";

const CONFIG_ID = "singleton";

export async function updateConfig(input: unknown): Promise<ActionResponse<ConfigModel>> {
  const parsed = updateConfigSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos invalidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "Usuario no autenticado",
    };
  }

  try {
    const config = await prisma.config.upsert({
      where: { id: CONFIG_ID },
      update: parsed.data,
      create: {
        id: CONFIG_ID,
        ...parsed.data,
      },
    });

    return {
      success: true,
      data: config,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo actualizar la configuracion",
    };
  }
}
