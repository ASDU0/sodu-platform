import { SociedadScreen } from "@/src/features/member/screens/sociedad-screen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Sociedad",
  description: "Conoce más sobre la Sociedad de Debate UNSAAC (SODU), nuestra misión, visión y los valores que nos guían como organización académica.",
};

export default function SociedadPage() {
  return <SociedadScreen />;
}
