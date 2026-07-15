import Link from "next/link";
import Image from "next/image";
import type { College } from "@/lib/types";
import { typeLabel } from "@/lib/format";

export function NetworkCard({ college: c, style }: { college: College; style?: React.CSSProperties }) {
  return (
    <Link
      href={`/colleges/${c.slug}`}
      className="fe-stream-card flex-none overflow-hidden rounded-xl border border-[#E5E7EB] bg-white no-underline"
      style={{ flex: "0 0 220px", ...style }}
    >
      <div className="fe-image-zoom-wrap relative aspect-[4/3] overflow-hidden">
        <Image
          src={c.image}
          alt={c.imageAlt}
          fill
          sizes="220px"
          className="fe-image-zoom object-cover"
        />
        <span className="absolute top-2 right-2 rounded-md bg-white px-2 py-1 text-[11px] font-extrabold text-neutral-900 shadow-[0_2px_6px_rgba(0,0,0,.12)]">
          {c.state}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <span className="self-start rounded-full bg-primary-100 px-2.5 py-1 text-[10.5px] font-bold tracking-[.03em] text-[#1F7A42] uppercase">
          {typeLabel(c.type)}
        </span>
        <div className="text-sm leading-tight font-bold text-neutral-900">{c.name}</div>
        <div className="text-[12.5px] text-neutral-500">{c.city}</div>
      </div>
    </Link>
  );
}
