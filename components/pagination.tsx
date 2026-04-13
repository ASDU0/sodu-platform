"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  paramKey?: string;
}

export function Pagination({ page, totalPages, paramKey = "page" }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramKey, `${nextPage}`);
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav className="flex items-center justify-between gap-4">
      <Button asChild variant="outline" disabled={prevDisabled}>
        <Link href={buildHref(Math.max(1, page - 1))} aria-disabled={prevDisabled}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Link>
      </Button>
      <span className="text-sm text-muted-foreground">
        Pagina {page} de {totalPages}
      </span>
      <Button asChild variant="outline" disabled={nextDisabled}>
        <Link href={buildHref(Math.min(totalPages, page + 1))} aria-disabled={nextDisabled}>
          Siguiente
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </nav>
  );
}

