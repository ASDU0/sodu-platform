import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberCreateForm } from "@/src/features/member/components/member-create-form";

export default function NewMemberPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Nuevo miembro</h1>
          <p className="text-sm text-muted-foreground">
            Completa la informacion para agregar un miembro.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/members">Volver</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del miembro</CardTitle>
        </CardHeader>
        <CardContent>
          <MemberCreateForm redirectTo="/dashboard/members" />
        </CardContent>
      </Card>
    </main>
  );
}

