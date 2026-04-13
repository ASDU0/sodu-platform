import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { BookModel } from "@/app/generated/prisma/models/Book";

interface BookCardProps {
  book: BookModel;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group rounded-xl border border-border/60 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={book.coverUrl || "/placeholder.jpg"}
          alt={book.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-[#030a50]">{book.title}</h3>
          <Badge className="bg-[#be8a34] text-white">{`${book.rating.toFixed(1)}★`}</Badge>
        </div>
        <p className="text-sm font-semibold text-muted-foreground">{book.author}</p>
        <p className="text-sm text-gray-700 line-clamp-3">{book.description}</p>
      </div>
    </article>
  );
}

