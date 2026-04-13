import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMemberById } from "@/src/features/member/actions/member-actions";
import { MemberEditForm } from "@/src/features/member/components/member-edit-form";
import { ChevronLeft } from "lucide-react";

interface EditMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  const { id } = await params;
  const member = await getMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Editar miembro
          </h1>
          <p className="text-sm text-muted-foreground">
            Actualiza los datos del perfil para mantener el equipo al dia.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/members" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-foreground">
            Detalles del miembro
          </CardTitle>
          <CardDescription>
            Modifica la informacion necesaria y guarda los cambios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <MemberEditForm
            initialData={member}
            redirectTo="/dashboard/members"
          />
        </CardContent>
      </Card>

      <div className="sm:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/members">Volver</Link>
        </Button>
      </div>
    </main>
  );
}

