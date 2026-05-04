import { EmptyState } from "@/components/empty-state";
import { getMembers } from "@/src/features/member/actions/member-actions";
import { MemberList } from "@/src/features/member/components/member-list";
import { GraduationCap, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestro Equipo | Directiva y Coaches",
  description: "Conoce a la mesa directiva y al cuerpo de coaches de SODU. Estudiantes y mentores dedicados a la excelencia en el debate universitario.",
};

export const dynamic = 'force-dynamic';

export default async function DirectivaScreen() {
  const members = await getMembers();
  const activeMembers = members.filter((member) => member.isActive);

  // Filtrado de grupos
  const coaches = activeMembers.filter((member) => member.type === "COACH");
  const directiva = activeMembers.filter((member) => member.type === "DIRECTIVA");

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#030a50] py-20 md:py-32 overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#be8a34]/5 skew-x-12 translate-x-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold text-white md:text-6xl tracking-tight">
              Nuestro Equipo
            </h1>
            <div className="h-1.5 w-24 bg-[#be8a34] mt-6 mb-8 rounded-full" />
            <p className="text-xl text-gray-300 leading-relaxed">
              Estudiantes y mentores comprometidos con la excelencia académica,
              la formación de líderes y el fortalecimiento del debate en la UNSAAC.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DIRECTIVA --- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 flex items-end justify-between border-b border-gray-100 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#be8a34] font-bold uppercase tracking-widest text-sm">
                <ShieldCheck size={18} />
                Liderazgo Institucional
              </div>
              <h2 className="text-3xl font-bold text-[#030a50] md:text-4xl">
                Mesa Directiva
              </h2>
              <p className="text-gray-500 max-w-xl">
                Equipo encargado de la gestión estratégica, representación legal y
                coordinación de las actividades de la Sociedad.
              </p>
            </div>
          </header>

          {directiva.length === 0 ? (
            <div className="py-12 bg-slate-50 rounded-3xl">
              <EmptyState
                title="No hay miembros en directiva"
                description="Vuelve pronto para conocer a nuestro equipo directivo."
              />
            </div>
          ) : (
            <MemberList members={directiva} />
          )}
        </div>
      </section>

      {/* --- SECCIÓN COACHES --- */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 flex items-end justify-between border-b border-gray-200 pb-8 text-right md:text-left">
            <div className="space-y-2 md:ml-0 ml-auto">
              <div className="flex items-center gap-2 text-[#be8a34] font-bold uppercase tracking-widest text-sm md:justify-start justify-end">
                <GraduationCap size={18} />
                Mentoría Académica
              </div>
              <h2 className="text-3xl font-bold text-[#030a50] md:text-4xl">
                Cuerpo de Coaches
              </h2>
              <p className="text-gray-500 max-w-xl">
                Expertos y destacados debatientes que acompañan el crecimiento
                y formación técnica de nuestra comunidad universitaria.
              </p>
            </div>
          </header>

          {coaches.length === 0 ? (
            <div className="py-12 bg-white rounded-3xl border border-dashed">
              <EmptyState
                title="No hay coaches activos"
                description="Vuelve pronto para conocer a nuestros coaches."
              />
            </div>
          ) : (
            <MemberList members={coaches} />
          )}
        </div>
      </section>
    </div>
  );
}
