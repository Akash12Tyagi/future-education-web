"use client";

import Link from "next/link";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { SectionHeading } from "@/components/home/SectionHeading";
import type { College } from "@/lib/types";

export function FeaturedColleges({ colleges }: { colleges: College[] }) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const featured = colleges.filter((c) => c.isVerifiedPartner).slice(0, 6);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Partner institutes"
            title="Colleges we work with"
            intro="A cross-section of our 5,000+ associate institutes and universities."
          />
          <Link href="/colleges" className="text-base font-semibold whitespace-nowrap text-primary-900 no-underline">
            Browse all colleges ›
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
