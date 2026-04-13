"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableSearchProps {
  placeholder?: string;
  paramKey?: string;
}

export function TableSearch({ placeholder = "Buscar...", paramKey = "q" }: TableSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentValue = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(paramKey, value);
      } else {
        params.delete(paramKey);
      }
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return () => clearTimeout(timeout);
  }, [paramKey, pathname, router, searchParams, value]);

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-11 rounded-xl border-2 pl-10 pr-10 focus-visible:ring-[#030a50]"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}

