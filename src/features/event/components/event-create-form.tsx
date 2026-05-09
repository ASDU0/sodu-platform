"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createEventSchema, type CreateEventInput } from "../schemas/event-schemas";
import { createEvent } from "../actions/event-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EVENT_TYPES = ["Actividad", "Cinefórum", "Taller", "Seminario", "Debate", "Conferencia"];

interface EventCreateFormProps {
  redirectTo?: string;
}

export function EventCreateForm({ redirectTo }: EventCreateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      date: undefined,
      location: "",
      description: "",
      type: "Actividad",
      link: "",
      capacity: undefined,
      isActive: true,
    },
  });

  const onSubmit = async (values: Record<string, unknown>) => {
    setIsSubmitting(true);
    const response = await createEvent(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo crear el evento");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field as "title", { message });
        });
      }
      return;
    }

    toast.success("Evento creado correctamente");
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
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Título del evento"
          placeholder="Ej. Taller de Oratoria"
          error={errors.title?.message}
          register={register("title")}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Fecha y hora"
            type="datetime-local"
            error={errors.date?.message}
            register={register("date")}
          />
          <div className="space-y-2">
            <Label>Tipo de evento</Label>
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
              {...register("type")}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Lugar"
            placeholder="Ej. Auditorio UNSAAC"
            error={errors.location?.message}
            register={register("location")}
          />
          <FormField
            label="Cupos disponibles (vacío = ilimitado)"
            type="number"
            placeholder="Ej. 30"
            error={errors.capacity?.message}
            register={register("capacity")}
          />
        </div>

        <FormField
          label="Enlace (opcional)"
          placeholder="https://..."
          error={errors.link?.message}
          register={register("link")}
        />

        <div className="space-y-2">
          <Label className={errors.description ? "text-destructive" : undefined}>
            Descripción
          </Label>
          <Textarea
            rows={4}
            placeholder="Descripción del evento..."
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-xs font-semibold text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 p-4">
          <Input type="checkbox" className="h-4 w-4" {...register("isActive")} />
          <Label>Visible en la web</Label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Crear evento"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
