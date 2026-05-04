import Navigation from "@/components/navigation";
import type React from "react";
import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}
