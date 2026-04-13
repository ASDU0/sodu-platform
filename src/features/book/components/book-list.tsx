import type { BookModel } from "@/app/generated/prisma/models/Book";
import { BookCard } from "./book-card";

interface BookListProps {
  books: BookModel[];
}

export function BookList({ books }: BookListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

