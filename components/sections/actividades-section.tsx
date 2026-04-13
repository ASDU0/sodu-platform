"use client"

import Image from "next/image"

export default function ActividadesSection() {
  const actividades = [
    {
      title: "Club de Lectura",
      emoji: "📚",
      description: "Espacios de análisis crítico y reflexión sobre obras literarias clásicas y contemporáneas.",
      content:
        "Nos reunimos mensualmente para discutir libros seleccionados, explorar diferentes perspectivas y desarrollar nuestro pensamiento analítico.",
      image: "/book-club-reading-discussion.jpg",
    },
    {
      title: "Cinefórum",
      emoji: "🎬",
      description: "Proyecciones de películas seguidas de debates sobre temas sociales, políticos y culturales.",
      content:
        "Combinamos entretenimiento con reflexión académica, analizando cine como herramienta para entender la sociedad.",
      image: "/film-screening-cinema-audience.jpg",
    },
    {
      title: "Talleres",
      emoji: "🎓",
      description: "Capacitaciones prácticas en oratoria, argumentación, presentación y comunicación efectiva.",
      content:
        "Desarrollamos habilidades concretas a través de ejercicios prácticos, retroalimentación personalizada y coaching directo.",
      image: "/workshop-training-presentation-skills.jpg",
    },
    {
      title: "Seminarios",
      emoji: "🎤",
      description: "Conferencias de expertos sobre debate, filosofía, comunicación y liderazgo.",
      content:
        "Traemos a profesionales y académicos destacados para compartir sus conocimientos y experiencias con nuestra comunidad.",
      image: "/seminar-conference-speaker-presentation.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Nuestras Actividades</h1>
          <p className="text-lg text-[#be8a34] font-semibold">Espacios para aprender, debatir y crecer</p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {actividades.map((actividad, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{actividad.emoji}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#030a50]">{actividad.title}</h2>
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{actividad.description}</p>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">{actividad.content}</p>
                  <button className="bg-[#be8a34] hover:bg-[#a0773a] text-[#030a50] font-bold py-3 px-8 rounded transition-colors">
                    Más Información
                  </button>
                </div>
                <div
                  className={`relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg ${
                    index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""
                  }`}
                >
                  <Image
                    src={actividad.image || "/placeholder.svg"}
                    alt={actividad.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                date: "15 Dic",
                title: "Debate: Tecnología y Sociedad",
                time: "6:00 PM",
              },
              {
                date: "22 Dic",
                title: "Cinefórum: Documentales Sociales",
                time: "7:00 PM",
              },
              {
                date: "10 Ene",
                title: "Taller: Técnicas de Oratoria",
                time: "5:00 PM",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#be8a34] hover:shadow-md transition"
              >
                <div className="text-[#be8a34] font-bold text-lg mb-2">{event.date}</div>
                <h3 className="text-lg font-bold text-[#030a50] mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">
            Síguenos en Redes Sociales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { platform: "Facebook", handle: "@SODU.oficial", posts: "234" },
              { platform: "Instagram", handle: "@sodu_official", posts: "456" },
            ].map((social, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#030a50] to-[#0d1b5c] text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold mb-2">{social.platform}</h3>
                <p className="text-[#be8a34] mb-4">{social.handle}</p>
                <p className="text-gray-200 text-sm">{social.posts} publicaciones</p>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="h-24 bg-white/10 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
