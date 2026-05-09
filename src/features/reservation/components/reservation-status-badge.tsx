import { Badge } from "@/components/ui/badge";
import type { ReservationStatus } from "@/app/generated/prisma/client";

const STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className: string }
> = {
  PENDING: {
    label: "Pendiente",
    variant: "secondary",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  CONFIRMED: {
    label: "Confirmada",
    variant: "default",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  CANCELLED: {
    label: "Cancelada",
    variant: "destructive",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

interface ReservationStatusBadgeProps {
  status: ReservationStatus;
}

export function ReservationStatusBadge({ status }: ReservationStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge
      variant={config.variant}
      className={`rounded-md font-bold px-2.5 py-0.5 border ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}
