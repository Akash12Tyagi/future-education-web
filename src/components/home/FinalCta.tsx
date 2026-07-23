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
    <section className="bg-primary-900">
      <div
        className="mx-auto grid max-w-[1220px] items-center gap-10 px-[22px] py-14"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        <div className="text-[#E5F3EA]">
          <h2 className="mb-3.5 text-[clamp(24px,3vw,34px)] font-extrabold text-white">
            Talk to a counsellor — free, no obligation
          </h2>
          <p className="mb-5 max-w-[48ch] text-[17px] text-[#B9D6C4]">
            Share three details. A real counsellor calls you within 24 hours to walk through eligibility, colleges
            and fees for your course.
          </p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-[#E5F3EA]">
            {points.map((p) => (
              <li key={p}>✓ {p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[18px] bg-white p-6.5">
          <div className="mb-4 text-lg font-extrabold text-primary-900">Get a free callback</div>
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
