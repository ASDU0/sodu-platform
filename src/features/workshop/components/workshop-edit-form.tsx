'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save } from 'lucide-react';
import { FormField } from '@/components/forms/form-field';
import { updateWorkshopSchema, type UpdateWorkshopInput } from '../schemas/workshop-schema';
import { updateWorkshop } from '../actions/workshop-actions';
import { WorkshopImageUpload } from './workshop-image-upload';
import type { WorkshopModel as Workshop } from "@/app/generated/prisma/models/Workshop";
import { cn } from '@/lib/utils';

interface WorkshopEditFormProps {
  initialData: Workshop;
  redirectTo?: string;
}

export function WorkshopEditForm({ initialData, redirectTo = '/dashboard/workshops' }: WorkshopEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(initialData.imageUrl || null);

  // Format date para input type="datetime-local"
  const formatDateForInput = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    watch,
    setValue,
  } = useForm<UpdateWorkshopInput>({
    resolver: zodResolver(updateWorkshopSchema),
    defaultValues: {
      id: initialData.id,
      title: initialData.title,
      description: initialData.description,
      startsAt: formatDateForInput(initialData.startsAt),
      location: initialData.location,
      capacity: initialData.capacity,
      imageUrl: initialData.imageUrl || undefined,
      isActive: initialData.isActive,
    },
  });

  const isActive = watch('isActive');

  const onSubmit = async (data: UpdateWorkshopInput) => {
    // Use uploaded image URL if available, otherwise use the form value
    const finalData = {
      ...data,
      imageUrl: imageUrl || data.imageUrl,
    };

    setIsSubmitting(true);
    try {
      const result = await updateWorkshop(data.id, finalData);

      if (!result.success) {
        if (result.details) {
          Object.entries(result.details).forEach(([field, message]) => {
            setError(field as keyof UpdateWorkshopInput, {
              message: message as string,
            });
          });
        } else {
          toast.error(result.error || 'Error desconocido');
        }
        return;
      }

      toast.success('Taller actualizado exitosamente');
      router.push(redirectTo);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = () => {
    toast.error("Por favor, corrige los errores en el formulario");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
      {/* Image Upload Section */}
      <div className="space-y-3">
        <WorkshopImageUpload
          workshopId={initialData.id}
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

        <div className="md:col-span-2">
          <Label htmlFor="startsAt" className="text-sm font-medium text-foreground">
            Fecha y hora de inicio
          </Label>
          <Input
            id="startsAt"
            type="datetime-local"
            placeholder="Selecciona fecha y hora"
            {...register('startsAt')}
            className="mt-2"
          />
          {errors.startsAt && (
            <p className="mt-1 text-xs text-red-500">{errors.startsAt.message}</p>
          )}
        </div>

        <FormField
          label="Capacidad (personas)"
          placeholder="Ej. 30"
          type="number"
          error={errors.capacity?.message}
          register={register('capacity', { valueAsNumber: true })}
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium text-foreground">
          Descripción
        </Label>
        <Textarea
          id="description"
          placeholder="Describe el contenido, objetivos y detalles del taller..."
          className="mt-2 min-h-32 resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 p-4 transition-colors hover:bg-muted/30">
        <Checkbox
          id="isActive"
          checked={isActive}
          onCheckedChange={(checked) => setValue('isActive', checked as boolean, { shouldDirty: true })}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="isActive" className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Taller activo
          </Label>
          <p className="text-xs text-muted-foreground">
            Si está desactivado, el taller solo será visible para administradores.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          asChild
        >
          <Link href="/dashboard/workshops">Cancelar</Link>
        </Button>
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
