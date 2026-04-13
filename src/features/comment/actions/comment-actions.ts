"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-user";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { CommentModel } from "@/app/generated/prisma/models/Comment";
import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from "../schemas/comment-schemas";

const LECTURA_PATH = "/lectura";

export async function createComment(input: unknown): Promise<ActionResponse<CommentModel>> {
  const parsed = createCommentSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos invalidos",
      details: getValidationErrors(parsed.error),
    };
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "Usuario no autenticado",
    };
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        bookId: parsed.data.bookId,
        userName: parsed.data.userName ?? currentUser.name,
        content: parsed.data.content,
        rating: parsed.data.rating ?? 5,
        isActive: true,
      },
    });

    revalidatePath(LECTURA_PATH);

    return {
      success: true,
      data: comment,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo crear el comentario",
    };
  }
}

export async function getCommentsByBook(bookId: string): Promise<CommentModel[]> {
  try {
    return await prisma.comment.findMany({
      where: {
        bookId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("[GET_COMMENTS_BY_BOOK_ERROR]", error);
    throw new Error("Error al obtener los comentarios.");
  }
}

export async function updateComment(input: unknown): Promise<ActionResponse<CommentModel>> {
  const parsed = updateCommentSchema.safeParse(input);

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
    const comment = await prisma.comment.update({
      where: { id },
      data,
    });

    revalidatePath(LECTURA_PATH);

    return {
      success: true,
      data: comment,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo actualizar el comentario",
    };
  }
}

export async function deleteComment(input: unknown): Promise<ActionResponse<void>> {
  const parsed = deleteCommentSchema.safeParse(input);

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
    await prisma.comment.delete({
      where: { id: parsed.data.id },
    });

    revalidatePath(LECTURA_PATH);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo eliminar el comentario",
    };
  }
}

