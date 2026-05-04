import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sodu.pe"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sociedad de Debate UNSAAC | Excelencia en Oratoria y Argumentación",
    template: "%s | SODU UNSAAC"
  },
  description: "Sociedad académica voluntaria de la UNSAAC dedicada a la oratoria, debate, análisis crítico y desarrollo personal en Cusco, Perú.",
  keywords: ["Debate", "Oratoria", "UNSAAC", "Cusco", "Argumentación", "Liderazgo", "Análisis Crítico"],
  authors: [{ name: "SODU" }],
  creator: "SODU",
  publisher: "SODU",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: baseUrl,
    siteName: "SODU UNSAAC",
    title: "Sociedad de Debate UNSAAC",
    description: "Sociedad académica voluntaria dedicada a la oratoria, debate y desarrollo personal.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SODU UNSAAC - Sociedad de Debate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sociedad de Debate UNSAAC",
    description: "Desarrollando el pensamiento crítico y la oratoria en Cusco.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo-20sodu.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo-20sodu.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // TODO: Reemplazar con el ID de verificación de Google Search Console
  verification: {
    google: "google-site-verification-id",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
