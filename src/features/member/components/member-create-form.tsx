"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createMemberSchema, type CreateMemberInput } from "../schemas/member-schemas";
import { createMember } from "../actions/member-actions";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MemberCreateFormProps {
  redirectTo?: string;
}

const ROLE_OPTIONS = [
  { value: "COACH", label: "Coach" },
  { value: "DIRECTIVA", label: "Directiva" },
] as const;

export function MemberCreateForm({ redirectTo }: MemberCreateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateMemberInput>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: "",
      roleTitle: "",
      bio: "",
      imageUrl: undefined,
      type: "COACH",
      order: 0,
      isActive: true,
    },
  });

  const onSubmit = async (values: CreateMemberInput) => {
    setIsSubmitting(true);
    const response = await createMember(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.error ?? "No se pudo crear el miembro");
      if (response.details) {
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field as keyof CreateMemberInput, { message });
        });
      }
      return;
    }

    toast.success("Miembro creado correctamente");
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

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="URL de imagen"
            placeholder="https://..."
            error={errors.imageUrl?.message}
            register={register("imageUrl", {
              setValueAs: (value) => (value ? value : undefined),
            })}
          />
          <FormField
            label="Orden de aparicion"
            placeholder="0"
            type="number"
            error={errors.order?.message}
            register={register("order", { valueAsNumber: true })}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className={cn(errors.type?.message && "text-destructive font-semibold")}>
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

          <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 p-4">
            <Input type="checkbox" className="h-4 w-4" {...register("isActive")} />
            <Label>Visible en la web</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label className={errors.bio ? "text-destructive" : undefined}>Biografia</Label>
          <Textarea
            rows={5}
            placeholder="Descripcion breve del miembro"
            {...register("bio")}
          />
          {errors.bio?.message ? (
            <p className="text-xs font-semibold text-destructive">{errors.bio.message}</p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Crear miembro"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

