"use client";

import { useState } from "react";
import Link from "next/link";
import { stories } from "@/data/stories";
import { initials } from "@/lib/format";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { OutcomeCarousel } from "@/components/stories/OutcomeCarousel";

export default function SuccessStoriesPage() {
  const [storyStream, setStoryStream] = useState("");
  const [storyYear, setStoryYear] = useState("");
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const storyYears = [...new Set(stories.map((s) => s.year))].sort((a, b) => b - a);
  const filtered = stories.filter(
    (s) => (!storyStream || s.stream === storyStream) && (!storyYear || String(s.year) === storyYear),
  );

  const resetFilters = () => {
    setStoryStream("");
    setStoryYear("");
  };

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Success stories</h1>
      <p className="m-0 mb-2 max-w-[64ch] text-[17px] text-[#4B5563]">
        Real courses, real partner colleges, students we&apos;ve guided from first call to enrolment.
      </p>
      <p className="m-0 mb-6.5 max-w-[64ch] text-[13.5px] text-[#9CA3AF] italic">
        Representative examples based on typical counselling journeys — individual names have been changed for
        privacy.
      </p>

      <div className="mb-10 rounded-[18px] border border-[#E5E7EB] bg-white p-[clamp(22px,3.4vw,36px)]">
        <h2 className="mb-1.5 text-[clamp(24px,3vw,32px)] font-extrabold text-primary-900">
          Build your future with confidence
        </h2>
        <p className="m-0 mb-6.5 max-w-[60ch] text-base text-[#4B5563]">
          At Future Education, guidance goes beyond a single phone call — honest shortlists, transparent fees, and
          support through to enrolment.
        </p>

        <div
          className="mb-7 grid overflow-hidden rounded-2xl border border-[#E5E7EB]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          <div className="border-r border-[#E5E7EB] px-6 py-5">
            <div className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">
              ▶ Students guided into the right college
            </div>
            <div className="text-[clamp(28px,3.6vw,38px)] leading-none font-extrabold text-accent-500">11,690+</div>
            <div className="mt-2 text-[13px] text-neutral-500">
              Across medical, engineering, management, nursing &amp; education.
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">▶ Backed by</div>
            <div className="text-[clamp(28px,3.6vw,38px)] leading-none font-extrabold text-primary-900">5,000+</div>
            <div className="mt-2 text-[13px] text-neutral-500">Associate institutes across India.</div>
          </div>
        </div>

        <OutcomeCarousel />
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-bold text-neutral-500">Stream</label>
          <select
            value={storyStream}
            onChange={(e) => setStoryStream(e.target.value)}
            className="rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white px-3 py-2.5 text-base"
          >
            <option value="">All streams</option>
            <option value="medical">Medical</option>
            <option value="engineering">Engineering</option>
            <option value="management">Management</option>
            <option value="nursing">Nursing</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-bold text-neutral-500">Year</label>
          <select
            value={storyYear}
            onChange={(e) => setStoryYear(e.target.value)}
            className="rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white px-3 py-2.5 text-base"
          >
            <option value="">All years</option>
            {storyYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="h-[41px] cursor-pointer rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white px-4 font-semibold text-neutral-500"
        >
          Reset
        </button>
      </div>

      {filtered.length > 0 ? (
        <div ref={ref} className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {filtered.map((st, i) => (
            <div
              key={st.id}
              className="fe-card-hover flex flex-col gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-5.5"
              style={revealStyle(revealed, { delay: (i % 6) * 65 })}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-900 text-base font-bold text-highlight-500">
                  {initials(st.name)}
                </span>
                <div>
                  <div className="font-bold text-neutral-900">{st.name}</div>
                  <div className="text-[13px] text-neutral-500">
                    {st.course} · {st.college}
                  </div>
                </div>
              </div>
              <p className="m-0 text-[15px] leading-snug text-[#374151]">&quot;{st.quote}&quot;</p>
              <div className="mt-auto flex items-center justify-between pt-1.5">
                {st.verified && (
                  <span className="rounded-md bg-success-100 px-2 py-1 text-[11px] font-bold text-success-500">
                    ✓ Verified · {st.year}
                  </span>
                )}
                <Link href={`/success-stories/${st.slug}`} className="text-[13.5px] font-bold text-accent-500 no-underline">
                  Read full story →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="mb-2 text-lg font-bold text-neutral-900">No stories yet for this filter</div>
          <button
            onClick={resetFilters}
            className="cursor-pointer rounded-[9px] border-[1.5px] border-[#1F7A42] bg-white px-5 py-2.5 font-bold text-[#1F7A42]"
          >
            Reset filters
          </button>
        </div>
      )}

      <div className="mt-8.5 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary-900 p-7.5">
        <div className="text-xl font-extrabold text-[#E5F3EA]">
          Start your story.
          <span className="mt-1 block text-[15px] font-normal text-[#B9D6C4]">
            Free counselling — the first step every student above took.
          </span>
        </div>
        <Link href="/contact" className="rounded-[10px] bg-accent-500 px-6 py-3.5 font-bold text-white no-underline">
          Talk to a counsellor →
        </Link>
      </div>
    </div>
  );
}
