"use client";

import { timelineData } from "@/data/timeline";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { AboutTabs } from "@/components/about/AboutTabs";

export function AboutStoryClient() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div className="mx-auto max-w-[920px] px-[22px] pt-10 pb-[90px]">
      <AboutTabs />
      <h1 className="mb-3.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Our story</h1>
      <p className="m-0 mb-3.5 max-w-[70ch] text-[17px] leading-relaxed text-[#374151]">
        Future Education was established in the heart of Bokaro Steel City under a registered trust, the Future
        Education Trust. Our counselling wing exists for one reason: to guide students who want to pursue higher,
        technical or professional education after Class 10, Class 12 or graduation — with the same honesty whether
        they&apos;re headed to a government college down the road or a university overseas.
      </p>
      <p className="m-0 mb-3.5 max-w-[70ch] text-[17px] leading-relaxed text-[#374151]">
        A team with 15+ years of counselling experience has grown that into a network of 5,000+ associate
        institutes, colleges and universities — built through actual campus visits, not just brochures. We maintain
        an exclusive Board of Studies input for every discipline, so the guidance reflects what colleges and
        industry currently expect, not what was true a decade ago.
      </p>
      <p className="m-0 mb-7.5 max-w-[70ch] text-[17px] leading-relaxed text-[#374151]">
        Fifteen-plus years and 11,690+ students later, the terms haven&apos;t changed: counselling is free for
        students, we&apos;re open 365 days a year (Sundays by appointment), and we still offer virtual campus tours
        for families who can&apos;t travel to see a college in person.
      </p>

      <div ref={ref} className="mb-9 flex flex-col gap-0">
        {timelineData.map((t, i) => (
          <div key={t.year} className="flex gap-4.5" style={revealStyle(revealed, { delay: i * 90 })}>
            <div className="flex flex-col items-center">
              <div className="mt-1.5 h-3.5 w-3.5 flex-none rounded-full bg-[#3d6ce7]" />
              <div className="w-0.5 flex-1 bg-[#d6def0]" style={{ minHeight: 30 }} />
            </div>
            <div className="pb-6.5">
              <div className="text-[15px] font-extrabold text-accent-500">{t.year}</div>
              <div className="text-base font-semibold text-neutral-900">{t.event}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary-100 p-6">
        <div className="mb-3 text-base font-extrabold text-primary-900">Registered &amp; accountable</div>
        <div className="grid gap-3.5 text-sm text-[#374151]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
          <div>
            <div className="text-[12.5px] text-neutral-500">Structure</div>
            <strong>Future Education Trust (registered)</strong>
          </div>
          <div>
            <div className="text-[12.5px] text-neutral-500">Head office</div>
            <strong>City Centre, Sector-4, Bokaro Steel City</strong>
          </div>
          <div>
            <div className="text-[12.5px] text-neutral-500">Counselling experience</div>
            <strong>15+ years</strong>
          </div>
          <div>
            <div className="text-[12.5px] text-neutral-500">Availability</div>
            <strong>365 days a year, by appointment on Sundays</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
