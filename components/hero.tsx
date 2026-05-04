"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Film,
  GraduationCap,
  Mic2,
  Calendar,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const slides = [
    {
      title: "Bienvenido a SODU",
      subtitle: "Sociedad de Debate UNSAAC",
      description: "Espacio para desarrollar habilidades de comunicación, pensamiento crítico y liderazgo",
      image: "/carrusel/carusel1.jpg",
    },
    {
      title: "Nuestras Actividades",
      subtitle: "Debates, conferencias y eventos académicos",
      description: "Participa en debates estructurados, cinefórums y seminarios de reflexión",
      image: "/carrusel/carusel2.jpg",
    },
    {
      title: "Desarrolla tus Habilidades",
      subtitle: "Talleres, coachs y mentoría personalizada",
      description: "Aprende de expertos y mejora tu oratoria, análisis crítico y argumentación",
      image: "/carrusel/carusel4.JPG",
    },
  ];

  const newsItems = [
    {
      title: "III Convocatoria 2026",
      desc: "Únete a la Sociedad de Debate. Inscripciones abiertas del 14 al 30 de abril.",
      date: "Abril 2026",
      image: "/news/convocatoria.png",
    },
    {
      title: "Taller Legalmente Básico",
      desc: "Ciclo especializado de introducción al derecho y oratoria jurídica.",
      date: "Marzo 2026",
      image: "/news/taller_legalmente_basico_2026.png",
    },
    {
      title: "Club de Lectura",
      desc: "Espacio de análisis y crítica literaria todos los viernes en la facultad.",
      date: "Marzo 2026",
      image: "/news/club_de_lectura.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="w-full">
      {/* Hero Carousel */}
      <div className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-[#030a50]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030a50]/80 via-[#030a50]/40 to-transparent" />
          </div>
        ))}

        {/* Carousel Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-20">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-5 duration-1000">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-[#be8a34] mb-6 font-bold uppercase tracking-wider">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              {slides[currentSlide].description}
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/sociedad")}
              className="bg-[#be8a34] hover:bg-[#a0773a] text-[#030a50] font-bold px-10 h-14 text-lg transition-all"
            >
              Conoce Más <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute inset-x-0 bottom-10 z-30 flex justify-between items-center px-4 md:px-10">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 transition-all rounded-full ${index === currentSlide ? "bg-[#be8a34] w-12" : "bg-white/30 w-6 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={prevSlide} className="p-3 rounded-full border border-white/20 bg-white/10 text-white hover:bg-[#be8a34] hover:text-[#030a50] transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full border border-white/20 bg-white/10 text-white hover:bg-[#be8a34] hover:text-[#030a50] transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links / Secciones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Club de Lectura", desc: "Análisis crítico y profundo de obras literarias.", href: "/lectura" },
              { icon: Film, title: "Cinefórum", desc: "Debate y reflexión a través del séptimo arte.", href: "/cineforum" },
              { icon: GraduationCap, title: "Talleres", desc: "Capacitación en técnicas de debate y oratoria.", href: "/talleres" },
              { icon: Mic2, title: "Seminarios", desc: "Encuentros académicos con ponentes expertos.", href: "/seminarios" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#be8a34]/30 hover:shadow-xl hover:shadow-[#030a50]/5 transition-all duration-300 block">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-[#be8a34] mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#030a50] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#030a50]">Últimas Noticias</h2>
              <div className="h-1 w-20 bg-[#be8a34] mt-4 rounded-full" />
            </div>
            {/*<Button variant="ghost" className="text-[#be8a34] font-bold hover:text-[#030a50]">*/}
            {/*  Ver todas las noticias*/}
            {/*</Button>*/}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
            {newsItems.map((news, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image Container con Aspect Ratio controlado */}
                <div className="h-64 relative overflow-hidden bg-gray-200">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay para legibilidad y estética */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030a50]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-[#be8a34] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Destacado
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#be8a34] text-xs font-bold mb-3 uppercase tracking-widest">
                    <Calendar size={14} className="stroke-[3px]" />
                    {news.date}
                  </div>

                  <h3 className="text-xl font-black text-[#030a50] mb-3 group-hover:text-[#be8a34] transition-colors leading-tight">
                    {news.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {news.desc}
                  </p>

                  {/*<div className="mt-auto pt-4 border-t border-gray-50">*/}
                  {/*  <button className="text-[#030a50] text-xs font-black uppercase tracking-tighter group-hover:gap-3 flex items-center gap-2 transition-all">*/}
                  {/*    Leer más <span className="text-[#be8a34]">→</span>*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
