"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal, revealStyle } from "@/hooks/useReveal";

const checklist = [
  "Every fee and seat shown upfront — no commission-driven picks",
  "15+ years of on-ground counselling experience",
  "5,000+ verified partner institutes across India",
];

export function AboutTeaser() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="mx-auto max-w-[1220px] px-[22px] py-16">
      <div className="flex flex-wrap items-center gap-14">
        <div className="relative min-w-[280px] flex-1" style={{ flexBasis: 460 }}>
          <div
            className="pointer-events-none absolute top-1/2 -left-10 h-[280px] w-[280px] -translate-y-1/2 rounded-full border-2 border-accent-500/30"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-[58%] left-10 h-[190px] w-[190px] -translate-y-1/2 rounded-full border-2 border-primary-600/30"
            aria-hidden
          />
          <div className="relative flex items-stretch gap-4" style={revealStyle(revealed, { dist: 16 })}>
            <div className="flex w-[42%] flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_14px_34px_rgba(27,37,89,.16)]">
                <Image
                  src="/images/office/bokaro-office.jpg"
                  alt="Future Education's Bokaro office"
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_14px_34px_rgba(27,37,89,.16)]">
                <Image
                  src="/images/team/counsellor-01.jpg"
                  alt="Anil Kumar Singh, Director, Future Education Trust"
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl shadow-[0_18px_44px_rgba(27,37,89,.2)]">
              <Image
                src="/images/campus/campus-11.jpg"
                alt="One of Future Education's 5,000+ partner campuses"
                fill
                sizes="(max-width: 768px) 55vw, 280px"
                className="object-cover"
              />
              <div
                className="absolute -top-4 -right-4 h-14 w-14 rotate-[20deg] rounded-full border-[3px] border-t-accent-500 border-r-primary-600 border-b-transparent border-l-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="min-w-[280px] flex-1" style={{ flexBasis: 480 }}>
          <div className="mb-3.5 text-[13px] font-bold tracking-[.02em] text-accent-500 uppercase">
            About Future Education
          </div>
          <h2 className="mb-5 text-[clamp(28px,3.6vw,42px)] leading-[1.15] font-extrabold text-primary-900">
            Every Option.
            <br />
            Every Fee.
            <br />
            No Hidden Agenda.
          </h2>
          <p className="mb-6.5 max-w-[52ch] text-base leading-relaxed text-[#4B5563]">
            Honest, transparent admission counselling for MBBS, BDS, Engineering, Nursing and more — backed by 15+
            years on the ground and a verified network of 5,000+ associate institutes across India.
          </p>
          <ul className="mb-7.5 flex list-none flex-col gap-3 p-0">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-success-100 text-[13px] font-bold text-success-500">
                  ✓
                </span>
                <span className="text-[15px] text-neutral-900">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="inline-block rounded-[10px] bg-primary-600 px-6.5 py-3.5 text-[15px] font-bold text-white no-underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
