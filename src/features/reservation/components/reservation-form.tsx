"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { createReservationSchema, type CreateReservationInput } from "../schemas/reservation-schemas";
import { createReservation } from "../actions/reservation-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EventWithStats } from "@/src/features/event/actions/event-actions";

interface ReservationFormProps {
  event: EventWithStats;
}

export function ReservationForm({ event }: ReservationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFull = event.availableSpots !== null && event.availableSpots <= 0;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateReservationInput>({
    resolver: zodResolver(createReservationSchema),
    defaultValues: {
      eventId: event.id,
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = async (values: CreateReservationInput) => {
    setIsSubmitting(true);
    const response = await createReservation(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo registrar la reserva");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field as keyof CreateReservationInput, { message });
        });
      }
      return;
    }

    setSubmitted(true);
    toast.success("¡Reserva registrada con éxito!");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#030a50]">¡Reserva registrada!</h3>
        <p className="text-gray-500 max-w-sm">
          Tu lugar en <strong>{event.title}</strong> ha sido reservado. Te contactaremos para confirmar.
        </p>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
        <p className="text-lg font-bold text-red-600">Este evento ya no tiene cupos disponibles.</p>
        <p className="text-sm text-gray-500">Pronto publicaremos nuevas fechas.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("eventId")} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Nombre completo"
          placeholder="Tu nombre"
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

      <FormField
        label="Teléfono (opcional)"
        type="tel"
        placeholder="999 999 999"
        error={errors.phone?.message}
        register={register("phone")}
      />

      <div className="space-y-2">
        <Label>Notas adicionales (opcional)</Label>
        <Textarea
          rows={3}
          placeholder="¿Alguna pregunta o comentario?"
          {...register("notes")}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#030a50] hover:bg-[#be8a34] hover:text-[#030a50] text-white font-bold h-12 transition-all"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrando..." : "Reservar mi lugar"}
      </Button>
    </form>
  );
}
