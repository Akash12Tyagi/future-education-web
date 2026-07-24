"use client";

import { statTargets } from "@/data/outcomes";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { fmtNum } from "@/lib/format";

export function TrustStatsBar() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const progress = useCountUp(revealed);

  return (
    <section className="bg-primary-900">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1220px] gap-5 px-[22px] py-[30px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
      >
        {statTargets.map((s, i) => (
          <div key={s.label} className="text-center text-[#eaf0ff]" style={revealStyle(revealed, { delay: i * 80, dist: 14 })}>
            <div className="inline-block border-b-[3px] border-highlight-500 pb-1.5 text-[clamp(28px,3.6vw,38px)] leading-none font-extrabold text-white">
              {fmtNum(Math.round(s.value * progress))}
              {s.suffix}
            </div>
            <div className="mt-3 text-[13.5px] text-[#c7d2fe]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
