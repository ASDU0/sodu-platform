"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminCurrentUser } from "@/lib/is-admin-user";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import type { ActionResponse } from "@/types/action-response";
import type { BookModel } from "@/app/generated/prisma/models/Book";
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema,
} from "../schemas/book-schemas";
import { Prisma } from '@/app/generated/prisma/client'

const LECTURA_PATH = "/lectura";

export async function createBook(input: unknown): Promise<ActionResponse<BookModel>> {
  const parsed = createBookSchema.safeParse(input);

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
    const book = await prisma.book.create({
      data: {
        title: parsed.data.title,
        author: parsed.data.author,
        description: parsed.data.description,
        coverUrl: parsed.data.coverUrl ?? "",
        rating: parsed.data.rating ?? 0,
        isActive: parsed.data.isActive ?? true,
      },
    });

    revalidatePath(LECTURA_PATH);

    return {
      success: true,
      data: book,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo crear el libro",
    };
  }
}

export type BookSortKey = "title" | "author" | "rating" | "isActive" | "createdAt";
export type GetBooksInput = {
  query?: string;
  sortBy?: BookSortKey;
  sortOrder?: "asc" | "desc";
};

export async function getBooks(input?: GetBooksInput): Promise<BookModel[]> {
  const orderBy: Prisma.BookOrderByWithRelationInput = input?.sortBy
    ? { [input.sortBy]: input.sortOrder ?? "asc" }
    : { createdAt: "desc" };

  const where: Prisma.BookWhereInput | undefined = input?.query
    ? {
        title: {
          contains: input.query,
          mode: "insensitive",
        },
      }
    : undefined;

  try {
    return await prisma.book.findMany({
      where,
      orderBy,
    });
  } catch (error) {
    console.error("[GET_BOOKS_ERROR]", error);
    throw new Error("Error al obtener los libros.");
  }
}

export async function getBookById(id: string): Promise<BookModel | null> {
  try {
    return await prisma.book.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("[GET_BOOK_BY_ID_ERROR]", error);
    throw new Error("Error al obtener el libro.");
  }
}

export async function updateBook(input: unknown): Promise<ActionResponse<BookModel>> {
  const parsed = updateBookSchema.safeParse(input);

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
    const book = await prisma.book.update({
      where: { id },
      data,
    });

    revalidatePath(LECTURA_PATH);

    return {
      success: true,
      data: book,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo actualizar el libro",
    };
  }
}

export async function deleteBook(input: unknown): Promise<ActionResponse<void>> {
  const parsed = deleteBookSchema.safeParse(input);

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
    await prisma.book.delete({
      where: { id: parsed.data.id },
    });

    revalidatePath(LECTURA_PATH);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "No se pudo eliminar el libro",
    };
  }
}
