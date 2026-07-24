"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { NetworkPanel } from "@/components/colleges/NetworkPanel";
import { waHref } from "@/lib/whatsapp";
import type { College, Course, Stream } from "@/lib/types";

interface Filters {
  search: string;
  stream: string;
  state: string;
  type: string;
}

const inputClass = "rounded-[9px] border-[1.5px] border-[#D1D5DB] px-3 py-2.5 text-base outline-none";

export function CollegesDirectoryClient({ colleges, courses }: { colleges: College[]; courses: Course[] }) {
  function streamsOf(courseIds: string[]): Stream[] {
    return courseIds.map((id) => courses.find((c) => c.id === id)?.stream).filter((s): s is Stream => !!s);
  }

  const searchParams = useSearchParams();
  const [cf, setCf] = useState<Filters>(() => ({
    search: "",
    stream: searchParams.get("stream") || "",
    state: "",
    type: "",
  }));
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const setField = (field: keyof Filters, value: string) => setCf((prev) => ({ ...prev, [field]: value }));
  const resetCf = () => setCf({ search: "", stream: "", state: "", type: "" });

  const filtered = colleges
    .filter(
      (c) =>
        (!cf.stream || (streamsOf(c.courseIds) as string[]).includes(cf.stream)) &&
        (!cf.state || c.state === cf.state) &&
        (!cf.type || c.type === cf.type) &&
        (!cf.search || c.name.toLowerCase().includes(cf.search.toLowerCase())),
    )
    .sort((a, b) => Number(b.isVerifiedPartner) - Number(a.isVerifiedPartner));

  const dirStates = [...new Set(colleges.map((c) => c.state))].sort();

  return (
    <div className="mx-auto max-w-[1220px] px-[22px] pt-10 pb-[90px]">
      <div className="mb-6">
        <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Colleges &amp; universities</h1>
        <p className="m-0 max-w-[64ch] text-[17px] text-[#4B5563]">
          5,000+ partner institutes across India — filtered to fit your course, city and budget. Add any to compare
          side by side.
        </p>
      </div>

      <NetworkPanel colleges={colleges} />

      <div
        className="mb-5.5 grid items-end gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-bold text-neutral-500">Search</label>
          <input
            value={cf.search}
            onChange={(e) => setField("search", e.target.value)}
            placeholder="College name…"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-bold text-neutral-500">Stream</label>
          <select value={cf.stream} onChange={(e) => setField("stream", e.target.value)} className={`${inputClass} bg-white`}>
            <option value="">All streams</option>
            <option value="medical">Medical</option>
            <option value="engineering">Engineering / IT</option>
            <option value="management">Management</option>
            <option value="nursing">Nursing</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-bold text-neutral-500">State</label>
          <select value={cf.state} onChange={(e) => setField("state", e.target.value)} className={`${inputClass} bg-white`}>
            <option value="">All states</option>
            {dirStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-bold text-neutral-500">Type</label>
          <select value={cf.type} onChange={(e) => setField("type", e.target.value)} className={`${inputClass} bg-white`}>
            <option value="">All types</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
            <option value="deemed">Deemed</option>
          </select>
        </div>
        <button
          onClick={resetCf}
          className="h-[41px] cursor-pointer rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white font-semibold text-[#4B5563]"
        >
          Reset
        </button>
      </div>

      <div className="mb-4 text-sm text-neutral-500">
        Showing <strong className="text-neutral-900">{filtered.length}</strong> institutes · verified partners shown
        first
      </div>

      {filtered.length > 0 ? (
        <div ref={ref} className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))" }}>
          {filtered.map((c, i) => (
            <CollegeCard key={c.id} college={c} style={revealStyle(revealed, { delay: (i % 9) * 55 })} />
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="mb-2 text-lg font-bold text-neutral-900">No colleges match these filters</div>
          <p className="m-0 mb-4.5 text-neutral-500">Widen your search, or let a counsellor suggest a fit.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              onClick={resetCf}
              className="cursor-pointer rounded-[9px] border-[1.5px] border-[#3d6ce7] bg-white px-5 py-2.5 font-bold text-[#3d6ce7]"
            >
              Reset filters
            </button>
            <a href={waHref()} target="_blank" rel="noreferrer" className="rounded-[9px] bg-accent-500 px-5 py-3 font-bold text-white no-underline">
              Talk to a counsellor
            </a>
          </div>
        </div>
      )}

      <div className="mt-7.5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-primary-100 p-5.5">
        <span className="text-base font-semibold text-primary-900">Not sure which college fits? Talk to a counsellor.</span>
        <Link href="/contact" className="rounded-lg bg-primary-900 px-5 py-3 font-bold text-white no-underline">
          Book a free call →
        </Link>
      </div>
    </div>
  );
}
