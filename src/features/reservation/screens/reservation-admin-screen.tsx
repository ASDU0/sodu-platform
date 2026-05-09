import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getReservations } from "../actions/reservation-actions";
import { EmptyState } from "@/components/empty-state";
import { ReservationTable } from "../components/reservation-table";
import { TableSearch } from "@/components/table-search";
import { Badge } from "@/components/ui/badge";
import type { ReservationStatus } from "@/app/generated/prisma/client";

interface ReservationAdminScreenProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

const STATUS_FILTERS: { label: string; value: ReservationStatus | "ALL" }[] = [
  { label: "Todas", value: "ALL" },
  { label: "Pendientes", value: "PENDING" },
  { label: "Confirmadas", value: "CONFIRMED" },
  { label: "Canceladas", value: "CANCELLED" },
];

export async function ReservationAdminScreen({ searchParams }: ReservationAdminScreenProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : undefined;
  const statusParam = typeof searchParams?.status === "string" ? searchParams.status : "ALL";
  const activeStatus = STATUS_FILTERS.find((f) => f.value === statusParam)?.value ?? "ALL";

  const reservations = await getReservations({
    query: query || undefined,
    status: activeStatus === "ALL" ? undefined : (activeStatus as ReservationStatus),
  });

  const counts = {
    ALL: reservations.length,
    PENDING: reservations.filter((r) => r.status === "PENDING").length,
    CONFIRMED: reservations.filter((r) => r.status === "CONFIRMED").length,
    CANCELLED: reservations.filter((r) => r.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestión de Reservas
          </h1>
          <p className="text-sm text-muted-foreground">
            Administra las reservas de eventos y actividades.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/reservations/new">Nueva reserva</Link>
        </Button>
      </div>

      {/* Filtros de estado */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => {
          const isActive = activeStatus === filter.value;
          const params = new URLSearchParams();
          if (query) params.set("q", query);
          if (filter.value !== "ALL") params.set("status", filter.value);
          const href = `/dashboard/reservations${params.toString() ? `?${params}` : ""}`;

          return (
            <Link key={filter.value} href={href}>
              <Badge
                variant={isActive ? "default" : "secondary"}
                className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
              >
                {filter.label}{" "}
                <span className="ml-1 opacity-70">
                  ({counts[filter.value as keyof typeof counts]})
                </span>
              </Badge>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <TableSearch placeholder="Buscar por nombre o correo..." />
      </div>

      {reservations.length === 0 ? (
        <EmptyState
          title="No hay reservas"
          description="Aún no hay reservas registradas con estos filtros."
          ctaLabel="Nueva reserva"
          ctaHref="/dashboard/reservations/new"
        />
      ) : (
        <ReservationTable reservations={reservations} />
      )}
    </div>
  );
}
