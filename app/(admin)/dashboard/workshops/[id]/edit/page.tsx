import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkshopById } from "@/src/features/workshop/actions/workshop-actions";
import { WorkshopEditForm } from "@/src/features/workshop/components/workshop-edit-form";
import { ChevronLeft } from "lucide-react";

interface EditWorkshopPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWorkshopPage({ params }: EditWorkshopPageProps) {
  const { id } = await params;
  const workshop = await getWorkshopById(id);

  if (!workshop) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
      {/* Header con navegación rápida */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Editar taller
          </h1>
          <p className="text-sm text-muted-foreground">
            Actualiza los datos del taller seleccionado para mantener el catálogo al día.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/workshops" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-foreground">
            Detalles del taller
          </CardTitle>
          <CardDescription>
            Modifica la información necesaria y guarda los cambios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <WorkshopEditForm initialData={workshop} />
        </CardContent>
      </Card>
    </main>
  );
}
