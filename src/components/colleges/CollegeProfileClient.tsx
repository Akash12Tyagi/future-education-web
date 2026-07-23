"use client";

import Link from "next/link";
import Image from "next/image";
import type { College, Course } from "@/lib/types";
import { feeRange, typeLabel } from "@/lib/format";
import { CompareButton } from "@/components/ui/CompareButton";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { useAppState } from "@/context/app-state";

export function CollegeProfileClient({ college, profileCourses }: { college: College; profileCourses: Course[] }) {
  const { recordLead, courseOptions } = useAppState();

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-7.5 pb-[90px]">
      <Link href="/colleges" className="text-sm text-neutral-500 no-underline">
        ← Back to directory
      </Link>
      <div className="my-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="m-0 text-[clamp(24px,3vw,34px)] font-extrabold text-primary-900">{college.name}</h1>
            {college.isVerifiedPartner && (
              <span className="rounded-[7px] bg-success-100 px-2.5 py-1.5 text-xs font-bold text-success-500">
                ✓ Verified Partner
              </span>
            )}
          </div>
          <div className="text-[15px] text-neutral-500">
            {college.city}, {college.state} · {typeLabel(college.type)} · Fees {feeRange(college.feeMin, college.feeMax)}
          </div>
        </div>
        <CompareButton collegeId={college.id} />
      </div>

      <div className="relative mb-6.5 overflow-hidden rounded-2xl" style={{ aspectRatio: "21/9" }}>
        <Image src={college.image} alt={college.imageAlt} fill sizes="(max-width: 1080px) 100vw, 1080px" className="object-cover" priority />
      </div>

      <div className="grid gap-6.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div>
          <h2 className="mb-3.5 text-xl font-extrabold text-primary-900">Accreditation</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {college.acc.map((a) => (
              <span key={a} className="rounded-lg bg-primary-100 px-3 py-1.5 text-[13px] font-semibold text-[#1F7A42]">
                {a}
              </span>
            ))}
          </div>
          {college.website && (
            <div className="mb-6.5 text-[13.5px] text-neutral-500">
              Official website: <strong className="text-[#1F7A42]">{college.website}</strong>
            </div>
          )}
          <h2 className="mb-3.5 text-xl font-extrabold text-primary-900">Courses offered</h2>
          <div className="flex flex-col gap-2.5">
            {profileCourses.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 rounded-[11px] border border-[#E5E7EB] bg-white p-3.5">
                <div>
                  <div className="font-bold text-neutral-900">{c.name}</div>
                  <div className="text-[13px] text-neutral-500">
                    {c.duration} · {c.streamLabel}
                  </div>
                </div>
                <div className="text-[13.5px] font-bold whitespace-nowrap text-primary-900">{feeRange(c.feeMin, c.feeMax)}</div>
              </div>
            ))}
          </div>

          {college.labsAndAchievements && (
            <>
              <h2 className="mt-6.5 mb-3.5 text-xl font-extrabold text-primary-900">Labs &amp; achievements</h2>
              <p className="m-0 text-[15px] leading-relaxed text-[#374151]">{college.labsAndAchievements}</p>
            </>
          )}
        </div>
        <div>
          <div className="sticky top-[90px] rounded-[14px] border border-[#E5E7EB] bg-white p-5.5">
            <div className="mb-1.5 text-lg font-extrabold text-primary-900">Enquire about this college</div>
            <p className="m-0 mb-4 text-[13.5px] text-neutral-500">
              A counsellor will call within 24 hours with eligibility and next steps.
            </p>
            <LeadForm
              variant="micro"
              sourceTag="college_enquiry"
              submitLabel="Request a callback"
              onSubmitLead={recordLead}
              courseOptions={courseOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
