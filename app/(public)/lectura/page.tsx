import { BookPublicScreen } from "@/src/features/book/screens/book-public-screen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club de Lectura",
  description: "Explora nuestro Club de Lectura, un espacio dedicado al análisis literario profundo y la discusión crítica de obras clásicas y contemporáneas.",
};

export const dynamic = 'force-dynamic';

export default function LecturaPage() {
  return <BookPublicScreen />;
}
