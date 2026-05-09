import { EventCreateForm } from "@/src/features/event/components/event-create-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a Eventos
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Nuevo Evento</h1>
        <p className="text-sm text-muted-foreground">
          Crea un nuevo evento o actividad para la sociedad.
        </p>
      </div>
      <EventCreateForm redirectTo="/dashboard/events" />
    </div>
  );
}
