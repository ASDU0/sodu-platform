import { getMembers } from "../actions/member-actions";
import { EmptyState } from "@/components/empty-state";
import { MemberList } from "../components/member-list";

export async function MemberPublicScreen() {
  const members = await getMembers();
  const activeMembers = members.filter((member) => member.isActive);
  const coaches = activeMembers.filter((member) => member.type === "COACH");
  const directiva = activeMembers.filter((member) => member.type === "DIRECTIVA");

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">La Sociedad</h1>
          <p className="mt-4 text-lg text-[#be8a34]">
            Conoce a la directiva y a los coaches que guian nuestras actividades.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#030a50]">Directiva</h2>
            <p className="text-sm text-muted-foreground">
              Equipo encargado de la gestion y representacion institucional.
            </p>
          </div>

          {directiva.length === 0 ? (
            <EmptyState
              title="No hay miembros en directiva"
              description="Vuelve pronto para conocer a nuestro equipo directivo."
            />
          ) : (
            <MemberList members={directiva} />
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#030a50]">Coaches</h2>
            <p className="text-sm text-muted-foreground">
              Mentores que acompanian el crecimiento academico de la comunidad.
            </p>
          </div>

          {coaches.length === 0 ? (
            <EmptyState
              title="No hay coaches activos"
              description="Vuelve pronto para conocer a nuestros coaches."
            />
          ) : (
            <MemberList members={coaches} />
          )}
        </div>
      </section>
    </main>
  );
}

