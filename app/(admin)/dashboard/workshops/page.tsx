import { WorkshopsAdminScreen } from '@/features/workshop/screens/workshops-admin-screen';

interface AdminWorkshopsPageProps {
  searchParams?: Promise<{
    q?: string;
  }>
}

export default async function WorkshopsPage({ searchParams }: AdminWorkshopsPageProps) {
  const params = await searchParams;
  return <WorkshopsAdminScreen searchParams={params} />;
}