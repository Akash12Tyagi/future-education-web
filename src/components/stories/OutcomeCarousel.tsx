"use client";

import { useState } from "react";
import { outcomeHighlights } from "@/data/outcomes";

export function OutcomeCarousel() {
  const [idx, setIdx] = useState(0);
  const active = outcomeHighlights[idx];

  const prev = () => setIdx((i) => (i - 1 + outcomeHighlights.length) % outcomeHighlights.length);
  const next = () => setIdx((i) => (i + 1) % outcomeHighlights.length);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-neutral-100">
      <div className="flex flex-wrap items-center gap-7 p-[clamp(20px,3vw,28px)]">
        <div className="min-w-[260px] flex-1" style={{ flexBasis: 340 }}>
          <div className="mb-2.5 flex items-center justify-between gap-2.5">
            <span className="text-[12.5px] font-bold tracking-[.04em] text-accent-500 uppercase">
              Real Admission Outcomes
            </span>
            <span className="text-[12.5px] font-bold text-[#9CA3AF]">
              {idx + 1} / {outcomeHighlights.length}
            </span>
          </div>
          <div className="mb-3 text-xl font-extrabold text-primary-900">{active.title}</div>
          <div className="mb-4 flex flex-col gap-2">
            {active.points.map((pt) => (
              <div key={pt} className="flex items-start gap-2 text-[14.5px] text-[#374151]">
                <span className="font-bold text-accent-500">·</span>
                {pt}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            <span className="rounded-lg border-[1.5px] border-accent-500 px-3 py-1.5 text-[13px] font-bold text-accent-500">
              {active.pill1}
            </span>
            <span className="rounded-lg border-[1.5px] border-accent-500 px-3 py-1.5 text-[13px] font-bold text-accent-500">
              {active.pill2}
            </span>
          </div>
        </div>
        <div className="flex flex-none items-center gap-4.5">
          <div
            className="flex items-center justify-center rounded-2xl text-center"
            style={{
              width: 150,
              aspectRatio: "3/4",
              backgroundImage:
                "repeating-linear-gradient(135deg, #E5F3EA, #E5F3EA 10px, #F1F7F3 10px, #F1F7F3 20px)",
              padding: 10,
            }}
          >
            <span className="font-mono text-[10.5px] text-[#1F7A42]">student photo</span>
          </div>
          <div>
            <div className="text-[15px] font-bold text-neutral-900">{active.name}</div>
            <div className="text-[13px] text-neutral-500">{active.college}</div>
            <div className="mt-0.5 text-[13px] font-semibold text-success-500">{active.tag ?? ""}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3.5 border-t border-[#E5E7EB] bg-white p-3.5">
        <button
          onClick={prev}
          aria-label="Previous outcome"
          className="h-8.5 w-8.5 cursor-pointer rounded-lg border border-[#D1D5DB] bg-white text-[15px] text-primary-900"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {outcomeHighlights.map((o, i) => (
            <button
              key={o.title}
              onClick={() => setIdx(i)}
              aria-label="Go to outcome"
              className="cursor-pointer border-none p-0"
              style={
                i === idx
                  ? { width: 28, height: 8, borderRadius: 6, background: "var(--color-accent-500)" }
                  : { width: 8, height: 8, borderRadius: "50%", background: "#D1D5DB" }
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next outcome"
          className="h-8.5 w-8.5 cursor-pointer rounded-lg border border-[#D1D5DB] bg-white text-[15px] text-primary-900"
        >
          ›
        </button>
      </div>
    </div>
  );
}
