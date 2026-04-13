"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { MemberModel } from "@/app/generated/prisma/models/Member";
import { deleteMember } from "../actions/member-actions";
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

interface MemberTableProps {
  members: MemberModel[];
}

type SortColumn = "name" | "roleTitle" | "type" | "order" | "isActive";

const PAGE_SIZE = 8;

const ROLE_LABELS: Record<MemberModel["type"], string> = {
  COACH: "Coach",
  DIRECTIVA: "Directiva",
};

export function MemberTable({ members }: MemberTableProps) {
  const router = useRouter();
  const [recordToDelete, setRecordToDelete] = useState<MemberModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    currentSortBy,
    currentSortOrder,
    sortLink,
    safePage,
    totalPages,
    startIndex,
  } = useTableFilters<SortColumn>(members.length, PAGE_SIZE, {
    sortKeys: ["name", "roleTitle", "type", "order", "isActive"],
  });

  const pagedMembers = members.slice(startIndex, startIndex + PAGE_SIZE);

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
    const deletePromise = deleteMember({ id: recordToDelete.id });

    toast.promise(deletePromise, {
      loading: "Eliminando miembro...",
      success: "Miembro eliminado",
      error: "No se pudo eliminar el miembro",
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
      <div className="overflow-hidden rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {(["name", "roleTitle", "type", "order", "isActive"] as const).map((col) => (
                <TableHead key={col}>
                  <Link
                    href={sortLink(col)}
                    className={cn(
                      "group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary",
                      currentSortBy === col ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {col === "name" && "Nombre"}
                    {col === "roleTitle" && "Cargo"}
                    {col === "type" && "Tipo"}
                    {col === "order" && "Orden"}
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
            {pagedMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-semibold text-foreground">
                  {member.name}
                </TableCell>
                <TableCell className="text-muted-foreground">{member.roleTitle}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-md font-semibold">
                    {ROLE_LABELS[member.type]}
                  </Badge>
                </TableCell>
                <TableCell className="tabular-nums font-medium">{member.order}</TableCell>
                <TableCell>
                  <Badge
                    variant={member.isActive ? "default" : "secondary"}
                    className="rounded-md font-bold px-2.5 py-0.5"
                  >
                    {member.isActive ? "Visible" : "Oculto"}
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
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/members/${member.id}/edit`}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onClick={() => {
                          setRecordToDelete(member);
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
        title="Eliminar miembro"
        description={`Esta acción eliminará al miembro \"${recordToDelete?.name ?? ""}\". ¿Estás seguro?`}
        loading={isDeleting}
      />
    </div>
  );
}

