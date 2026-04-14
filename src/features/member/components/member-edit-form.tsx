"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { MemberModel } from "@/app/generated/prisma/models/Member";
import { updateMemberSchema } from "../schemas/member-schemas";
import { updateMember } from "../actions/member-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Loader2, Save } from "lucide-react";
import { MemberImageUpload } from "./member-image-upload";

interface MemberEditFormProps {
  initialData: MemberModel;
  redirectTo?: string;
}

const ROLE_OPTIONS = [
  { value: "COACH", label: "Coach" },
  { value: "DIRECTIVA", label: "Directiva" },
] as const;

export function MemberEditForm({ initialData, redirectTo }: MemberEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      id: initialData.id,
      name: initialData.name,
      roleTitle: initialData.roleTitle,
      bio: initialData.bio,
      imageUrl: initialData.imageUrl ?? undefined,
      type: initialData.type,
      order: initialData.order,
      isActive: initialData.isActive,
    },
  });

  const isActive = watch("isActive");

  const onSubmit = async (values: Record<string, unknown>) => {
    setIsSubmitting(true);
    const response = await updateMember(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo actualizar el miembro");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          const fieldName = field as "id" | "name" | "roleTitle" | "bio" | "type" | "order" | "isActive" | "imageUrl";
          setError(fieldName, { message });
        });
      }
      return;
    }

    toast.success("Miembro actualizado correctamente");
    if (redirectTo) {
      router.push(redirectTo);
    }
    router.refresh();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Nombre completo"
          placeholder="Ej. Maria Perez"
          error={errors.name?.message}
          register={register("name")}
        />
        <FormField
          label="Cargo o rol"
          placeholder="Ej. Presidenta"
          error={errors.roleTitle?.message}
          register={register("roleTitle")}
        />
      </div>

       <div className="grid gap-6 md:grid-cols-2">
         <div className="space-y-2">
           <MemberImageUpload
             memberId={initialData.id}
             currentImageUrl={initialData.imageUrl}
             onImageChange={(imageUrl) => {
               setValue("imageUrl", imageUrl, { shouldDirty: true });
             }}
           />
         </div>

        <FormField
          label="Orden de aparicion"
          type="number"
          error={errors.order?.message}
          register={register("order", { valueAsNumber: true })}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            className={cn(
              "text-sm font-bold uppercase tracking-wide",
              errors.type ? "text-destructive" : "text-foreground/70"
            )}
          >
            Tipo de miembro
          </Label>
          <select
            className={cn(
              "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm",
              errors.type?.message && "border-destructive focus-visible:ring-destructive/20"
            )}
            {...register("type")}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type?.message ? (
            <p className="text-xs font-semibold text-destructive animate-in fade-in slide-in-from-top-1">
              {errors.type.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center space-x-3 rounded-lg border border-border/40 bg-muted/20 p-4 transition-colors hover:bg-muted/30">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setValue("isActive", checked as boolean, { shouldDirty: true })}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="isActive" className="text-sm font-bold leading-none">
              Visible en la plataforma pública
            </Label>
            <p className="text-xs text-muted-foreground">
              Si está desactivado, el perfil no será visible para usuarios públicos.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="bio"
          className={cn(
            "text-sm font-bold uppercase tracking-wide",
            errors.bio ? "text-destructive" : "text-foreground/70"
          )}
        >
          Biografia
        </Label>
        <Textarea
          id="bio"
          rows={5}
          className="resize-none border-border/60 focus:ring-primary/20"
          {...register("bio")}
        />
        {errors.bio?.message && (
          <p className="text-xs font-bold text-destructive animate-in fade-in-0 slide-in-from-top-1">
            {errors.bio.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={!isDirty || isSubmitting}
          className="min-w-[160px] font-bold"
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

