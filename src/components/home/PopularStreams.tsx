"use client";

import Link from "next/link";
import { streamsMeta } from "@/data/streams";
import { useReveal, revealStyle } from "@/hooks/useReveal";

export function PopularStreams() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-[1220px] px-[22px] pt-2 pb-14">
      <h2 className="mb-1.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">Explore by stream</h2>
      <p className="mb-6.5 text-neutral-500">Each opens Find Your Course, pre-filtered.</p>
      <div ref={ref} className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
        {streamsMeta.map((st, i) => (
          <Link
            key={st.key}
            href={`/find-your-course?stream=${st.key}`}
            className="fe-stream-card block rounded-[14px] border border-[#E5E7EB] border-t-[3px] border-t-[#1F7A42] bg-white p-5 no-underline"
            style={revealStyle(revealed, { delay: i * 60 })}
          >
            <div className="mb-1.5 text-[17px] font-bold text-primary-900">{st.label}</div>
            <div className="text-[13px] leading-relaxed text-neutral-500">{st.desc}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
