"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBookSchema, type CreateBookInput } from "../schemas/book-schemas";
import { createBook } from "../actions/book-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookCreateFormProps {
  redirectTo?: string;
}

export function BookCreateForm({ redirectTo }: BookCreateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      coverUrl: "",
      rating: 0,
      isActive: true,
    },
  });

  const onSubmit = async (values: CreateBookInput) => {
    setIsSubmitting(true);
    const response = await createBook(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo crear el libro");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field as keyof CreateBookInput, { message });
        });
      }
      return;
    }

    toast.success("Libro creado correctamente");
    reset();
    if (redirectTo) {
      router.push(redirectTo);
      router.refresh();
      return;
    }
    router.refresh();
  };

  return (
    <Card className="p-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Titulo"
            placeholder="Ej. El Aleph"
            error={errors.title?.message}
            register={register("title")}
          />
          <FormField
            label="Autor"
            placeholder="Ej. Jorge Luis Borges"
            error={errors.author?.message}
            register={register("author")}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="URL de portada"
            placeholder="https://..."
            error={errors.coverUrl?.message}
            register={register("coverUrl")}
          />
          <FormField
            label="Calificacion"
            placeholder="0 - 5"
            type="number"
            error={errors.rating?.message}
            register={register("rating", { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <Label className={errors.description ? "text-destructive" : undefined}>
            Descripcion
          </Label>
          <Textarea
            rows={5}
            placeholder="Resumen del libro"
            {...register("description")}
          />
          {errors.description?.message ? (
            <p className="text-xs font-semibold text-destructive">{errors.description.message}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <Input type="checkbox" className="h-4 w-4" {...register("isActive")} />
          <Label>Visible en la web</Label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Crear libro"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
