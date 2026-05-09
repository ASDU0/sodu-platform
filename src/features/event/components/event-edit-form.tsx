"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateEventSchema, type UpdateEventInput } from "../schemas/event-schemas";
import { updateEvent } from "../actions/event-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EventModel } from "@/app/generated/prisma/models/Event";

const EVENT_TYPES = ["Actividad", "Cinefórum", "Taller", "Seminario", "Debate", "Conferencia"];

interface EventEditFormProps {
  event: EventModel;
  redirectTo?: string;
}

function toDatetimeLocal(date: Date): string {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventEditForm({ event, redirectTo }: EventEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      id: event.id,
      title: event.title,
      date: new Date(event.date),
      location: event.location ?? "",
      description: event.description ?? "",
      type: event.type,
      link: event.link ?? "",
      capacity: event.capacity ?? undefined,
      isActive: event.isActive,
    },
  });

  const onSubmit = async (values: Record<string, unknown>) => {
    setIsSubmitting(true);
    const response = await updateEvent(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo actualizar el evento");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field as "title", { message });
        });
      }
      return;
    }

    toast.success("Evento actualizado correctamente");
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
        <input type="hidden" {...register("id")} />

        <FormField
          label="Título del evento"
          error={errors.title?.message}
          register={register("title")}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Fecha y hora</Label>
            <Input
              type="datetime-local"
              defaultValue={toDatetimeLocal(new Date(event.date))}
              {...register("date")}
            />
            {errors.date?.message && (
              <p className="text-xs font-semibold text-destructive">{errors.date.message}</p>
            )}
          </div>
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
            error={errors.location?.message}
            register={register("location")}
          />
          <FormField
            label="Cupos disponibles (vacío = ilimitado)"
            type="number"
            error={errors.capacity?.message}
            register={register("capacity")}
          />
        </div>

        <FormField
          label="Enlace (opcional)"
          error={errors.link?.message}
          register={register("link")}
        />

        <div className="space-y-2">
          <Label className={errors.description ? "text-destructive" : undefined}>Descripción</Label>
          <Textarea rows={4} {...register("description")} />
          {errors.description?.message && (
            <p className="text-xs font-semibold text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 p-4">
          <Input type="checkbox" className="h-4 w-4" {...register("isActive")} />
          <Label>Visible en la web</Label>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(redirectTo ?? "/dashboard/events")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
