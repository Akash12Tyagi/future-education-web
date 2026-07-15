"use client";

import Image from "next/image";
import { counsellors } from "@/data/counsellors";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { AboutTabs } from "@/components/about/AboutTabs";

export default function AboutCounsellorsPage() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <AboutTabs />
      <h1 className="mb-5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Our counsellors</h1>
      <div ref={ref} className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {counsellors.map((m, i) => (
          <div
            key={m.id}
            className="fe-card-hover rounded-[14px] border border-[#E5E7EB] bg-white p-5.5"
            style={revealStyle(revealed, { delay: i * 70 })}
          >
            <div className="relative mb-3.5 aspect-square w-full overflow-hidden rounded-xl">
              <Image src={m.image} alt={m.imageAlt} fill sizes="240px" className="object-cover" />
            </div>
            <div className="font-bold text-neutral-900">{m.name}</div>
            <div className="my-0.5 text-[13px] font-semibold text-accent-500">{m.specialization}</div>
            <div className="text-[13px] leading-relaxed text-neutral-500">{m.credentials}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
