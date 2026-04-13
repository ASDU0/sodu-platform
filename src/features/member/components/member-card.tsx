import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { MemberModel } from "@/app/generated/prisma/models/Member";

interface MemberCardProps {
  member: MemberModel;
}

const ROLE_LABELS: Record<MemberModel["type"], string> = {
  COACH: "Coach",
  DIRECTIVA: "Directiva",
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="group rounded-xl border border-border/60 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={member.imageUrl || "/placeholder-user.jpg"}
          alt={member.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-[#030a50]">{member.name}</h3>
            <p className="text-sm font-semibold text-muted-foreground">{member.roleTitle}</p>
          </div>
          <Badge className="bg-[#be8a34] text-white">{ROLE_LABELS[member.type]}</Badge>
        </div>
        <p className="text-sm text-gray-700 line-clamp-4">{member.bio}</p>
      </div>
    </article>
  );
}

