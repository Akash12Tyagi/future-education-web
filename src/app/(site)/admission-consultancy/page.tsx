"use client";

import Link from "next/link";
import { processFull, includedItems } from "@/data/faq";
import { counsellors } from "@/data/counsellors";
import { courseOptions } from "@/data/courses";
import { initials } from "@/lib/format";
import { useAppState } from "@/context/app-state";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { FaqAccordion } from "@/components/consultancy/FaqAccordion";

export default function AdmissionConsultancyPage() {
  const { recordLead } = useAppState();
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div>
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-[1080px] px-[22px] py-11">
          <h1 className="mb-3 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">
            Here&apos;s exactly what our consultancy includes
          </h1>
          <p className="m-0 max-w-[66ch] text-[17px] text-[#4B5563]">
            We&apos;re not &quot;just an agency&quot;. This is the concrete, itemised support you get — free for
            students, funded by partner institutes on a successful admission.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-[22px] py-12">
        <h2 className="mb-6 text-2xl font-extrabold text-primary-900">How it works</h2>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
          {processFull.map((p) => (
            <div key={p.n} className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
              <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary-900 font-extrabold text-highlight-500">
                {p.n}
              </div>
              <div className="mb-1.5 text-base font-bold text-neutral-900">{p.label}</div>
              <div className="text-[13.5px] leading-relaxed text-neutral-500">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-primary-100">
        <div className="mx-auto max-w-[1080px] px-[22px] py-12">
          <h2 className="mb-5 text-2xl font-extrabold text-primary-900">What&apos;s included</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {includedItems.map((it) => (
              <div key={it} className="flex items-center gap-2.5 rounded-[11px] bg-white p-4">
                <span className="font-bold text-success-500">✓</span>
                <span className="text-[15px] text-neutral-900">{it}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-[22px] py-12">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary-900 p-7.5">
          <div className="text-[#E5F3EA]">
            <div className="mb-2 text-xl font-extrabold text-white">Already signed up? Track your application.</div>
            <p className="m-0 max-w-[52ch] text-[#B9D6C4]">
              See every stage — Enquiry → Shortlist → Documents → Filed → Result — with timestamps. No more
              wondering if you&apos;ve been forgotten.
            </p>
          </div>
          <Link href="/tracker" className="rounded-[10px] bg-accent-500 px-6 py-3.5 font-bold whitespace-nowrap text-white no-underline">
            Open Application Tracker →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-[22px] pb-12">
        <h2 className="mb-5 text-2xl font-extrabold text-primary-900">Our counsellors &amp; their specialisations</h2>
        <div ref={ref} className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          {counsellors.map((m, i) => (
            <div
              key={m.id}
              className="fe-card-hover rounded-[14px] border border-[#E5E7EB] bg-white p-5"
              style={revealStyle(revealed, { delay: i * 70 })}
            >
              <div className="mb-3 flex h-13 w-13 items-center justify-center rounded-full bg-primary-900 text-base font-bold text-highlight-500">
                {initials(m.name)}
              </div>
              <div className="font-bold text-neutral-900">{m.name}</div>
              <div className="my-0.5 text-[13px] font-semibold text-accent-500">{m.specialization}</div>
              <div className="text-[13px] leading-relaxed text-neutral-500">{m.credentials}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-[820px] px-[22px] py-12">
          <h2 className="mb-5 text-2xl font-extrabold text-primary-900">Honest answers to fair questions</h2>
          <FaqAccordion />
        </div>
      </section>

      <section className="mx-auto max-w-[820px] px-[22px] pt-2.5 pb-[70px]">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
          <h2 className="mb-1.5 text-[22px] font-extrabold text-primary-900">Book a free consultation</h2>
          <p className="m-0 mb-4.5 text-sm text-neutral-500">
            Tell us a little more and a counsellor will call you within 24 hours.
          </p>
          <LeadForm
            variant="full"
            sourceTag="consultancy_booking"
            submitLabel="Book my consultation"
            onSubmitLead={recordLead}
            courseOptions={courseOptions}
          />
        </div>
      </section>
    </div>
  );
}
