import type React from "react"
import type {Metadata} from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sociedad de Debate UNSAAC",
  description: "Sociedad académica voluntaria dedicada a la oratoria, debate, análisis crítico y desarrollo personal",
  // generator: "v0.app",
  // icons: {
  //   icon: [
  //     {
  //       url: "/icon-light-32x32.png",
  //       media: "(prefers-color-scheme: light)",
  //     },
  //     {
  //       url: "/icon-dark-32x32.png",
  //       media: "(prefers-color-scheme: dark)",
  //     },
  //     {
  //       url: "/icon.svg",
  //       type: "image/svg+xml",
  //     },
  //   ],
  //   apple: "/apple-icon.png",
  // },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
    <body className={`font-sans antialiased`}>
    <div>
      {children}
    </div>
    </body>
    </html>
  )
}
