import { notFound } from "next/navigation";
import { Calendar, MapPin, Users, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getEventById } from "@/src/features/event/actions/event-actions";
import { ReservationForm } from "@/src/features/reservation/components/reservation-form";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: "Evento no encontrado" };
  return {
    title: event.title,
    description: event.description ?? `Reserva tu lugar en ${event.title}`,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event || !event.isActive) notFound();

  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  const isFull = event.availableSpots !== null && event.availableSpots <= 0;

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Hero del evento */}
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/actividades"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#be8a34] transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Volver a Actividades
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-[#be8a34] text-[#030a50] font-black text-xs uppercase tracking-widest rounded-full px-3 py-1">
              {event.type}
            </Badge>
            {isPast && (
              <Badge variant="secondary" className="text-xs font-bold rounded-full">
                Finalizado
              </Badge>
            )}
            {!isPast && isFull && (
              <Badge variant="destructive" className="text-xs font-bold rounded-full">
                Sin cupos
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold md:text-5xl mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#be8a34]" />
              {eventDate.toLocaleDateString("es-PE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#be8a34]" />
                {event.location}
              </div>
            )}
            {event.capacity !== null && (
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#be8a34]" />
                {isFull
                  ? "Sin cupos disponibles"
                  : `${event.availableSpots} de ${event.capacity} cupos`}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Descripción */}
            <div className="lg:col-span-2 space-y-6">
              {event.description && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-[#030a50] mb-4">Sobre este evento</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              )}

              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#be8a34] hover:underline font-semibold"
                >
                  <ExternalLink size={16} />
                  Más información
                </a>
              )}
            </div>

            {/* Formulario de reserva */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#030a50]">
                    {isPast ? "Este evento ha finalizado" : "Reservar lugar"}
                  </h2>
                  {!isPast && !isFull && (
                    <p className="text-sm text-gray-500 mt-1">
                      Completa el formulario para reservar tu lugar.
                    </p>
                  )}
                </div>

                {isPast ? (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">Mantente atento a próximas actividades.</p>
                    <Link
                      href="/actividades"
                      className="mt-4 inline-block text-[#be8a34] font-semibold hover:underline text-sm"
                    >
                      Ver otras actividades →
                    </Link>
                  </div>
                ) : (
                  <ReservationForm event={event} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
