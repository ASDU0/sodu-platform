/**
 * Book Metadata Server Actions
 *
 * Server-side actions for fetching and enriching book metadata
 * from external APIs.
 *
 * These actions are called from the book forms to auto-populate
 * fields with external data.
 */

"use server";

import type { ActionResponse } from "@/types/action-response";
import { bookApiService, type BookMetadata } from "../services/book-api-service";
import { getValidationErrors } from "@/lib/utils/zod-errors";
import { z } from "zod";

/**
 * Schema for fetching book metadata by ISBN
 */
const fetchBookMetadataSchema = z.object({
  isbn: z.string().trim().min(10, "ISBN must be at least 10 characters"),
});

type FetchBookMetadataInput = z.infer<typeof fetchBookMetadataSchema>;

/**
 * Fetch book metadata from external APIs
 * Used to auto-populate book form fields
 */
export async function fetchBookMetadata(
  input: unknown
): Promise<ActionResponse<BookMetadata>> {
  const parsed = fetchBookMetadataSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "ISBN inválido",
      details: getValidationErrors(parsed.error),
    };
  }

  try {
    const metadata = await bookApiService.fetchBookMetadata(parsed.data.isbn);

    if (!metadata) {
      return {
        success: false,
        error: "No se encontró información del libro con ese ISBN",
      };
    }

    return {
      success: true,
      data: metadata,
    };
  } catch (error) {
    console.error("[FETCH_BOOK_METADATA_ACTION_ERROR]", error);
    return {
      success: false,
      error: "No se pudo obtener la información del libro",
    };
  }
}

/**
 * Schema for searching books
 */
const searchBooksSchema = z.object({
  query: z.string().trim().min(2, "Query must be at least 2 characters"),
});

type SearchBooksInput = z.infer<typeof searchBooksSchema>;

/**
 * Search for books by title or author
 * Used in book form autocomplete
 */
export async function searchBooks(
  input: unknown
): Promise<ActionResponse<BookMetadata[]>> {
  const parsed = searchBooksSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Búsqueda inválida",
      details: getValidationErrors(parsed.error),
    };
  }

  try {
    const results = await bookApiService.searchBooks(parsed.data.query);

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("[SEARCH_BOOKS_ACTION_ERROR]", error);
    return {
      success: false,
      error: "No se pudo completar la búsqueda",
    };
  }
}

/**
 * Schema for validating ISBN
 */
const validateISBNSchema = z.object({
  isbn: z.string().trim().min(10, "ISBN must be at least 10 characters"),
});

type ValidateISBNInput = z.infer<typeof validateISBNSchema>;

/**
 * Validate ISBN format
 */
export async function validateISBN(input: unknown): Promise<ActionResponse<boolean>> {
  const parsed = validateISBNSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "ISBN inválido",
      details: getValidationErrors(parsed.error),
    };
  }

  try {
    const isValid = await bookApiService.validateISBN(parsed.data.isbn);

    return {
      success: true,
      data: isValid,
    };
  } catch (error) {
    console.error("[VALIDATE_ISBN_ACTION_ERROR]", error);
    return {
      success: false,
      error: "No se pudo validar el ISBN",
    };
  }
}

/**
 * Schema for getting book reviews
 */
const getBookReviewsSchema = z.object({
  bookId: z.string().min(1),
});

type GetBookReviewsInput = z.infer<typeof getBookReviewsSchema>;

/**
 * Get book reviews from external service
 */
export async function getBookReviews(
  input: unknown
): Promise<
  ActionResponse<
    Array<{
      author: string;
      rating: number;
      content: string;
      date: string;
    }>
  >
> {
  const parsed = getBookReviewsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "ID de libro inválido",
      details: getValidationErrors(parsed.error),
    };
  }

  try {
    const reviews = await bookApiService.getBookReviews(parsed.data.bookId);

    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    console.error("[GET_BOOK_REVIEWS_ACTION_ERROR]", error);
    return {
      success: false,
      error: "No se pudieron obtener las reseñas",
    };
  }
}

