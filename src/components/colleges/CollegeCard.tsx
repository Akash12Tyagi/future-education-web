import Link from "next/link";
import Image from "next/image";
import type { College } from "@/lib/types";
import { typeLabel } from "@/lib/format";
import { CompareButton } from "@/components/ui/CompareButton";

interface CollegeCardProps {
  college: College;
  style?: React.CSSProperties;
}

export function CollegeCard({ college: c, style }: CollegeCardProps) {
  return (
    <div className="fe-card-hover flex flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white" style={style}>
      <div className="fe-image-zoom-wrap relative aspect-video overflow-hidden">
        <Image
          src={c.image}
          alt={c.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="fe-image-zoom object-cover"
        />
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
        <div className="text-[12.5px] font-semibold text-[#3d6ce7]">{c.acc.join(" · ")}</div>
        <div className="mt-auto flex gap-2 pt-1.5">
          <Link
            href={`/colleges/${c.slug}`}
            className="flex-1 rounded-[9px] border-[1.5px] border-[#3d6ce7] py-2.5 text-center text-[13.5px] font-semibold text-[#3d6ce7] no-underline"
          >
            View profile
          </Link>
          <CompareButton collegeId={c.id} />
        </div>
      </div>
    </div>
  );
}
