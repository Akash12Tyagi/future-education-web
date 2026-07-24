"use client";

import Link from "next/link";
import { dict } from "@/data/dict";
import { useAppState } from "@/context/app-state";
import { useReveal, revealStyle } from "@/hooks/useReveal";

export function ProcessStrip() {
  const { lang } = useAppState();
  const t = dict[lang];
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-[1220px] px-[22px] py-14">
      <h2 className="mb-6.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">{t.processTitle}</h2>
      <div ref={ref} className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
        {t.steps.map((label, i) => (
          <div
            key={label}
            className="fe-card-hover rounded-[14px] border border-[#E5E7EB] bg-white p-5.5"
            style={revealStyle(revealed, { delay: i * 70 })}
          >
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary-900 font-extrabold text-highlight-500">
              {i + 1}
            </div>
            <div className="text-base font-bold text-neutral-900">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5.5">
        <Link href="/admission-consultancy" className="font-bold text-[#3d6ce7] no-underline">
          See exactly what&apos;s included →
        </Link>
      </div>
    </section>
  );
}
