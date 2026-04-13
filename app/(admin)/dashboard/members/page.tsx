import { MemberAdminScreen } from "@/src/features/member/screens/member-admin-screen";

interface AdminMemberPageProps {
  searchParams?: Promise<{
    q?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function AdminMemberPage({ searchParams }: AdminMemberPageProps) {
  const params = await searchParams;
  return <MemberAdminScreen searchParams={params} />;
}

