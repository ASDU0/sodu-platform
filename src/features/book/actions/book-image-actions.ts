"use server";

import { revalidatePath } from "next/cache";
import { cloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-user";

const MAX_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type UploadResponse =
  | { imageUrl: string; publicId: string; error?: never }
  | { error: string; imageUrl?: never; publicId?: never };

export async function uploadBookImage(formData: FormData): Promise<UploadResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "No autenticado" };
  }

  const file = formData.get("file") as File | null;
  const bookId = formData.get("bookId") as string | null;

  if (!file) {
    return { error: "No se recibió ningún archivo" };
  }

  if (!bookId) {
    return { error: "ID del libro es requerido" };
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Solo se permiten imágenes JPG, PNG o WebP" };
  }

  // Validate file size
  if (file.size > MAX_SIZE) {
    return { error: "La imagen no puede superar 3MB" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `sodu/books`,
              transformation: [
                { width: 300, height: 400, crop: "fill" },
                { quality: "auto" },
              ],
            },
            (error, res) => {
              if (error || !res) {
                return reject(error ?? new Error("Sin respuesta de Cloudinary"));
              }
              resolve(res as { secure_url: string; public_id: string });
            }
          )
          .end(buffer);
      }
    );

    // Update database with new image URL (skip for temporary IDs)
    if (!bookId.startsWith("temp-")) {
      await prisma.book.update({
        where: { id: bookId },
        data: { coverUrl: result.secure_url },
      });
    }

    revalidatePath("/lectura");

    return { imageUrl: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("[UPLOAD_BOOK_IMAGE_ERROR]", error);
    return { error: "No se pudo procesar la carga de imagen" };
  }
}

