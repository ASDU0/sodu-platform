import Link from "next/link";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/60 bg-white px-6 py-10 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60">
        {icon ?? <Inbox className="h-8 w-8 text-muted-foreground/60" />}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[#030a50]">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {ctaLabel && ctaHref ? (
        <Button asChild className="mt-2">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
