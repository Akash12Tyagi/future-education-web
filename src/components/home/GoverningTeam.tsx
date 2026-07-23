"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal, revealStyle } from "@/hooks/useReveal";
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
      <div className="relative mx-auto max-w-[1220px] px-[22px] py-14">
        <h2 className="mb-1.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">The people guiding you</h2>
        <p className="mb-8 text-neutral-500">Named counsellors with real credentials — not an anonymous call centre.</p>
        <div ref={ref} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          {team.map((m, i) => {
            const countries = extractCountries(m.specialization);
            return (
              <div
                key={m.id}
                className="group fe-card-hover flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-gradient-to-b from-white to-primary-100/30 shadow-[0_10px_30px_rgba(15,61,38,.08)]"
                style={revealStyle(revealed, { delay: i * 90 })}
              >
                <div className="relative aspect-[4/5] w-full flex-none overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 590px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span className="text-xl font-extrabold text-neutral-900">{m.name}</span>
                    <span className="rounded-md bg-primary-100 px-2.5 py-1 text-[12px] font-bold text-primary-900">
                      {m.role}
                    </span>
                  </div>
                  <div className="mb-4 text-[13.5px] leading-relaxed text-neutral-500">{m.credentials}</div>
                  <p className="mb-5 flex-1 text-[15px] leading-relaxed text-[#374151]">{m.specialization}</p>
                  {countries.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {countries.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-accent-500/40 px-2.5 py-1 text-[11px] font-bold text-accent-500"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href="/contact"
                    className="group/cta mt-auto inline-flex items-center gap-2 self-start rounded-[10px] bg-accent-500 px-5 py-3 text-[14.5px] font-bold text-white no-underline"
                  >
                    <span>Book Consultation</span>
                    <span aria-hidden className="transition-transform duration-200 group-hover/cta:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
