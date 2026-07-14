import Link from "next/link";
import type { College } from "@/lib/types";
import { typeLabel } from "@/lib/format";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CompareButton } from "@/components/ui/CompareButton";

interface CollegeCardProps {
  college: College;
  style?: React.CSSProperties;
}

export function CollegeCard({ college: c, style }: CollegeCardProps) {
  return (
    <div className="fe-card-hover flex flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white" style={style}>
      <div className="fe-image-zoom-wrap aspect-video overflow-hidden">
        <ImageSlot placeholder="Campus photo" className="fe-image-zoom" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="text-base font-bold text-neutral-900">{c.name}</div>
          {c.isVerifiedPartner && (
            <span className="rounded-md bg-success-100 px-2 py-1 text-[11px] font-bold whitespace-nowrap text-success-500">
              ✓ Verified
            </span>
          )}
        </div>
        <div className="text-[13.5px] text-neutral-500">
          {c.city}, {c.state} · {typeLabel(c.type)}
        </div>
        <div className="text-[12.5px] font-semibold text-[#1F7A42]">{c.acc.join(" · ")}</div>
        <div className="mt-auto flex gap-2 pt-1.5">
          <Link
            href={`/colleges/${c.slug}`}
            className="flex-1 rounded-[9px] border-[1.5px] border-[#1F7A42] py-2.5 text-center text-[13.5px] font-semibold text-[#1F7A42] no-underline"
          >
            View profile
          </Link>
          <CompareButton collegeId={c.id} />
        </div>
      </div>
    </div>
  );
}
