"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NAV_LINKS } from "@/constants/navigation"
import { cn } from "@/lib/utils" // Asumiendo que usas el helper estándar de shadcn

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-20sodu.png"
                alt="SODU Logo"
                fill
                className="object-contain invert"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[#030a50] font-bold text-xl leading-none tracking-tight">SODU</h1>
              <p className="text-[10px] text-[#be8a34] font-bold uppercase tracking-[0.15em] mt-1">
                Sociedad de Debate UNSAAC
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-bold transition-all duration-200 rounded-full",
                    isActive
                      ? "text-[#030a50] bg-slate-50"
                      : "text-[#030a50]/70 hover:text-[#030a50] hover:bg-slate-50"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#be8a34] rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#030a50] hover:bg-slate-100 rounded-full transition-colors"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 shadow-xl",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 py-8 space-y-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-4 py-4 text-lg font-bold rounded-xl transition-all",
                  isActive
                    ? "bg-[#030a50] text-white"
                    : "text-[#030a50] hover:bg-slate-50 border border-transparent"
                )}
              >
                {link.label}
                {isActive && <div className="w-2 h-2 bg-[#be8a34] rounded-full" />}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
