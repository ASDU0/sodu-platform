"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { BookModel } from "@/app/generated/prisma/models/Book";
import { deleteBook } from "../actions/book-actions";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/pagination";
import { useTableFilters } from "@/src/hooks/use-table-filters";

interface BookTableProps {
  books: BookModel[];
}

type SortColumn = "title" | "author" | "rating" | "isActive";

const PAGE_SIZE = 8;

export function BookTable({ books }: BookTableProps) {
  const router = useRouter();
  const [recordToDelete, setRecordToDelete] = useState<BookModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    currentSortBy,
    currentSortOrder,
    sortLink,
    safePage,
    totalPages,
    startIndex,
  } = useTableFilters<SortColumn>(books.length, PAGE_SIZE, {
    sortKeys: ["title", "author", "rating", "isActive"],
  });

  const pagedBooks = books.slice(startIndex, startIndex + PAGE_SIZE);

  const renderSortIcon = (column: SortColumn) => {
    if (currentSortBy !== column) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
    }
    return currentSortOrder === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-primary" />
    );
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;

    setIsDeleting(true);
    const deletePromise = deleteBook({ id: recordToDelete.id });

    toast.promise(deletePromise, {
      loading: "Eliminando libro...",
      success: "Libro eliminado",
      error: "No se pudo eliminar el libro",
    });

    const result = await deletePromise;
    setIsDeleting(false);
    setIsDeleteModalOpen(false);

    if (result.success) {
      router.refresh();
    }
  };

  return (
    <div className="space-y-4">
      {/* Eliminamos el borde manual ya que el contenedor padre en el Screen debería manejarlo */}
      <div className="overflow-hidden rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {(["title", "author", "rating", "isActive"] as const).map((col) => (
                <TableHead key={col}>
                  <Link
                    href={sortLink(col)}
                    className={cn(
                      "group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary",
                      currentSortBy === col ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {col === "title" && "Título"}
                    {col === "author" && "Autor"}
                    {col === "rating" && "Calif."}
                    {col === "isActive" && "Estado"}
                    {renderSortIcon(col)}
                  </Link>
                </TableHead>
              ))}
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedBooks.map((book) => (
              <TableRow key={book.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold text-foreground">
                  {book.title}
                </TableCell>
                <TableCell className="text-muted-foreground">{book.author}</TableCell>
                <TableCell className="tabular-nums font-medium">
                  {book.rating.toFixed(1)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={book.isActive ? "default" : "secondary"}
                    className="rounded-md font-bold px-2.5 py-0.5"
                  >
                    {book.isActive ? "Visible" : "Oculto"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/book/${book.id}/edit`}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onClick={() => {
                          setRecordToDelete(book);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination page={safePage} totalPages={totalPages} />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        title="Eliminar libro"
        description={`Esta acción eliminará el libro "${recordToDelete?.title ?? ""}". ¿Estás seguro?`}
        loading={isDeleting}
      />
    </div>
  );
}
