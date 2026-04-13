import Navigation from "@/components/navigation";
import type React from "react";
import Footer from "@/components/footer";

export default function PublicLayout({
                                       children,
                                     }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navigation/>
      {children}
      <Footer/>
    </div>
  )
}
