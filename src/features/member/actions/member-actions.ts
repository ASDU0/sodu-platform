"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { MemberModel } from "@/app/generated/prisma/models/Member";
import { Prisma } from "@/app/generated/prisma/client";
import {
  createMemberSchema,
  deleteMemberSchema,
  updateMemberSchema,
} from "../schemas/member-schemas";

const SOCIEDAD_PATH = "/sociedad";

export async function createMember(input: unknown): Promise<ActionResponse<MemberModel>> {
  const parsed = createMemberSchema.safeParse(input);

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
    const member = await prisma.member.create({
      data: {
        name: parsed.data.name,
        roleTitle: parsed.data.roleTitle,
        bio: parsed.data.bio,
        imageUrl: parsed.data.imageUrl ?? undefined,
        type: parsed.data.type,
        order: parsed.data.order ?? 0,
        isActive: parsed.data.isActive ?? true,
      },
    });

    revalidatePath(SOCIEDAD_PATH);

    return {
      success: true,
      data: member,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo crear el miembro",
    };
  }
}

export type MemberSortKey = "name" | "roleTitle" | "type" | "order" | "isActive" | "createdAt";
export type GetMembersInput = {
  query?: string;
  sortBy?: MemberSortKey;
  sortOrder?: "asc" | "desc";
};

export async function getMembers(input?: GetMembersInput): Promise<MemberModel[]> {
  const orderBy: Prisma.MemberOrderByWithRelationInput = input?.sortBy
    ? { [input.sortBy]: input.sortOrder ?? "asc" }
    : { order: "asc" };

  const where: Prisma.MemberWhereInput | undefined = input?.query
    ? {
        name: {
          contains: input.query,
          mode: "insensitive",
        },
      }
    : undefined;

  try {
    return await prisma.member.findMany({
      where,
      orderBy,
    });
  } catch (error) {
    console.error("[GET_MEMBERS_ERROR]", error);
    throw new Error("Error al obtener los miembros.");
  }
}

export async function getMemberById(id: string): Promise<MemberModel | null> {
  try {
    return await prisma.member.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("[GET_MEMBER_BY_ID_ERROR]", error);
    throw new Error("Error al obtener el miembro.");
  }
}

export async function updateMember(input: unknown): Promise<ActionResponse<MemberModel>> {
  const parsed = updateMemberSchema.safeParse(input);

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
    const member = await prisma.member.update({
      where: { id },
      data: {
        ...data,
        imageUrl: data.imageUrl ?? undefined,
      },
    });

    revalidatePath(SOCIEDAD_PATH);

    return {
      success: true,
      data: member,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo actualizar el miembro",
    };
  }
}

export async function deleteMember(input: unknown): Promise<ActionResponse<void>> {
  const parsed = deleteMemberSchema.safeParse(input);

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
    await prisma.member.delete({
      where: { id: parsed.data.id },
    });

    revalidatePath(SOCIEDAD_PATH);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo eliminar el miembro",
    };
  }
}

