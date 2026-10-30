"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { initials } from "@/lib/format";
import { SectionHeading } from "@/components/home/SectionHeading";
import type { Story } from "@/lib/types";

const stats = [
  { lead: "Students guided into the right college", value: "11,690+", note: "Across medical, engineering, management, nursing & education." },
  { lead: "Backed by", value: "5,000+", note: "Associate institutes across India and abroad." },
];

export function BuildFuture({ stories }: { stories: Story[] }) {
  const [index, setIndex] = useState(0);
  const story = stories[index];
  const step = (d: number) => setIndex((i) => (i + d + stories.length) % stories.length);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title="Build your future with confidence"
          sub="Turn your ambition into admission."
          intro="Guidance that goes beyond a single phone call — honest shortlists, transparent fees, and support through to enrolment."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {stats.map((s) => (
            <div key={s.value}>
              <div className="flex items-center gap-2 text-sm text-neutral-500 md:text-base">
                <span aria-hidden>▶</span> {s.lead}
              </div>
              <div className="mt-2 text-5xl font-bold text-accent-500 md:text-6xl">{s.value}</div>
              <p className="m-0 mt-2 text-sm text-neutral-500 md:text-base">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl bg-[#f3f7f4] p-5 md:p-8">
          {story ? (
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                {story.image ? (
                  <div className="relative h-40 w-40 flex-none overflow-hidden rounded-2xl bg-white">
                    <Image src={story.image} alt={story.imageAlt ?? story.name} fill sizes="160px" className="object-cover" />
                  </div>
                ) : (
                  <span className="flex h-24 w-24 flex-none items-center justify-center rounded-2xl bg-primary-900 text-2xl font-bold text-highlight-500">
                    {initials(story.name)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="m-0 text-sm font-semibold text-accent-500">Success story · {story.year}</p>
                  <h3 className="m-0 mt-1 text-xl leading-tight font-bold text-neutral-900 md:text-2xl">{story.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[story.course, story.college].filter(Boolean).map((tag) => (
                      <span key={tag} className="rounded-full border border-[#D1D5DB] bg-white px-2.5 py-0.5 text-xs font-medium text-neutral-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="m-0 mt-3 max-w-2xl text-[15px] leading-relaxed text-[#374151]">&ldquo;{story.quote}&rdquo;</p>
                  <Link href={`/success-stories/${story.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary-900">
                    Read full story ›
                  </Link>
                </div>
              </div>
              {stories.length > 1 && (
                <div className="flex items-center gap-3">
                  <ArrowButton label="Previous story" onClick={() => step(-1)}>
                    ‹
                  </ArrowButton>
                  <span className="text-sm text-neutral-500">
                    {index + 1} / {stories.length}
                  </span>
                  <ArrowButton label="Next story" onClick={() => step(1)}>
                    ›
                  </ArrowButton>
                </div>
              )}
            </div>
          ) : (
            <p className="m-0 text-center text-neutral-500">Student success stories are being added — check back soon.</p>
          )}
        </div>

        <div className="mt-6 text-right">
          <Link href="/success-stories" className="text-base font-semibold text-primary-900 no-underline">
            All success stories ›
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-xl text-primary-900 hover:border-primary-900"
    >
      {children}
    </button>
  );
}
