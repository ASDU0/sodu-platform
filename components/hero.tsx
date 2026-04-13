"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {useRouter} from "next/navigation";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Bienvenido a SODU",
      subtitle: "Sociedad de Oratoria y Debate Universitaria",
      description: "Espacio para desarrollar habilidades de comunicación, pensamiento crítico y liderazgo",
      image: "/elegant-academic-conference-podium.jpg",
    },
    {
      title: "Nuestras Actividades",
      subtitle: "Debates, conferencias y eventos académicos",
      description: "Participa en debates estructurados, cinefórums y seminarios de reflexión",
      image: "/group-discussion-classroom-academic.jpg",
    },
    {
      title: "Desarrolla tus Habilidades",
      subtitle: "Talleres, coachs y mentoría personalizada",
      description: "Aprende de expertos y mejora tu oratoria, análisis crítico y argumentación",
      image: "/professional-workshop-training-presentation.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleRouter = () => {
    router.push("/sociedad")
  }

  return (
    <main className="w-full">
      {/* Hero Carousel */}
      <div className="relative w-full h-96 md:h-screen overflow-hidden carousel-container bg-[#030a50]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 carousel-slide ${
              index === currentSlide ? "active" : "inactive"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Carousel Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-3xl mx-auto fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-[#be8a34] mb-6 font-semibold text-balance">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-balance">{slides[currentSlide].description}</p>
            <button
              onClick={handleRouter}
              className="bg-[#be8a34] hover:bg-[#a0773a] text-[#030a50] font-bold py-3 px-8 rounded transition-colors"
            >
              Conoce Más
            </button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition"
        >
          →
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-[#be8a34] w-8" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "📚", title: "Club de Lectura", desc: "Análisis crítico de obras" },
              { icon: "🎬", title: "Cinefórum", desc: "Debates sobre películas" },
              { icon: "🎓", title: "Talleres", desc: "Desarrollo de habilidades" },
              { icon: "🎤", title: "Seminarios", desc: "Conferencias especializadas" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#030a50] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030a50] mb-12 text-center">Últimas Noticias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gran Debate Anual 2024",
                desc: "Se llevó a cabo nuestro debate anual con participantes de distintas universidades.",
                date: "Diciembre 2024",
              },
              {
                title: "Nuevo Taller de Oratoria",
                desc: "Iniciamos nuestro taller intensivo de técnicas de oratoria y presentación.",
                date: "Noviembre 2024",
              },
              {
                title: "Cinefórum: Cine y Sociedad",
                desc: "Reflexionamos sobre películas contemporáneas y su impacto social.",
                date: "Octubre 2024",
              },
            ].map((news, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="h-40 bg-gradient-to-br from-[#030a50] to-[#be8a34]" />
                <div className="p-6">
                  <p className="text-[#be8a34] text-sm font-semibold mb-2">{news.date}</p>
                  <h3 className="text-lg font-bold text-[#030a50] mb-3">{news.title}</h3>
                  <p className="text-gray-600 text-sm">{news.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
