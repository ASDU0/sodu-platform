import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinefórum",
  description: "Participa en nuestro Cinefórum, un espacio donde el cine se encuentra con el debate para analizar temas sociales, políticos y filosóficos.",
};

export default function CineforumPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold">Cinefórum</h1>
    </div>
  );
}
