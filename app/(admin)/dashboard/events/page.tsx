import { EventAdminScreen } from "@/src/features/event/screens/event-admin-screen";

interface AdminEventsPageProps {
  searchParams?: Promise<{ q?: string }>;
}

export default async function AdminEventsPage({ searchParams }: AdminEventsPageProps) {
  const params = await searchParams;
  return <EventAdminScreen searchParams={params} />;
}
