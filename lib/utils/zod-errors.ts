import { z } from "zod";

/**
 * Representa los errores de validación de forma plana: { campo: "mensaje" }
 */
export type ValidationError<T> = Partial<Record<keyof T, string>>;

export function getValidationErrors<T>(error: z.ZodError<T>): Record<string, string> {
  const formatted = z.treeifyError(error);
  const errors: Record<string, string> = {};

  for (const key in formatted) {
    if (key === "_errors") continue;

    const field = formatted[key as keyof typeof formatted];

    if (field && "_errors" in field && field._errors.length > 0) {
      // Mantenemos el principio KISS: solo el primer error
      errors[key] = field._errors[0];
    }
  }

  return errors;
}
