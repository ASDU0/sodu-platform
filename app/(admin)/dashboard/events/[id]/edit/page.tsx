import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getEventById } from "@/src/features/event/actions/event-actions";
import { EventEditForm } from "@/src/features/event/components/event-edit-form";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Editar Evento</h1>
        <p className="text-sm text-muted-foreground truncate">{event.title}</p>
      </div>
      <EventEditForm event={event} redirectTo="/dashboard/events" />
    </div>
  );
}
