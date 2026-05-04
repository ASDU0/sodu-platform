import { z } from 'zod';

const dateIsValidAndFuture = (value: string) => {
  const date = new Date(value);
  // Restamos 24 horas a la fecha actual para dar tolerancia por diferencias de zona horaria entre cliente y servidor
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return !isNaN(date.getTime()) && date > yesterday;
};

export const workshopSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  startsAt: z.string()
    .min(1, 'La fecha y hora son obligatorias')
    .refine(dateIsValidAndFuture, {
      message: 'La fecha debe ser futura',
    }),
  location: z.string().min(3, 'La ubicación debe tener al menos 3 caracteres'),
  capacity: z.number({ message: "La capacidad es obligatoria y debe ser un número válido" }).int('La capacidad debe ser un número entero').min(1, 'La capacidad debe ser de al menos 1'),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
});

export const updateWorkshopSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  startsAt: z.string()
    .min(1, 'La fecha y hora son obligatorias')
    .refine(dateIsValidAndFuture, {
      message: 'La fecha debe ser futura',
    }),
  location: z.string().min(3, 'La ubicación debe tener al menos 3 caracteres'),
  capacity: z.number({ message: "La capacidad es obligatoria y debe ser un número válido" }).int('La capacidad debe ser un número entero').min(1, 'La capacidad debe ser de al menos 1'),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
});

export type WorkshopFormData = z.infer<typeof workshopSchema>;
export type UpdateWorkshopInput = z.infer<typeof updateWorkshopSchema>;