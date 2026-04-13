"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_LINKS } from "@/constants/navigation"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper para manejar clases de Tailwind limpiamente
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // setIsOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/logo-20sodu.png"
                alt="SODU Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[#030a50] font-bold text-lg leading-none">SODU</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Oratoria y Debate</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-[#030a50] text-white"
                      : "text-[#030a50] hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#030a50] hover:bg-gray-50 rounded-md"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-md",
                  isActive
                    ? "bg-[#030a50] text-white"
                    : "text-[#030a50] hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
