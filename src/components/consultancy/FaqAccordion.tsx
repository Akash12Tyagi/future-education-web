"use client";

import { useState } from "react";
import { faqData } from "@/data/faq";

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {faqData.map((f, i) => {
        const open = openIdx === i;
        return (
          <div
            key={f.q}
            className="overflow-hidden rounded-xl border transition-colors duration-300"
            style={{ borderColor: open ? "var(--color-primary-600)" : "#E5E7EB" }}
          >
            <button
              onClick={() => setOpenIdx((prev) => (prev === i ? null : i))}
              className="flex w-full cursor-pointer items-center justify-between gap-3 border-none bg-white px-5 py-4.5 text-left text-base font-bold text-neutral-900"
            >
              {f.q}
              <span
                className="flex-none text-xl text-[#1F7A42] transition-transform duration-300"
                style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-[15px] leading-relaxed text-[#4B5563]">{f.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
