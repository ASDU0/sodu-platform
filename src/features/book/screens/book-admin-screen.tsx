import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBooks } from "../actions/book-actions";
import { EmptyState } from "@/components/empty-state";
import { BookTable } from "../components/book-table";
import { TableSearch } from "@/components/table-search";
import type { BookSortKey } from "../actions/book-actions";

const SORT_KEYS: BookSortKey[] = ["title", "author", "rating", "isActive", "createdAt"];

interface BookAdminScreenProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function BookAdminScreen({ searchParams }: BookAdminScreenProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
  const sortBy = typeof searchParams?.sortBy === "string" ? searchParams.sortBy : undefined;
  const sortOrder = typeof searchParams?.sortOrder === "string" ? searchParams.sortOrder : undefined;

  const safeSortBy = SORT_KEYS.includes(sortBy as BookSortKey)
    ? (sortBy as BookSortKey)
    : undefined;
  const safeSortOrder = sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;

  const books = await getBooks({
    query: query || undefined,
    sortBy: safeSortBy,
    sortOrder: safeSortOrder,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion de Libros
          </h1>
          <p className="text-sm text-muted-foreground">
            Administra los libros del club de lectura.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/books/new">Nuevo libro</Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <TableSearch placeholder="Buscar por titulo..." />
      </div>

      {books.length === 0 ? (
        <EmptyState
          title="Aun no hay libros registrados"
          description="Crea el primer libro para mostrarlo en la pagina publica."
          ctaLabel="Crear libro"
          ctaHref="/books/new"
        />
      ) : (
        <BookTable books={books} />
      )}
    </div>
  );
}
