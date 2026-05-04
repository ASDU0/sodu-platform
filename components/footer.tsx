"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  MapPin,
  Phone,
  ExternalLink
} from "lucide-react"

const SocialIcons = {
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
  ),
}

// TODO: Agregar las URLs de las redes sociales
const socialLinks = [
  { icon: SocialIcons.Facebook, label: "Facebook", href: " https://www.facebook.com/people/Sociedad-de-Debate-Unsaac/61566406122343" },
  { icon: SocialIcons.Instagram, label: "Instagram", href: "https://www.instagram.com/s.debate_unsaac" },
]

export default function Footer() {
  const sections = [
    { name: "Inicio", href: "/" },
    { name: "La Sociedad", href: "/sociedad" },
    { name: "Actividades", href: "/activities" },
    { name: "Contacto", href: "#contacto" },
  ]

  const activities = [
    { name: "Club de Lectura", href: "/lectura" },
    { name: "Cinefórum", href: "/cineforum" },
    { name: "Talleres", href: "/activities" },
    { name: "Seminarios", href: "/activities" },
  ]

  return (
    <footer className="bg-[#030a50] text-white relative">
      {/* Línea decorativa superior estilo SODU */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#be8a34]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Logo & Descripción */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo-20sodu.png"
                  alt="SODU Logo"
                  fill
                  className="object-contain filter"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">SODU</h3>
                <div className="h-0.5 w-8 bg-[#be8a34]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sociedad de Debate UNSAAC
            </p>
          </div>

          {/* Secciones */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#be8a34] uppercase tracking-widest">Secciones</h4>
            <ul className="space-y-4 text-sm">
              {sections.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#be8a34] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actividades */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#be8a34] uppercase tracking-widest">Actividades</h4>
            <ul className="space-y-4 text-sm">
              {activities.map((activity) => (
                <li key={activity.name}>
                  <Link href={activity.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ExternalLink size={14} className="text-[#be8a34]/50" />
                    {activity.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div id="contacto">
            <h4 className="text-lg font-bold mb-6 text-[#be8a34] uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#be8a34] shrink-0" />
                <a href="mailto:sociedaddedebateunsaac@gmail.com" className="hover:text-white transition-colors break-all">
                  sociedaddedebateunsaac@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#be8a34] shrink-0" />
                <span className="leading-relaxed">
                  Ciudad Universitaria de Perayoc - UNSAAC | Facultad de Derecho, Oficina 202
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#be8a34] shrink-0" />
                <span>994 777 854 / 953 812 433</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#be8a34] hover:text-[#030a50] transition-all duration-300 flex items-center justify-center text-white/80"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} SODU. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="bg-black/40 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em]">
            Desarrollado con excelencia académica • Cusco, Perú
          </p>
        </div>
      </div>
    </footer>
  )
}
