"use client";

import { useState } from "react";
import Link from "next/link";
import { courses, courseOptions } from "@/data/courses";
import { schemes } from "@/data/schemes";
import { waHref } from "@/lib/whatsapp";
import type { Scheme } from "@/lib/types";

const incomeMap: Record<string, Scheme["income"]> = {
  i1: "below_2.5L",
  i2: "2.5L_5L",
  i3: "5L_plus",
};

export default function ScholarshipsPage() {
  const [course, setCourse] = useState("");
  const [income, setIncome] = useState("");
  const [results, setResults] = useState<Scheme[] | null>(null);

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !income) return;
    const c = courses.find((x) => x.slug === course);
    const stream = c ? c.stream : "";
    const inc = incomeMap[income];
    setResults(schemes.filter((sc) => sc.income === inc && (!sc.stream || sc.stream === stream)));
  };

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-10 pb-[90px]">
      <Link href="/admission-consultancy" className="text-sm text-neutral-500 no-underline">
        ← Admission Consultancy
      </Link>
      <h1 className="mt-4 mb-2.5 text-[clamp(28px,3.4vw,38px)] font-extrabold text-primary-900">
        Scholarships &amp; loan guidance
      </h1>
      <p className="m-0 mb-6.5 max-w-[60ch] text-base text-[#4B5563]">
        Affordability shouldn&apos;t decide your future. Check which schemes apply to your course and family income
        — takes 10 seconds.
      </p>

      <form
        onSubmit={checkEligibility}
        className="grid items-end gap-4 rounded-[14px] border border-[#E5E7EB] bg-white p-5.5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">Course</label>
          <select
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setResults(null);
            }}
            className="rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white px-3 py-2.5 text-base"
          >
            <option value="">Select a course…</option>
            {courseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#374151]">Family income (annual)</label>
          <select
            value={income}
            onChange={(e) => {
              setIncome(e.target.value);
              setResults(null);
            }}
            className="rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white px-3 py-2.5 text-base"
          >
            <option value="">Select bracket…</option>
            <option value="i1">Below ₹2.5 lakh</option>
            <option value="i2">₹2.5–5 lakh</option>
            <option value="i3">Above ₹5 lakh</option>
          </select>
        </div>
        <button
          type="submit"
          className="h-11 cursor-pointer rounded-[9px] border-none bg-accent-500 px-5 text-[15px] font-bold text-white"
        >
          Check eligibility
        </button>
      </form>

      {results && results.length > 0 && (
        <div className="mt-6.5 flex flex-col gap-3.5">
          <div className="text-[15px] font-bold text-primary-900">Schemes you may qualify for</div>
          {results.map((sc, i) => (
            <div
              key={sc.id}
              className="rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-success-500 bg-white p-4.5"
              style={{ animation: `feFadeUp .45s cubic-bezier(.16,1,.3,1) ${i * 90}ms both` }}
            >
              <div className="mb-1.5 text-base font-bold text-neutral-900">{sc.name}</div>
              <div className="text-sm leading-relaxed text-[#4B5563]">{sc.desc}</div>
            </div>
          ))}
          <Link href="/contact" className="self-start rounded-[9px] bg-primary-900 px-5 py-3 font-bold text-white no-underline">
            Get help applying →
          </Link>
        </div>
      )}

      {results && results.length === 0 && (
        <div className="mt-6.5 rounded-xl border border-dashed border-[#D1D5DB] bg-white p-7 text-center">
          <div className="mb-1.5 text-base font-bold text-neutral-900">No scheme matched exactly — but options remain</div>
          <p className="m-0 mb-4 text-neutral-500">
            Education loans and merit routes may still apply. Let our loan advisor walk you through it.
          </p>
          <a href={waHref()} target="_blank" rel="noreferrer" className="rounded-[9px] bg-accent-500 px-5 py-2.5 font-bold text-white no-underline">
            Talk to a loan advisor
          </a>
        </div>
      )}
    </div>
  );
}
