"use client";

import Link from "next/link";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { CounsellorCard } from "@/components/home/CounsellorCard";
import type { Counsellor } from "@/lib/types";

const COUNTRY_TOKENS = ["United Kingdom", "UK", "USA", "Canada", "Australia", "Ireland", "New Zealand", "India"];

function extractCountries(text: string): string[] {
  return COUNTRY_TOKENS.filter((c) => text.includes(c));
}

export function GoverningTeam({ counsellors }: { counsellors: Counsellor[] }) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const team = counsellors.slice(0, 4);

  return (
    <section className="border-t border-[#E5E7EB] bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our counsellors"
            title="The people guiding you"
            intro="Named counsellors with real credentials — not an anonymous call centre."
          />
          {counsellors.length > 0 && (
            <Link href="/about/counsellors" className="text-base font-semibold whitespace-nowrap text-primary-900 no-underline">
              Meet all counsellors ›
            </Link>
          )}
        </div>
        <div ref={ref} className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <CounsellorCard
              key={m.id}
              image={m.image}
              imageAlt={m.imageAlt}
              name={m.name}
              role={m.role}
              credentials={m.credentials}
              specialization={m.specialization}
              countries={extractCountries(m.specialization)}
              style={revealStyle(revealed, { delay: i * 90 })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
