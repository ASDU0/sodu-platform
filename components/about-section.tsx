import Image from "next/image"
import { SOCIETY_DATA } from "@/data"

export function AboutSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
      {/* Columna de Texto */}
      <div className="flex-1">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50]">
            {SOCIETY_DATA.about.title}
          </h2>
          <div className="w-20 h-1 bg-[#be8a34] mt-4 rounded-full" />
        </div>

        <div className="space-y-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            {SOCIETY_DATA.about.description1}
          </p>

          {/* Bloque Informativo Destacado */}
          <div className="relative bg-slate-50 p-6 rounded-xl border-l-4 border-[#be8a34] overflow-hidden">
            {/* Sutil marca de agua de fondo (opcional) */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-[#030a50] pointer-events-none">
              <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>

            <p className="text-sm md:text-base text-[#030a50] font-medium leading-relaxed relative z-10">
              {SOCIETY_DATA.about.description2}
            </p>
          </div>
        </div>
      </div>

      {/* Columna de Imagen */}
      <div className="flex-1 w-full">
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(3,10,80,0.15)] group">
          {/* Overlay sutil para mejorar el contraste de la imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a50]/20 to-transparent z-10 opacity-60" />

          <Image
            src="/academic-society-members-discussion-debate.jpg"
            fill
            alt="Debate UNSAAC"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
      </div>
    </div>
  )
}
