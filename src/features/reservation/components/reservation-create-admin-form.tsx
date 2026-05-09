"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createReservationAdminSchema,
  type CreateReservationAdminInput,
} from "../schemas/reservation-schemas";
import { createReservationAdmin } from "../actions/reservation-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EventModel } from "@/app/generated/prisma/models/Event";

interface ReservationCreateAdminFormProps {
  events: EventModel[];
  redirectTo?: string;
}

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pendiente" },
  { value: "CONFIRMED", label: "Confirmada" },
  { value: "CANCELLED", label: "Cancelada" },
] as const;

export function ReservationCreateAdminForm({
  events,
  redirectTo,
}: ReservationCreateAdminFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createReservationAdminSchema),
    defaultValues: {
      eventId: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
      status: "CONFIRMED" as const,
    },
  });

  const onSubmit = async (values: Record<string, unknown>) => {
    setIsSubmitting(true);
    const response = await createReservationAdmin(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo crear la reserva");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field as "name", { message });
        });
      }
      return;
    }

    toast.success("Reserva creada correctamente");
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
        <div className="space-y-2">
          <Label className={errors.eventId ? "text-destructive font-semibold" : undefined}>
            Evento
          </Label>
          <select
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
            {...register("eventId")}
          >
            <option value="">Seleccionar evento...</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title} — {new Date(e.date).toLocaleDateString("es-PE")}
              </option>
            ))}
          </select>
          {errors.eventId?.message && (
            <p className="text-xs font-semibold text-destructive">{errors.eventId.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Nombre completo"
            placeholder="Nombre del asistente"
            error={errors.name?.message}
            register={register("name")}
          />
          <FormField
            label="Correo electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            error={errors.email?.message}
            register={register("email")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Teléfono (opcional)"
            type="tel"
            placeholder="999 999 999"
            error={errors.phone?.message}
            register={register("phone")}
          />
          <div className="space-y-2">
            <Label>Estado inicial</Label>
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
              {...register("status")}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Notas (opcional)</Label>
          <Textarea rows={3} placeholder="Notas internas..." {...register("notes")} />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(redirectTo ?? "/dashboard/reservations")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Crear reserva"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
