import { SOCIETY_DATA } from "@/data"

export function PillarsGrid() {
  return (
    <div className="space-y-12 my-20">
      {/* Encabezado con el estilo de la imagen */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#030a50]">
          Principios y Pilares
        </h2>
        <div className="h-1 w-20 bg-[#be8a34] mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {SOCIETY_DATA.pillars.map((pilar, index) => (
          <div
            key={index}
            className="relative group p-6 rounded-xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden"
          >
            {/* Línea superior dorada (Mismo estilo que Misión/Visión) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#be8a34]" />

            <h4 className="font-bold text-[#030a50] mb-3 text-lg tracking-tight">
              {pilar.title}
            </h4>

            <p className="text-sm text-gray-600 leading-relaxed">
              {pilar.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
