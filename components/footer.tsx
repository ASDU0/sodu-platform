"use client"

import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#030a50] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo-20sodu.png"
                  alt="SODU Logo"
                  width={48}
                  height={48}
                  className="object-contain filter invert"
                />
              </div>
              <h3 className="text-xl font-bold">SODU</h3>
            </div>
            <p className="text-gray-300 text-sm">Sociedad de Oratoria y Debate Universitaria</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#be8a34]">Secciones</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Inicio", "La Sociedad", "Actividades", "Contacto"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#be8a34] transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#be8a34]">Actividades</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Club de Lectura", "Cinefórum", "Talleres", "Seminarios"].map((activity) => (
                <li key={activity}>
                  <a href="#" className="hover:text-[#be8a34] transition">
                    {activity}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#be8a34]">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <span>info@sodu.edu</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Campus Universitario</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🕐</span>
                <span>Lun-Vie: 3PM - 7PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            {[
              { icon: "f", label: "Facebook" },
              { icon: "📷", label: "Instagram" },
              { icon: "🐦", label: "Twitter" },
              { icon: "💼", label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-10 h-10 rounded-full bg-[#be8a34] hover:bg-white transition flex items-center justify-center text-[#030a50] font-bold"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">© 2025 SODU. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-400 text-sm">
          <p>Desarrollado con excelencia académica • Diseñado para inspirar</p>
        </div>
      </div>
    </footer>
  )
}
