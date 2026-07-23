"use client";

import { useAppState } from "@/context/app-state";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { useEscapeToClose } from "@/hooks/useEscapeToClose";

export function CallbackSheet() {
  const { sheetOpen, closeSheet, recordLead, courseOptions } = useAppState();
  useEscapeToClose(sheetOpen, closeSheet);
  if (!sheetOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(15,23,31,.55)]"
      onClick={closeSheet}
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-sheet-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-[460px] overflow-y-auto rounded-t-[18px] bg-white p-6"
        style={{ animation: "fe-fade .25s ease" }}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <span id="callback-sheet-title" className="text-lg font-extrabold text-primary-900">
            Request a callback
          </span>
          <button onClick={closeSheet} aria-label="Close" className="border-none bg-none text-[26px] leading-none text-neutral-500">
            ×
          </button>
        </div>
        <p className="mb-4.5 text-sm text-neutral-500">
          A counsellor calls you within 24 hours. We&apos;re open daily, 10 AM – 8 PM (Sundays by appointment).
        </p>
        <LeadForm
          variant="micro"
          sourceTag="sticky_callback"
          submitLabel="Request callback"
          onSubmitLead={recordLead}
          courseOptions={courseOptions}
        />
      </div>
    </div>
  );
}
