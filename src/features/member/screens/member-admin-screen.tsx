import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMembers } from "../actions/member-actions";
import { EmptyState } from "@/components/empty-state";
import { MemberTable } from "../components/member-table";
import { TableSearch } from "@/components/table-search";
import type { MemberSortKey } from "../actions/member-actions";

const SORT_KEYS: MemberSortKey[] = ["name", "roleTitle", "type", "order", "isActive", "createdAt"];

interface MemberAdminScreenProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function MemberAdminScreen({ searchParams }: MemberAdminScreenProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
  const sortBy = typeof searchParams?.sortBy === "string" ? searchParams.sortBy : undefined;
  const sortOrder = typeof searchParams?.sortOrder === "string" ? searchParams.sortOrder : undefined;

  const safeSortBy = SORT_KEYS.includes(sortBy as MemberSortKey)
    ? (sortBy as MemberSortKey)
    : undefined;
  const safeSortOrder = sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;

  const members = await getMembers({
    query: query || undefined,
    sortBy: safeSortBy,
    sortOrder: safeSortOrder,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion de Miembros
          </h1>
          <p className="text-sm text-muted-foreground">
            Administra los perfiles de la directiva y los coaches.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/members/new">Nuevo miembro</Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <TableSearch placeholder="Buscar por nombre..." />
      </div>

      {members.length === 0 ? (
        <EmptyState
          title="Aun no hay miembros registrados"
          description="Crea el primer perfil para mostrarlo en la pagina publica."
          ctaLabel="Crear miembro"
          ctaHref="/dashboard/members/new"
        />
      ) : (
        <MemberTable members={members} />
      )}
    </div>
  );
}

