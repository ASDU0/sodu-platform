import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCreateForm } from "@/src/features/book/components/book-create-form";

export default function NewBookPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Nuevo libro</h1>
          <p className="text-sm text-muted-foreground">
            Completa la informacion para agregar un libro.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/books">Volver</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del libro</CardTitle>
        </CardHeader>
        <CardContent>
          <BookCreateForm redirectTo="/dashboard/books" />
        </CardContent>
      </Card>
    </main>
  );
}

