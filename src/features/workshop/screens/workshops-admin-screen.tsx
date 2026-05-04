import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getWorkshops } from "../actions/workshop-actions";
import { EmptyState } from "@/components/empty-state";
import { WorkshopTable } from "../components/workshop-table";
import { TableSearch } from "@/components/table-search";

interface WorkshopsAdminScreenProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function WorkshopsAdminScreen({ searchParams }: WorkshopsAdminScreenProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";

  const workshops = await getWorkshops();

  // Filter by query if provided
  const filteredWorkshops = query
    ? workshops.filter(workshop =>
        workshop.title.toLowerCase().includes(query.toLowerCase()) ||
        workshop.description.toLowerCase().includes(query.toLowerCase()) ||
        workshop.location.toLowerCase().includes(query.toLowerCase())
      )
    : workshops;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestión de Talleres
          </h1>
          <p className="text-sm text-muted-foreground">
            Administra los talleres de capacitación y debate.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/workshops/new">Nuevo taller</Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <TableSearch placeholder="Buscar por título..." />
      </div>

      {filteredWorkshops.length === 0 ? (
        <EmptyState
          title="Aún no hay talleres registrados"
          description="Crea el primer taller para mostrarlo en la página pública."
          ctaLabel="Crear taller"
          ctaHref="/dashboard/workshops/new"
        />
      ) : (
        <WorkshopTable workshops={filteredWorkshops} />
      )}
    </div>
  );
}