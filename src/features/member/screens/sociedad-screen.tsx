import {MissionVision} from "@/components/mission-and-vision";
import {PillarsGrid} from "@/components/pillars-grid";
import {AboutSection} from "@/components/about-section";

export async function SociedadScreen() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">La Sociedad</h1>
          <p className="mt-4 text-lg text-[#be8a34]">
            Conoce nuestra historia, misión y valores
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <AboutSection />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <MissionVision/>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <PillarsGrid/>
        </div>
      </section>
    </main>
  );
}

