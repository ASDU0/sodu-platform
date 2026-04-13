import { getBooks } from "../actions/book-actions";
import { EmptyState } from "@/components/empty-state";
import { BookList } from "../components/book-list";

export async function BookPublicScreen() {
  const books = await getBooks();
  const activeBooks = books.filter((book) => book.isActive);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#030a50] to-[#0d1b5c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Club de Lectura</h1>
          <p className="mt-4 text-lg text-[#be8a34]">
            Explora los libros seleccionados para nuestros encuentros.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl space-y-2">
            <h2 className="text-2xl font-semibold text-[#030a50]">Libros del mes</h2>
            <p className="text-sm text-muted-foreground">
              Cada titulo abre un espacio de debate y reflexion colectiva.
            </p>
          </div>
          {activeBooks.length === 0 ? (
            <EmptyState
              title="No hay libros activos"
              description="Vuelve pronto para conocer las proximas lecturas."
            />
          ) : (
            <BookList books={activeBooks} />
          )}
        </div>
      </section>
    </main>
  );
}
