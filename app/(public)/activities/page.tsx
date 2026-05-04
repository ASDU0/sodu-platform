import ActividadesSection from "@/components/sections/actividades-section"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actividades Académicas",
  description: "Descubre las actividades que realizamos en SODU: debates, talleres, seminarios y eventos diseñados para potenciar tus habilidades comunicativas.",
};

export default function ActividadesPage() {
  return <ActividadesSection />
}
