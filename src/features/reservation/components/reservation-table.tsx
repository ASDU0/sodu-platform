"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import type { ReservationStatus } from "@/app/generated/prisma/client";
import type { ReservationWithEvent } from "../actions/reservation-actions";
import { deleteReservation, updateReservationStatus } from "../actions/reservation-actions";
import { ReservationStatusBadge } from "./reservation-status-badge";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Pagination } from "@/components/pagination";
import { useTableFilters } from "@/src/hooks/use-table-filters";
import { MoreHorizontal } from "lucide-react";

interface ReservationTableProps {
  reservations: ReservationWithEvent[];
}

const PAGE_SIZE = 10;

export function ReservationTable({ reservations }: ReservationTableProps) {
  const router = useRouter();
  const [recordToDelete, setRecordToDelete] = useState<ReservationWithEvent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { safePage, totalPages, startIndex } = useTableFilters(reservations.length, PAGE_SIZE, {
    sortKeys: [] as never[],
  });

  const paged = reservations.slice(startIndex, startIndex + PAGE_SIZE);

  const handleStatusChange = async (id: string, status: ReservationStatus) => {
    setUpdatingId(id);
    const result = await updateReservationStatus({ id, status });
    setUpdatingId(null);

    if (result.success) {
      toast.success("Estado actualizado");
      router.refresh();
    } else {
      toast.error(result.error ?? "No se pudo actualizar el estado");
    }
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);

    const deletePromise = deleteReservation({ id: recordToDelete.id });
    toast.promise(deletePromise, {
      loading: "Eliminando reserva...",
      success: "Reserva eliminada",
      error: "No se pudo eliminar la reserva",
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
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Evento
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Nombre
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Correo
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Teléfono
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Estado
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Fecha
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((res) => (
              <TableRow key={res.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold text-foreground max-w-[160px] truncate">
                  {res.event.title}
                </TableCell>
                <TableCell className="font-medium">{res.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{res.email}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {res.phone ?? "—"}
                </TableCell>
                <TableCell>
                  <ReservationStatusBadge status={res.status} />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(res.createdAt).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted"
                        disabled={updatingId === res.id}
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        className="cursor-pointer text-green-700 focus:text-green-700 focus:bg-green-50"
                        onClick={() => handleStatusChange(res.id, "CONFIRMED")}
                        disabled={res.status === "CONFIRMED"}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-yellow-700 focus:text-yellow-700 focus:bg-yellow-50"
                        onClick={() => handleStatusChange(res.id, "PENDING")}
                        disabled={res.status === "PENDING"}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Marcar pendiente
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => handleStatusChange(res.id, "CANCELLED")}
                        disabled={res.status === "CANCELLED"}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancelar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onClick={() => {
                          setRecordToDelete(res);
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
        title="Eliminar reserva"
        description={`¿Eliminar la reserva de "${recordToDelete?.name ?? ""}"?`}
        loading={isDeleting}
      />
    </div>
  );
}
