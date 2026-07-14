"use client";

import Link from "next/link";
import { stories } from "@/data/stories";
import { initials } from "@/lib/format";
import { useReveal, revealStyle } from "@/hooks/useReveal";

export function HomeSuccessStories() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const featured = stories.slice(0, 3);

  return (
    <section className="bg-primary-100">
      <div className="mx-auto max-w-[1220px] px-[22px] py-14">
        <div className="mb-6.5 flex flex-wrap items-end justify-between gap-4">
          <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">Students we&apos;ve counselled</h2>
          <Link href="/success-stories" className="font-bold whitespace-nowrap text-accent-500 no-underline">
            All success stories →
          </Link>
        </div>
        <div ref={ref} className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {featured.map((st, i) => (
            <div
              key={st.id}
              className="fe-card-hover flex flex-col gap-3 rounded-[14px] bg-white p-5.5"
              style={revealStyle(revealed, { delay: i * 80 })}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary-900 text-base font-bold text-highlight-500">
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
              {st.verified && (
                <span className="self-start rounded-md bg-success-100 px-2 py-1 text-[11px] font-bold text-success-500">
                  ✓ Counselled by Future Education · {st.year}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
