"use client";

import Link from "next/link";
import { stories } from "@/data/stories";
import { colleges } from "@/data/colleges";
import { initials } from "@/lib/format";
import { useReveal, revealStyle } from "@/hooks/useReveal";

export function HomeSuccessStories() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const featured = stories.slice(0, 3);

  return (
    <section className="bg-primary-100">
      <div className="mx-auto max-w-[1220px] px-[22px] py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-1.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">
              Students we&apos;ve counselled
            </h2>
            <p className="m-0 text-neutral-500">Real journeys, real colleges — guided from first call to enrolment.</p>
          </div>
          <Link href="/success-stories" className="font-bold whitespace-nowrap text-accent-500 no-underline">
            All success stories →
          </Link>
        </div>
        <div ref={ref} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((st, i) => {
            const college = colleges.find((c) => c.name === st.college);
            const location = college ? `${college.city}, ${college.state}` : undefined;
            return (
              <div
                key={st.id}
                className="group fe-card-hover flex h-full flex-col gap-5 rounded-[20px] border border-white bg-white p-7.5 shadow-[0_10px_28px_rgba(15,61,38,.07)]"
                style={revealStyle(revealed, { delay: i * 80 })}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-primary-900 text-xl font-bold text-highlight-500 transition-transform duration-300 group-hover:scale-105">
                    {initials(st.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[16.5px] font-bold text-neutral-900">{st.name}</div>
                    <div className="text-[13px] font-semibold text-accent-500">{st.course}</div>
                    {location && <div className="mt-0.5 text-[12.5px] text-neutral-500">{location}</div>}
                  </div>
                </div>
                <p className="m-0 flex-1 text-[15px] leading-relaxed text-[#374151]">&quot;{st.quote}&quot;</p>
                <div className="flex items-center justify-between gap-2 border-t border-[#EFEFEA] pt-4">
                  <div>
                    <div className="text-[13px] font-bold text-primary-900">{st.college}</div>
                    {st.verified && (
                      <span className="mt-1 inline-block rounded-md bg-success-100 px-2 py-1 text-[11px] font-bold text-success-500">
                        ✓ Counselled by Future Education · {st.year}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/success-stories/${st.slug}`}
                    className="flex-none text-[13px] font-bold whitespace-nowrap text-accent-500 no-underline"
                  >
                    Read story →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
