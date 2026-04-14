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

    // Type guard for error field objects
    if (field && typeof field === "object" && "_errors" in field) {
      const errorList = (field as { _errors: string[] })._errors;
      if (errorList && errorList.length > 0) {
        // Keep KISS principle: only first error
        errors[key] = errorList[0];
      }
    }
  }

  return errors;
}
