"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CourseCard } from "@/components/find-course/CourseCard";
import { useReveal } from "@/hooks/useReveal";
import { waHref } from "@/lib/whatsapp";
import type { Course, StreamMeta } from "@/lib/types";
import type { CourseCategory } from "@/lib/site-data";

type CourseTypeFilter = "all" | "regular" | "distance";

export function FindYourCourseClient({
  courses,
  streamsMeta,
  categories,
}: {
  courses: Course[];
  streamsMeta: StreamMeta[];
  categories: CourseCategory[];
}) {
  const searchParams = useSearchParams();
  // Deep-linked filters (?stream=medical, ?type=regular) seed initial state once;
  // useSearchParams() is available synchronously on both server and client render.
  const [courseType, setCourseType] = useState<CourseTypeFilter>(() => {
    const type = searchParams.get("type");
    return type === "regular" || type === "distance" ? type : "all";
  });
  const [courseStreams, setCourseStreams] = useState<string[]>(() => {
    const stream = searchParams.get("stream");
    return stream ? [stream] : [];
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const toggleStream = (key: string) => {
    setCourseStreams((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]));
  };

  const resetFilters = () => {
    setCourseType("all");
    setCourseStreams([]);
  };

  const filtered = courses.filter(
    (c) => (courseType === "all" || c.type === courseType) && (courseStreams.length === 0 || courseStreams.includes(c.stream)),
  );

  const modeBtn = (active: boolean) =>
    `rounded-lg border-none px-4.5 py-2.5 text-sm font-bold ${active ? "bg-primary-900 text-white" : "bg-transparent text-[#4B5563]"}`;

  const chipBtn = (active: boolean) =>
    `cursor-pointer rounded-full border-[1.5px] px-3.5 py-2 text-[13.5px] font-semibold ${
      active ? "border-primary-600 bg-primary-100 text-primary-900" : "border-[#D1D5DB] bg-white text-[#4B5563]"
    }`;

  return (
    <div className="mx-auto max-w-[1220px] px-[22px] pt-10 pb-20">
      <div className="mb-6.5">
        <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Find your course</h1>
        <p className="m-0 max-w-[64ch] text-[17px] text-[#4B5563]">
          Not sure where to start? Let the matcher narrow it down — or filter the full list below.
        </p>
      </div>

      <Link
        href="/find-your-course/matcher"
        className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-primary-900 px-6 py-5 text-white no-underline"
      >
        <div>
          <div className="mb-1 text-lg font-extrabold">Answer 5 questions → your shortlist in 60 seconds…</div>
          <div className="text-sm text-[#bfe0ca]">Every match explains why it fits.</div>
        </div>
        <span className="rounded-lg bg-accent-500 px-5 py-2.5 text-[15px] font-bold whitespace-nowrap">
          Start the matcher →
        </span>
      </Link>

      <section aria-labelledby="course-overview" className="mb-7.5">
        <h2 id="course-overview" className="mb-3.5 text-xl font-extrabold text-primary-900">
          Overview — pick your field
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/find-your-course/matcher?category=${cat.key}`}
              className="fe-card-hover flex flex-col gap-1 rounded-xl border border-[#E5E7EB] bg-white p-4 no-underline"
            >
              <span className="text-[15.5px] font-bold text-neutral-900">{cat.label}</span>
              <span className="text-[13px] leading-snug text-neutral-500">{cat.examples}</span>
              <span className="mt-1.5 text-[13px] font-bold text-accent-500">Find my match →</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mb-6.5 flex flex-col gap-4 rounded-[14px] border border-[#E5E7EB] bg-white p-4.5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-bold tracking-[.04em] text-neutral-500 uppercase">Mode</span>
          <div className="inline-flex rounded-[10px] bg-[#eef4ef] p-1">
            <button onClick={() => setCourseType("all")} className={modeBtn(courseType === "all")}>
              All
            </button>
            <button onClick={() => setCourseType("regular")} className={modeBtn(courseType === "regular")}>
              Regular
            </button>
            <button onClick={() => setCourseType("distance")} className={modeBtn(courseType === "distance")}>
              Distance
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[13px] font-bold tracking-[.04em] text-neutral-500 uppercase">Stream</span>
          {streamsMeta.map((st) => (
            <button key={st.key} onClick={() => toggleStream(st.key)} className={chipBtn(courseStreams.includes(st.key))}>
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-primary-600/10 blur-3xl" />
            <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-highlight-500/10 blur-3xl" />
          </div>
          <div ref={ref} className="grid grid-cols-1 items-stretch gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <CourseCard
                key={c.id}
                course={c}
                expanded={expandedId === c.id}
                onToggle={(id) => setExpandedId((prev) => (prev === id ? null : id))}
                revealed={revealed}
                delay={(i % 6) * 60}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="mb-2 text-lg font-bold text-neutral-900">No courses match these filters</div>
          <p className="m-0 mb-4.5 text-neutral-500">Try widening your selection — or let a counsellor guide you directly.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              onClick={resetFilters}
              className="cursor-pointer rounded-[9px] border-[1.5px] border-[#0b7a3b] bg-white px-5 py-2.5 font-bold text-[#0b7a3b]"
            >
              Reset filters
            </button>
            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="rounded-[9px] bg-accent-500 px-5 py-3 font-bold text-white no-underline"
            >
              Talk to a counsellor
            </a>
          </div>
        </div>
      )}

      <div className="mt-8.5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-primary-100 p-6">
        <div className="text-base font-semibold text-primary-900">
          Comparing MBA vs PGDM, or two colleges? Compare them side by side.
        </div>
        <Link href="/colleges/compare" className="rounded-lg bg-primary-900 px-5 py-3 font-bold text-white no-underline">
          Open Comparison Tool →
        </Link>
      </div>
    </div>
  );
}
