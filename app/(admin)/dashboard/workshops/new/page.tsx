import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkshopForm } from "@/src/features/workshop/components/workshop-form";

export default function NewWorkshopPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Nuevo taller</h1>
          <p className="text-sm text-muted-foreground">
            Completa la información para agregar un taller.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/workshops">Volver</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del taller</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkshopForm redirectTo="/dashboard/workshops" />
        </CardContent>
      </Card>
    </main>
  );
}