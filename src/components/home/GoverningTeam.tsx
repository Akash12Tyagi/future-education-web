"use client";

import { useReveal, revealStyle } from "@/hooks/useReveal";
import { CounsellorCard } from "@/components/home/CounsellorCard";
import type { Counsellor } from "@/lib/types";

const COUNTRY_TOKENS = ["United Kingdom", "UK", "USA", "Canada", "Australia", "Ireland", "New Zealand", "India"];

function extractCountries(text: string): string[] {
  return COUNTRY_TOKENS.filter((c) => text.includes(c));
}

export function GoverningTeam({ counsellors }: { counsellors: Counsellor[] }) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const team = counsellors.slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-primary-100/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-primary-600/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-28 h-[380px] w-[380px] rounded-full bg-highlight-500/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1000px] px-[22px] py-14">
        <h2 className="mb-1.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">The people guiding you</h2>
        <p className="mb-8 text-neutral-500">Named counsellors with real credentials — not an anonymous call centre.</p>
        <div ref={ref} className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2">
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
