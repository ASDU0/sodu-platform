import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookById } from "@/src/features/book/actions/book-actions";
import { BookEditForm } from "@/src/features/book/components/book-edit-form";
import { ChevronLeft } from "lucide-react";

interface EditBookPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
      {/* Header con navegación rápida */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Editar libro
          </h1>
          <p className="text-sm text-muted-foreground">
            Actualiza los datos del libro seleccionado para mantener el catálogo al día.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/books" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver al listado
          </Link>
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-foreground">
            Detalles del libro
          </CardTitle>
          <CardDescription>
            Modifica la información necesaria y guarda los cambios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <BookEditForm
            initialData={book}
            redirectTo="/dashboard/books"
          />
        </CardContent>
      </Card>

      {/* Versión móvil del botón volver (opcional, para mejor UX) */}
      <div className="sm:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/books">Volver</Link>
        </Button>
      </div>
    </main>
  );
}
