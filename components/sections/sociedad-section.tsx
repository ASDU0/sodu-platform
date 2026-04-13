"use client"

import Image from "next/image"

export default function SociedadSection() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">La Sociedad</h1>
          <p className="text-lg text-[#be8a34] font-semibold">Conoce nuestra historia, misión y valores</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-6">¿Quiénes Somos?</h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                SODU es una sociedad académica voluntaria dedicada al desarrollo de habilidades de oratoria, debate y
                pensamiento crítico. Nos comprometemos a crear un espacio de excelencia para la formación integral de
                nuestros miembros.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Desde nuestra fundación, hemos promovido la calidad en la argumentación, la ética en el debate y el
                respeto por la diversidad de opiniones.
              </p>
            </div>
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
              <Image src="/academic-society-members-discussion-debate.jpg" alt="Sociedad SODU" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">Nuestros Pilares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Misión",
                content:
                  "Formar comunicadores críticos y étticos que contribuyan al desarrollo intelectual de la comunidad universitaria.",
              },
              {
                icon: "✨",
                title: "Visión",
                content:
                  "Ser un referente de excelencia en oratoria y debate, reconocido por su rigor académico y compromiso con la formación integral.",
              },
              {
                icon: "💎",
                title: "Valores",
                content:
                  "Excelencia, integridad, inclusión, respeto y pensamiento crítico son los fundamentos de nuestra comunidad.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition border-t-4 border-[#be8a34]"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#030a50] mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">Galería de Momentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="relative h-64 md:h-72 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group"
              >
                <Image
                  src={`/academic-event-photo-number-.jpg`}
                  alt={`Evento ${item}`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-24 bg-[#030a50] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Miembros" },
              { number: "50+", label: "Eventos Anuales" },
              { number: "100%", label: "Compromiso" },
              { number: "20+", label: "Años de Historia" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-[#be8a34] mb-2">{stat.number}</div>
                <p className="text-lg text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
