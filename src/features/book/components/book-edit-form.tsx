"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { BookModel } from "@/app/generated/prisma/models/Book";
import { updateBookSchema, type UpdateBookInput } from "../schemas/book-schemas";
import { updateBook } from "../actions/book-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Loader2, Save } from "lucide-react";

interface BookEditFormProps {
  initialData: BookModel;
  redirectTo?: string;
}

export function BookEditForm({ initialData, redirectTo }: BookEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateBookInput>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      id: initialData.id,
      title: initialData.title,
      author: initialData.author,
      description: initialData.description,
      coverUrl: initialData.coverUrl,
      rating: initialData.rating,
      isActive: initialData.isActive,
    },
  });

  // Watch para el estado del checkbox si usas el componente Checkbox de shadcn
  const isActive = watch("isActive");

  const onSubmit = async (values: UpdateBookInput) => {
    setIsSubmitting(true);
    const response = await updateBook(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo actualizar el libro");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          // Si recordamos tu lógica, tomamos el primer error del string
          setError(field as keyof UpdateBookInput, { message });
        });
      }
      return;
    }

    toast.success("Libro actualizado correctamente");
    if (redirectTo) {
      router.push(redirectTo);
    }
    router.refresh();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Título del libro"
          placeholder="Ej. Cien años de soledad"
          error={errors.title?.message}
          register={register("title")}
        />
        <FormField
          label="Autor"
          placeholder="Ej. Gabriel García Márquez"
          error={errors.author?.message}
          register={register("author")}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="URL de la portada"
          placeholder="https://..."
          error={errors.coverUrl?.message}
          register={register("coverUrl")}
        />
        <FormField
          label="Calificación (0 - 5)"
          type="number"
          step="0.1"
          error={errors.rating?.message}
          register={register("rating", { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className={cn(
            "text-sm font-bold uppercase tracking-wide",
            errors.description ? "text-destructive" : "text-foreground/70"
          )}
        >
          Descripción
        </Label>
        <Textarea
          id="description"
          rows={5}
          className="resize-none border-border/60 focus:ring-primary/20"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-xs font-bold text-destructive animate-in fade-in-0 slide-in-from-top-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3 rounded-lg border border-border/40 bg-muted/20 p-4 transition-colors hover:bg-muted/30">
        <Checkbox
          id="isActive"
          checked={isActive}
          onCheckedChange={(checked) => setValue("isActive", checked as boolean, { shouldDirty: true })}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="isActive" className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Visible en la plataforma pública
          </Label>
          <p className="text-xs text-muted-foreground">
            Si está desactivado, el libro solo será visible para administradores.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={!isDirty || isSubmitting}
          className="min-w-[140px] font-bold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar cambios
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
