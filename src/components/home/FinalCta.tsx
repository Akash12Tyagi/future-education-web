"use client";

import { useAppState } from "@/context/app-state";
import { LeadForm } from "@/components/lead-form/LeadForm";

const points = [
  "We never charge students to guide them",
  'Honest shortlists, even if the answer is "wait a year"',
  "WhatsApp fallback if you'd rather chat now",
];

export function FinalCta() {
  const { recordLead, courseOptions } = useAppState();

  return (
    <section className="bg-[#f3f7f4]">
      <div
        className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-6 md:py-20"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        <div>
          <h2 className="m-0 mb-4 text-[clamp(28px,4vw,46px)] leading-tight font-bold tracking-tight text-primary-900">
            Talk to a counsellor — free, no obligation
          </h2>
          <p className="mb-6 max-w-[48ch] text-base leading-relaxed text-neutral-500">
            Share three details. A real counsellor calls you within 24 hours to walk through eligibility, colleges
            and fees for your course.
          </p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-neutral-900">
            {points.map((p) => (
              <li key={p}>
                <span className="text-primary-600">✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6.5">
          <div className="mb-4 text-lg font-bold text-primary-900">Get a free callback</div>
          <LeadForm
            variant="micro"
            sourceTag="home_final_cta"
            submitLabel="Get my free callback"
            onSubmitLead={recordLead}
            courseOptions={courseOptions}
          />
        </div>
      </div>
    </section>
  );
}
