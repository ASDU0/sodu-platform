import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getEvents } from "../actions/event-actions";
import { EmptyState } from "@/components/empty-state";
import { EventTable } from "../components/event-table";
import { TableSearch } from "@/components/table-search";

interface EventAdminScreenProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function EventAdminScreen({ searchParams }: EventAdminScreenProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
  const events = await getEvents();

  const filtered = query
    ? events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()))
    : events;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestión de Eventos
          </h1>
          <p className="text-sm text-muted-foreground">
            Administra los eventos y actividades de la sociedad.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/new">Nuevo evento</Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <TableSearch placeholder="Buscar por título..." />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No hay eventos registrados"
          description="Crea el primer evento para que el público pueda reservar."
          ctaLabel="Crear evento"
          ctaHref="/dashboard/events/new"
        />
      ) : (
        <EventTable events={filtered} />
      )}
    </div>
  );
}
