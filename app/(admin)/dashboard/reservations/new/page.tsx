import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getEvents } from "@/src/features/event/actions/event-actions";
import { ReservationCreateAdminForm } from "@/src/features/reservation/components/reservation-create-admin-form";
import { isAdminCurrentUser } from "@/lib/is-admin-user";

export default async function NewReservationPage() {
  const currentUser = await isAdminCurrentUser();
  if (!currentUser) notFound();

  const events = await getEvents();
  const activeEvents = events.filter((e) => e.isActive);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          href="/dashboard/reservations"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a Reservas
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Nueva Reserva</h1>
        <p className="text-sm text-muted-foreground">
          Registra manualmente una reserva para un evento.
        </p>
      </div>
      <ReservationCreateAdminForm events={activeEvents} redirectTo="/dashboard/reservations" />
    </div>
  );
}
