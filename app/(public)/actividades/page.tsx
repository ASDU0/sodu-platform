import { getActiveEvents } from "@/src/features/event/actions/event-actions";
import { EventCard } from "@/src/features/event/components/event-card";
import { EmptyState } from "@/components/empty-state";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Actividades",
  description:
    "Descubre y reserva tu lugar en los talleres, cinefórums, debates y seminarios de la Sociedad de Debate UNSAAC.",
};

export default async function ActividadesPage() {
  const events = await getActiveEvents();
  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  const past = events.filter((e) => new Date(e.date) < new Date());

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Actividades</h1>
          <p className="mt-4 text-lg text-[#be8a34]">
            Talleres, debates, cinefórums y más. Reserva tu lugar.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Próximos eventos */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#030a50]">Próximas actividades</h2>
              <div className="h-1 w-16 bg-[#be8a34] mt-3 rounded-full" />
            </div>

            {upcoming.length === 0 ? (
              <EmptyState
                title="No hay actividades próximas"
                description="Pronto publicaremos nuevos eventos. Vuelve a consultar."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          {/* Actividades pasadas */}
          {past.length > 0 && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#030a50]">Actividades anteriores</h2>
                <div className="h-1 w-16 bg-[#be8a34] mt-3 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
