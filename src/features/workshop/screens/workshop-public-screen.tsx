import { Suspense } from 'react';
import { getWorkshops } from '../actions/workshop-actions';
import { WorkshopCard } from '../components/workshop-card';

export async function WorkshopPublicScreen() {
  const workshops = await getWorkshops();

  // Filtrar solo talleres activos
  const activeWorkshops = workshops.filter(workshop => workshop.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#030a50] to-[#1a237e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Talleres
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Capacitación en técnicas de debate y oratoria para desarrollar tus habilidades
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#030a50] mb-4">
            Próximos Talleres
          </h2>
          <div className="h-1 w-20 bg-[#be8a34] mx-auto rounded-full" />
        </div>

        <Suspense fallback={<div className="text-center py-12">Cargando talleres...</div>}>
          {activeWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No hay talleres disponibles en este momento.
              </div>
              <div className="text-gray-400 text-sm mt-2">
                Vuelve pronto para nuevas capacitaciones.
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}