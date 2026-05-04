import Image from 'next/image';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WorkshopModel as Workshop } from "@/app/generated/prisma/models/Workshop";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = new Date(workshop.startsAt) > new Date();

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#030a50] to-[#1a237e]">
        {workshop.imageUrl ? (
          <Image
            src={workshop.imageUrl}
            alt={workshop.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-white/20 select-none">
              {workshop.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge
            variant={isUpcoming ? "default" : "secondary"}
            className={isUpcoming ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-600"}
          >
            {isUpcoming ? "Próximo" : "Pasado"}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#030a50] mb-3 group-hover:text-[#be8a34] transition-colors line-clamp-2">
          {workshop.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 text-sm">
          {workshop.description}
        </p>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-3 text-[#be8a34] shrink-0" />
            <span className="text-sm">
              {formatDate(workshop.startsAt)}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-[#be8a34] shrink-0" />
            <span className="text-sm">{workshop.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-3 text-[#be8a34] shrink-0" />
            <span className="text-sm">Capacidad: {workshop.capacity} personas</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            {isUpcoming ? "Inscripción abierta" : "Evento finalizado"}
          </div>
        </div>
      </div>
    </Card>
  );
}