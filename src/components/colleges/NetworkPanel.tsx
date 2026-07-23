"use client";

import { useRef } from "react";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { NetworkCard } from "./NetworkCard";
import type { College } from "@/lib/types";

const stats = [
  { value: "5,000+", label: "Associate Institutes" },
  { value: "15+", label: "Years Partnering" },
  { value: "150+", label: "Courses Offered" },
  { value: "Pan-India", label: "& select overseas", small: true },
];

export function NetworkPanel({ colleges }: { colleges: College[] }) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  const logos = colleges.map((c) => c.name.split(",")[0].split("(")[0].trim());

  return (
    <div ref={ref} className="mb-8.5 rounded-2xl border border-[#E5E7EB] bg-white p-[clamp(22px,3.4vw,32px)]" style={revealStyle(revealed, {})}>
      <div className="mb-6 flex flex-wrap justify-between gap-6">
        <div className="min-w-[280px] flex-1" style={{ flexBasis: 380 }}>
          <div className="mb-2 text-[12.5px] font-bold tracking-[.06em] text-accent-500 uppercase">Associate Network</div>
          <h2 className="mb-3 text-[clamp(22px,2.8vw,30px)] font-extrabold text-primary-900">
            Building our <span className="text-accent-500">college network</span>
          </h2>
          <p className="m-0 max-w-[56ch] text-[15.5px] leading-relaxed text-[#4B5563]">
            Fifteen-plus years of campus visits and direct relationships — not a purchased list — have built a
            network of 5,000+ associate colleges and universities we can shortlist from honestly.
          </p>
        </div>
        <div className="grid flex-none grid-cols-2 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[10px] border border-[#E5E7EB] px-5 py-3.5 text-center">
              <div className={`font-extrabold text-accent-500 ${s.small ? "text-base" : "text-[22px]"}`}>{s.value}</div>
              <div className="text-xs font-semibold text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3.5 flex gap-2">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="h-9 w-9 cursor-pointer rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white text-base text-primary-900"
        >
          ‹
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="h-9 w-9 cursor-pointer rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white text-base text-primary-900"
        >
          ›
        </button>
      </div>
      <div ref={railRef} className="flex gap-4 overflow-x-auto pb-1.5" style={{ scrollBehavior: "smooth" }}>
        {colleges.map((c, i) => (
          <NetworkCard key={c.id} college={c} style={revealStyle(revealed, { delay: i * 45, dist: 14 })} />
        ))}
      </div>

      <div className="mt-6.5 border-t border-[#F0F2EF] pt-5.5">
        <div className="mb-3 text-xs font-bold tracking-[.06em] text-neutral-400 uppercase">Our associate institutes</div>
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
          }}
        >
          <div className="fe-marquee-track flex w-max gap-2.5">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={i}
                aria-hidden={i >= logos.length}
                className="rounded-[9px] border border-[#E5E7EB] bg-neutral-100 px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#374151] opacity-70 transition-opacity"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
