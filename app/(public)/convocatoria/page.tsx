import Image from "next/image";
import { CONVOCATORIA_DATA } from "@/data/convocatoria";
import { Rocket, Trophy, ClipboardList } from "lucide-react";
import { TimelineSection } from "@/src/features/calls/components/timeline-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nueva Convocatoria 2026",
  description: "¡Únete a SODU! Participa en nuestra convocatoria 2026 y forma parte de la sociedad académica líder en debate y oratoria de la UNSAAC.",
};

export default function ConvocatoriaScreen() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section con Imagen de Fondo */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#030a50]">
        {/* Imagen de fondo optimizada */}
        <Image
          src="/carrusel/carusel5.JPG" // O la imagen grupal que prefieras
          alt="Convocatoria SoDU"
          fill
          className="object-cover opacity-30"
          priority
        />

        {/* Gradiente para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030a50]/80 via-[#030a50]/60 to-[#030a50]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white uppercase">
            {CONVOCATORIA_DATA.header.title}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-[#be8a34] font-bold max-w-3xl mx-auto italic">
            {CONVOCATORIA_DATA.header.description}
          </p>
          <div className="mt-10">
            <a
              href="https://forms.gle/3stPXLtUrkcdxxMFA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#be8a34] text-[#030a50] px-10 py-4 rounded-full font-black text-lg transition-all hover:scale-105 hover:bg-[#d4a34d] shadow-[0_0_20px_rgba(190,138,52,0.3)]"
            >
              POSTULAR AHORA <Rocket size={24} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Requisitos y Beneficios Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Columna Requisitos */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <ClipboardList className="text-[#be8a34]" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-[#030a50]">Requisitos</h2>
            </div>
            <div className="grid gap-4">
              {CONVOCATORIA_DATA.requisitos.map((req, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border-l-4 border-[#be8a34] shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-slate-700 font-semibold">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Beneficios */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-[#030a50] rounded-2xl shadow-sm">
                <Trophy className="text-[#be8a34]" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-[#030a50]">Beneficios</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONVOCATORIA_DATA.beneficios.map((ben, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#be8a34]/30 transition-colors">
                  <div className="w-8 h-1 bg-[#be8a34] mb-4 rounded-full" />
                  <p className="font-bold text-[#030a50] text-sm leading-relaxed">{ben}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Timeline de la Convocatoria */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#030a50] uppercase tracking-tight">Proceso de Admisión</h2>
            <div className="h-1.5 w-24 bg-[#be8a34] mx-auto mt-6 rounded-full" />
          </div>
          <TimelineSection steps={CONVOCATORIA_DATA.cronograma} />
        </div>
      </section>
    </div>
  );
}
