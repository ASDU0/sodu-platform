import {BookAdminScreen} from "@/src/features/book/screens/book-admin-screen";

interface AdminBookPageProps {
  searchParams?: Promise<{
    q?: string;
    sortBy?: string;
    sortOrder?: string;
  }>
}

export default async function AdminBookPage({searchParams}: AdminBookPageProps){
  const params = await searchParams;
  return (
    <BookAdminScreen searchParams={params}/>
  )
}
