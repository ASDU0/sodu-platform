import Link from "next/link";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EventWithStats } from "../actions/event-actions";

interface EventCardProps {
  event: EventWithStats;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  const isFull = event.availableSpots !== null && event.availableSpots <= 0;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#be8a34]" />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge
            variant="secondary"
            className="text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 bg-slate-100 text-[#030a50]"
          >
            {event.type}
          </Badge>
          {isPast ? (
            <Badge variant="secondary" className="text-[10px] font-bold rounded-full">
              Finalizado
            </Badge>
          ) : isFull ? (
            <Badge variant="destructive" className="text-[10px] font-bold rounded-full">
              Sin cupos
            </Badge>
          ) : null}
        </div>

        <h3 className="text-xl font-bold text-[#030a50] mb-3 group-hover:text-[#be8a34] transition-colors leading-tight">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {event.description}
          </p>
        )}

        <div className="mt-auto space-y-2 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} className="text-[#be8a34] shrink-0" />
            <span>
              {eventDate.toLocaleDateString("es-PE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} className="text-[#be8a34] shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {event.capacity !== null && (
            <div className="flex items-center gap-2 text-sm">
              <Users size={14} className="text-[#be8a34] shrink-0" />
              <span className={isFull ? "text-red-500 font-semibold" : "text-gray-500"}>
                {isFull
                  ? "Sin cupos disponibles"
                  : `${event.availableSpots} de ${event.capacity} cupos disponibles`}
              </span>
            </div>
          )}

          {event.capacity === null && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={14} className="text-[#be8a34] shrink-0" />
              <span>Cupos ilimitados</span>
            </div>
          )}
        </div>
      </div>

      {!isPast && (
        <div className="px-6 pb-6">
          <Button
            asChild
            className={`w-full font-bold transition-all ${
              isFull
                ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-[#030a50] hover:bg-[#be8a34] hover:text-[#030a50] text-white"
            }`}
            disabled={isFull}
          >
            <Link href={`/actividades/${event.id}`}>
              {isFull ? "Evento lleno" : "Reservar lugar"}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
