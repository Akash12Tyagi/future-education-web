"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { statTargets } from "@/data/outcomes";

const trustPoints = [
  {
    title: "Transparent Guidance",
    text: "Every fee and seat shown upfront — no commission-driven picks.",
  },
  {
    title: "15+ Years On the Ground",
    text: "Real counselling experience, not a call-centre script.",
  },
  {
    title: "5,000+ Verified Institutes",
    text: "A vetted network across India, visited in person.",
  },
];

const statLabels = [
  "Years guiding students",
  "Students placed in the right course",
  "Partner institutes, visited in person",
  "Active courses across streams",
];

const statCards = statTargets.map((s, i) => ({
  value: `${s.value.toLocaleString("en-IN")}${s.suffix}`,
  label: statLabels[i] ?? s.label,
}));

const journeyCards = [
  {
    title: "Find Your Course",
    description: "Every stream, every fee, every seat — filter the full list or let the AI matcher shortlist it for you.",
    image: "/images/campus/campus-01.jpg",
    href: "/find-your-course",
  },
  {
    title: "Explore Our Network",
    description: "5,000+ verified partner institutes across India — visited in person, not a purchased list.",
    image: "/images/campus/campus-03.jpg",
    href: "/colleges",
  },
  {
    title: "Talk to a Counsellor",
    description: "Named counsellors with real credentials — transparent guidance, zero hidden agenda.",
    image: "/images/team/counsellor-02.jpg",
    href: "/admission-consultancy",
  },
  {
    title: "Read Success Stories",
    description: "Real students, real admissions — see how others found their path with us.",
    image: "/images/events/gallery-seminar.jpg",
    href: "/success-stories",
  },
];

export function AdmissionJourney() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * railRef.current.clientWidth * 0.86, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-highlight-500/8 blur-[110px]" />
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-500/6 blur-[110px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-[1220px] px-[22px]">
        <div style={revealStyle(revealed)}>
          <div className="text-[13px] font-bold tracking-[.14em] text-highlight-500 uppercase">Discover · Decide · Enrol</div>
          <h2 className="mt-3 max-w-[720px] text-[clamp(28px,3.6vw,42px)] leading-[1.1] font-extrabold text-primary-900">
            Where Confusion Becomes a Confirmed Seat
          </h2>
          <div className="mt-2 text-xl font-bold text-highlight-500 sm:text-2xl">Real Guidance. Real Seats. Zero Guesswork.</div>
          <p className="mt-4 max-w-[620px] text-base leading-relaxed text-[#4B5563] sm:text-[17px]">
            From shortlisting the right stream to walking into your first semester, every step is guided by counsellors who
            show you every option, every fee, and every seat — not just the ones that pay commission.
          </p>
        </div>

        <div className="mt-10 text-[12px] font-bold tracking-[.12em] text-neutral-500 uppercase" style={revealStyle(revealed, { delay: 60 })}>
          Why Students Trust Us
        </div>
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3" style={revealStyle(revealed, { delay: 80 })}>
          {trustPoints.map((p) => (
            <div key={p.title} className="fe-glass-card flex h-full flex-col gap-1.5 rounded-xl p-4.5">
              <div className="text-[15px] font-bold text-primary-900">{p.title}</div>
              <div className="text-[13.5px] leading-snug text-[#4B5563]">{p.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3.5 lg:grid-cols-4" style={revealStyle(revealed, { delay: 140 })}>
          {statCards.map((s) => (
            <div
              key={s.label}
              className="flex h-full flex-col justify-center gap-1 rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-highlight-500 bg-neutral-100 px-4.5 py-4"
            >
              <div className="text-2xl font-extrabold text-highlight-500 sm:text-[28px]">{s.value}</div>
              <div className="text-[13px] leading-snug text-[#4B5563]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-end justify-between gap-4" style={revealStyle(revealed, { delay: 200 })}>
          <div>
            <div className="text-[12px] font-bold tracking-[.12em] text-neutral-500 uppercase">Explore The Journey</div>
            <h3 className="mt-1.5 text-[clamp(20px,2.2vw,26px)] font-extrabold text-primary-900">Your path, one step at a time</h3>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll to previous cards"
              onClick={() => scrollRail(-1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white text-primary-900 transition-colors hover:border-highlight-500 hover:text-highlight-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-500"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Scroll to next cards"
              onClick={() => scrollRail(1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white text-primary-900 transition-colors hover:border-highlight-500 hover:text-highlight-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-500"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-6 flex snap-x snap-mandatory gap-4.5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={revealStyle(revealed, { delay: 240 })}
        >
          {journeyCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="fe-image-zoom-wrap group relative h-[340px] w-full shrink-0 snap-start overflow-hidden rounded-2xl no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-500 sm:w-[calc(50%-9px)] lg:w-[calc(25%-13.5px)]"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 88vw"
                className="fe-image-zoom object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              <span className="absolute top-5 left-5 h-[3px] w-10 rounded-full bg-highlight-500 transition-all duration-300 group-hover:w-14" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-lg font-bold text-white">{card.title}</div>
                <p className="mt-1.5 text-[13.5px] leading-snug text-white/75">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
