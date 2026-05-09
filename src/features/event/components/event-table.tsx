"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { EventModel } from "@/app/generated/prisma/models/Event";
import { deleteEvent } from "../actions/event-actions";
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

interface EventTableProps {
  events: EventModel[];
}

type SortColumn = "title" | "date" | "type" | "isActive";

const PAGE_SIZE = 8;

export function EventTable({ events }: EventTableProps) {
  const router = useRouter();
  const [recordToDelete, setRecordToDelete] = useState<EventModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { currentSortBy, currentSortOrder, sortLink, safePage, totalPages, startIndex } =
    useTableFilters<SortColumn>(events.length, PAGE_SIZE, {
      sortKeys: ["title", "date", "type", "isActive"],
    });

  const pagedEvents = events.slice(startIndex, startIndex + PAGE_SIZE);

  const renderSortIcon = (column: SortColumn) => {
    if (currentSortBy !== column)
      return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
    return currentSortOrder === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-primary" />
    );
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    const deletePromise = deleteEvent({ id: recordToDelete.id });

    toast.promise(deletePromise, {
      loading: "Eliminando evento...",
      success: "Evento eliminado",
      error: "No se pudo eliminar el evento",
    });

    const result = await deletePromise;
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    if (result.success) router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {(["title", "date", "type", "isActive"] as const).map((col) => (
                <TableHead key={col}>
                  <Link
                    href={sortLink(col)}
                    className={cn(
                      "group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary",
                      currentSortBy === col ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {col === "title" && "Título"}
                    {col === "date" && "Fecha"}
                    {col === "type" && "Tipo"}
                    {col === "isActive" && "Estado"}
                    {renderSortIcon(col)}
                  </Link>
                </TableHead>
              ))}
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Cupos
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedEvents.map((event) => (
              <TableRow key={event.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold text-foreground max-w-[200px] truncate">
                  {event.title}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(event.date).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-md font-semibold">
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={event.isActive ? "default" : "secondary"}
                    className="rounded-md font-bold px-2.5 py-0.5"
                  >
                    {event.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {event.capacity !== null ? event.capacity : "Ilimitado"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/events/${event.id}/edit`} className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onClick={() => {
                          setRecordToDelete(event);
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
        title="Eliminar evento"
        description={`¿Estás seguro de que deseas eliminar "${recordToDelete?.title ?? ""}"? También se eliminarán todas sus reservas.`}
        loading={isDeleting}
      />
    </div>
  );
}
