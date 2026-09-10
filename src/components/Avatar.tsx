import type { AvatarProps } from "../types/layout";
import { colors } from "../data/employees";

export function Avatar({ person, large = false }: AvatarProps) {
  return (
    <span
      className={`inline-flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full text-[10px] font-[650] tracking-[.2px] ${large ? "h-[65px] w-[65px] text-[21px]" : ""}`}
      style={{
        background: `${colors[person.department]}24`,
        color: colors[person.department],
      }}
    >
      {person.firstName[0]}
      {person.lastName[0]}
    </span>
  );
}
