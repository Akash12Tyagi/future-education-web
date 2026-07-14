"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { feeRange } from "@/lib/format";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { courseOptions } from "@/data/courses";
import { useAppState } from "@/context/app-state";
import { revealStyle } from "@/hooks/useReveal";

interface CourseCardProps {
  course: Course;
  expanded: boolean;
  onToggle: (id: string) => void;
  revealed: boolean;
  delay: number;
}

export function CourseCard({ course: c, expanded, onToggle, revealed, delay }: CourseCardProps) {
  const { recordLead } = useAppState();

  return (
    <div
      className="fe-card-hover flex flex-col gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-5.5"
      style={revealStyle(revealed, { delay })}
    >
      <div className="flex items-start justify-between gap-2.5">
        <h3 className="m-0 text-xl font-bold text-neutral-900">{c.name}</h3>
        <span className="rounded-md bg-primary-100 px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap text-[#1F7A42]">
          {c.streamLabel}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 text-sm text-[#4B5563]">
        <div>
          <span className="text-[#9CA3AF]">Duration:</span> {c.duration}
        </div>
        <div>
          <span className="text-[#9CA3AF]">Eligibility:</span> {c.eligibility}
        </div>
        <div>
          <span className="text-[#9CA3AF]">Fee range:</span>{" "}
          <strong className="text-primary-900">{feeRange(c.feeMin, c.feeMax)}</strong>
        </div>
      </div>
      <Link href={`/colleges?stream=${c.stream}`} className="text-[13.5px] font-bold text-[#1F7A42] no-underline">
        {c.collegeCount} colleges offer this →
      </Link>
      <div className="mt-0.5 flex gap-2">
        <button
          onClick={() => onToggle(c.id)}
          className="flex-1 cursor-pointer rounded-[9px] border-none bg-accent-500 py-2.5 text-sm font-bold text-white"
        >
          {expanded ? "Close" : "Enquire"}
        </button>
      </div>
      {expanded && (
        <div
          className="mt-1 flex flex-col gap-3 border-t border-[#F0F2EF] pt-3.5"
          style={{ animation: "feFadeUp .35s cubic-bezier(.16,1,.3,1)" }}
        >
          <div className="text-[13.5px] text-[#4B5563]">
            <span className="text-[#9CA3AF]">Career outcomes:</span> {c.outcomes.join(", ")}
          </div>
          <div className="text-[13px] font-bold text-primary-900">Enquire about {c.name}</div>
          <LeadForm
            variant="micro"
            sourceTag="course_enquiry"
            submitLabel="Request course guidance"
            prefillCourse={c.slug}
            onSubmitLead={recordLead}
            courseOptions={courseOptions}
          />
        </div>
      )}
    </div>
  );
}
