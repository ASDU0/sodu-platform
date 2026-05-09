import { ReservationAdminScreen } from "@/src/features/reservation/screens/reservation-admin-screen";

export const dynamic = "force-dynamic";

interface AdminReservationsPageProps {
  searchParams?: Promise<{ q?: string; status?: string }>;
}

export default async function AdminReservationsPage({
  searchParams,
}: AdminReservationsPageProps) {
  const params = await searchParams;
  return <ReservationAdminScreen searchParams={params} />;
}
