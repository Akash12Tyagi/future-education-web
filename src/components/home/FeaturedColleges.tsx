"use client";

import Link from "next/link";
import { colleges } from "@/data/colleges";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { CollegeCard } from "@/components/colleges/CollegeCard";

export function FeaturedColleges() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const featured = colleges.filter((c) => c.isVerifiedPartner).slice(0, 6);

  return (
    <section className="border-y border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-[1220px] px-[22px] py-14">
        <div className="mb-6.5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-1.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">
              Featured partner institutes
            </h2>
            <p className="m-0 text-neutral-500">A cross-section of our 5,000+ associate institutes and universities.</p>
          </div>
          <Link href="/colleges" className="font-bold whitespace-nowrap text-accent-500 no-underline">
            Browse all 5,000+ →
          </Link>
        </div>
        <div ref={ref} className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {featured.map((c, i) => (
            <CollegeCard key={c.id} college={c} style={revealStyle(revealed, { delay: i * 70 })} />
          ))}
        </div>
      </div>
    </section>
  );
}
