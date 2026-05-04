'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { FormField } from '@/components/forms/form-field';
import { workshopSchema, type WorkshopFormData } from '../schemas/workshop-schema';
import { createWorkshop } from '../actions/workshop-actions';
import { WorkshopImageUpload } from './workshop-image-upload';

interface WorkshopFormProps {
  redirectTo?: string;
  onSuccess?: () => void;
}

export function WorkshopForm({ redirectTo, onSuccess }: WorkshopFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<WorkshopFormData>({
    resolver: zodResolver(workshopSchema),
    defaultValues: {
      title: "",
      description: "",
      startsAt: "",
      location: "",
      capacity: "" as unknown as number,
      imageUrl: undefined,
      isActive: true,
    },
  });

  const onSubmit = async (data: WorkshopFormData) => {
    // Use uploaded image URL if available
    const finalData = {
      ...data,
      imageUrl: imageUrl || data.imageUrl,
    };

    const result = await createWorkshop(finalData);

    if (!result.success) {
      if (result.details) {
        Object.entries(result.details).forEach(([field, message]) => {
          setError(field as keyof WorkshopFormData, {
            message: message as string,
          });
        });
      } else {
        toast.error(result.error || 'Error desconocido');
      }
      return;
    }

    toast.success('Taller creado exitosamente');
    if (redirectTo) {
      router.push(redirectTo);
      router.refresh();
      return;
    }
    router.refresh();
    onSuccess?.();
  };

  // Generate a temporary ID for image upload during creation
  const tempWorkshopId = `temp-${Date.now()}`;

  const onInvalid = () => {
    toast.error("Por favor, corrige los errores en el formulario");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      {/* Image Upload Section */}
      <div className="space-y-3">
        <WorkshopImageUpload
          workshopId={tempWorkshopId}
          currentImageUrl={imageUrl}
          onImageChange={(url) => {
            setImageUrl(url);
            setValue("imageUrl", url, { shouldDirty: true });
          }}
        />
      </div>

      {/* Workshop Details Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Título"
            placeholder="Ej. Debate Avanzado"
            error={errors.title?.message}
            register={register('title')}
          />

          <FormField
            label="Ubicación"
            placeholder="Ej. Auditorio Principal"
            error={errors.location?.message}
            register={register('location')}
          />
        </div>

        {/* Date and Capacity */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Fecha y Hora"
            type="datetime-local"
            error={errors.startsAt?.message}
            register={register('startsAt')}
          />

          <FormField
            label="Capacidad"
            placeholder="0"
            type="number"
            error={errors.capacity?.message}
            register={register('capacity', { valueAsNumber: true })}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className={errors.description ? "text-destructive" : undefined}>
            Descripción
          </Label>
          <Textarea
            rows={5}
            placeholder="Descripción del taller"
            {...register('description')}
          />
          {errors.description?.message ? (
            <p className="text-xs font-semibold text-destructive">{errors.description.message}</p>
          ) : null}
        </div>

      {/* Visibility Toggle */}
      <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 p-4 transition-colors hover:bg-muted/30">
        <Checkbox
          id="isActive"
          defaultChecked
          onCheckedChange={(checked) => setValue('isActive', checked as boolean, { shouldDirty: true })}
        />
        <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
          Visible en la web
        </Label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando
            </>
          ) : (
            "Crear taller"
          )}
        </Button>
      </div>
    </form>
  );
}