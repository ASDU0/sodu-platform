import type { MemberModel } from "@/app/generated/prisma/models/Member";
import { MemberCard } from "./member-card";

interface MemberListProps {
  members: MemberModel[];
}

export function MemberList({ members }: MemberListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

