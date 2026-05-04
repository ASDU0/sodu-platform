'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { WorkshopModel as Workshop } from "@/app/generated/prisma/models/Workshop";
import { deleteWorkshop } from '../actions/workshop-actions';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pagination } from '@/components/pagination';
import { cn } from '@/lib/utils';
import { useTableFilters } from '@/src/hooks/use-table-filters';

interface WorkshopTableProps {
  workshops: Workshop[];
}

type SortColumn = 'title' | 'startsAt' | 'location' | 'capacity' | 'isActive';

const PAGE_SIZE = 8;

export function WorkshopTable({ workshops }: WorkshopTableProps) {
  const router = useRouter();
  const [workshopToDelete, setWorkshopToDelete] = useState<Workshop | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    currentSortBy,
    currentSortOrder,
    sortLink,
    safePage,
    totalPages,
    startIndex,
  } = useTableFilters<SortColumn>(workshops.length, PAGE_SIZE, {
    sortKeys: ['title', 'startsAt', 'location', 'capacity', 'isActive'],
  });

  const pagedWorkshops = workshops.slice(startIndex, startIndex + PAGE_SIZE);

  const renderSortIcon = (column: SortColumn) => {
    if (currentSortBy !== column) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />;
    }

    return currentSortOrder === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-primary" />
    );
  };

  const handleDelete = async () => {
    if (!workshopToDelete) return;

    setIsDeleting(true);

    const deletePromise = deleteWorkshop(workshopToDelete.id);
    toast.promise(deletePromise, {
      loading: 'Eliminando taller...',
      success: 'Taller eliminado',
      error: 'No se pudo eliminar el taller',
    });

    const result = await deletePromise;
    setIsDeleting(false);
    setDeleteModalOpen(false);

    if (result.success) {
      setWorkshopToDelete(null);
      router.refresh();
    }
  };

  const openDeleteModal = (workshop: Workshop) => {
    setWorkshopToDelete(workshop);
    setDeleteModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {(['title', 'startsAt', 'location', 'capacity', 'isActive'] as const).map((column) => (
                <TableHead key={column}>
                  <Link
                    href={sortLink(column)}
                    className={cn(
                      'group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary',
                      currentSortBy === column ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {column === 'title' && 'Título'}
                    {column === 'startsAt' && 'Fecha'}
                    {column === 'location' && 'Ubicación'}
                    {column === 'capacity' && 'Capacidad'}
                    {column === 'isActive' && 'Estado'}
                    {renderSortIcon(column)}
                  </Link>
                </TableHead>
              ))}
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedWorkshops.map((workshop) => (
              <TableRow key={workshop.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold text-foreground">{workshop.title}</TableCell>
                <TableCell>
                  {new Date(workshop.startsAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell className="text-muted-foreground">{workshop.location}</TableCell>
                <TableCell className="tabular-nums font-medium">{workshop.capacity}</TableCell>
                <TableCell>
                  <Badge
                    variant={workshop.isActive ? 'default' : 'secondary'}
                    className="rounded-md font-bold px-2.5 py-0.5"
                  >
                    {workshop.isActive ? 'Activo' : 'Inactivo'}
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
                        <Link href={`/dashboard/workshops/${workshop.id}/edit`} className="cursor-pointer flex items-center">
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onClick={() => openDeleteModal(workshop)}
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
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        title="Eliminar taller"
        description={`Esta acción eliminará el taller "${workshopToDelete?.title ?? ''}". ¿Estás seguro?`}
        loading={isDeleting}
      />
    </div>
  );
}