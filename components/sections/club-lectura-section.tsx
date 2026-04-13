"use client"
import Image from "next/image"

export default function ClubLecturaSection() {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const activitiesByDay: { [key: number]: string[] } = {
    5: ["Reunión General - 6:00 PM"],
    12: ["Debate Literario: Ficción", "Lectura Grupal - 5:00 PM"],
    19: ["Taller de Análisis Crítico - 6:30 PM"],
    26: ["Café Literario - 7:00 PM"],
  }

  const publications = [
    {
      platform: "Facebook",
      icon: "f",
      title: "Nuevo libro seleccionado",
      description: '"Cien años de soledad" - García Márquez',
      date: "Hace 2 días",
      image: "/book-club-reading-discussion.jpg",
    },
    {
      platform: "Instagram",
      icon: "📷",
      title: "Momento de la última reunión",
      description: "Compartiendo perspectivas sobre la novela contemporánea",
      date: "Hace 3 días",
      image: "/workshop-training-presentation-skills.jpg",
    },
    {
      platform: "TikTok",
      icon: "▶️",
      title: "Recomendación rápida de libros",
      description: "5 libros imprescindibles para este año",
      date: "Hace 1 día",
      image: "/film-screening-cinema-audience.jpg",
    },
    {
      platform: "Instagram",
      icon: "📷",
      title: "Galería de fotos",
      description: "Highlights de nuestras actividades mensuales",
      date: "Hace 5 días",
      image: "/seminar-conference-speaker-presentation.jpg",
    },
  ]

  const days: (number | null)[] = Array.from(
    {length: firstDayOfMonth},
    () => null
  );
  days.push(...Array.from({length: daysInMonth}, (_, i) => i + 1));
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Club de Lectura</h1>
          <p className="text-lg text-[#be8a34] font-semibold">
            Espacios de análisis crítico y reflexión sobre obras literarias
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            Nos reunimos regularmente para discutir libros seleccionados, explorar diferentes perspectivas y
            desarrollar
            nuestro pensamiento analítico. Desde clásicos hasta novelas contemporáneas, cada sesión es un
            viaje hacia la
            comprensión más profunda de la literatura y la sociedad.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">Calendario de
            Actividades</h2>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Calendar Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#030a50] mb-2 text-center">
                {new Date(currentYear, currentMonth).toLocaleString("es-ES", {
                  month: "long",
                  year: "numeric"
                })}
              </h3>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"].map((day) => (
                <div key={day} className="text-center font-bold text-[#030a50] text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-3 border rounded-lg ${
                    day === null
                      ? "bg-gray-100"
                      : activitiesByDay[day]
                        ? "bg-blue-50 border-[#be8a34] border-2"
                        : "bg-white border-gray-200"
                  }`}
                >
                  {day && (
                    <div>
                      <div className="font-bold text-[#030a50] text-sm mb-2">{day}</div>
                      {activitiesByDay[day] && (
                        <div className="space-y-1">
                          {activitiesByDay[day].map((activity, i) => (
                            <p key={i}
                               className="text-xs text-gray-700 leading-tight bg-[#be8a34]/10 p-1 rounded">
                              {activity}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">
            Publicaciones en Redes Sociales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={pub.image || "/placeholder.svg"}
                    alt={pub.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                  {/* Platform Badge */}
                  <div
                    className="absolute top-3 right-3 bg-[#030a50] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {pub.platform}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-[#030a50] text-lg mb-2">{pub.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pub.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{pub.date}</span>
                    <a href="#"
                       className="text-[#be8a34] font-semibold text-sm hover:text-[#a0773a] transition">
                      Ver más →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div
            className="mt-16 bg-gradient-to-r from-[#030a50] to-[#0d1b5c] text-white rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Síguenos para más contenido</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#"
                 className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition">
                Facebook
              </a>
              <a href="#"
                 className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition">
                Instagram
              </a>
              <a href="#"
                 className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
