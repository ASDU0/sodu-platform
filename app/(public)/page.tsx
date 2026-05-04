import Hero from "@/components/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Sociedad de Debate UNSAAC",
  description: "Bienvenido a la Sociedad de Debate UNSAAC (SODU). Desarrollamos pensamiento crítico, oratoria y liderazgo en la comunidad universitaria de Cusco.",
};

export default function HomePage() {
  return <Hero />
}
