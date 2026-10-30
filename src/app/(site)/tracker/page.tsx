"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { lookupApplication, type TrackerLookupState } from "@/lib/tracker-actions";
import { applicationStages } from "@/data/tracker";
import { waHref } from "@/lib/whatsapp";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function TrackerPage() {
  const [state, formAction, pending] = useActionState<TrackerLookupState, FormData>(lookupApplication, {});
  const [dismissedApp, setDismissedApp] = useState<TrackerLookupState["application"]>(undefined);
  const app = state.application && state.application !== dismissedApp ? state.application : undefined;

  if (!app) {
    return (
      <div className="mx-auto max-w-[480px] px-[22px] pt-14 pb-[90px]">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7.5">
          <h1 className="mb-1.5 text-2xl font-extrabold text-primary-900">Application Tracker</h1>
          <p className="m-0 mb-5 text-[14.5px] text-neutral-500">
            Already sent us an enquiry? Check where your admission stands — enter the mobile number and the student
            name you gave on our enquiry form.
          </p>

          <form action={formAction} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tracker-phone" className="text-[13.5px] font-bold text-[#374151]">
                Mobile number
              </label>
              <div className="flex overflow-hidden rounded-[10px] border-[1.5px] border-[#D1D5DB]">
                <span className="border-r border-[#E5E7EB] bg-neutral-100 px-3 py-3 text-neutral-500">+91</span>
                <input
                  id="tracker-phone"
                  name="phone"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  placeholder="10-digit mobile"
                  className="flex-1 border-none px-3.5 py-3 text-base outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tracker-name" className="text-[13.5px] font-bold text-[#374151]">
                Student&apos;s first name
              </label>
              <input
                id="tracker-name"
                name="firstName"
                required
                placeholder="e.g. Rahul"
                className="rounded-[10px] border-[1.5px] border-[#D1D5DB] px-3.5 py-3 text-base outline-none"
              />
            </div>
            {state.error && <div className="text-[13px] text-accent-500">{state.error}</div>}
            <button
              type="submit"
              disabled={pending}
              className="cursor-pointer rounded-[10px] border-none bg-accent-500 py-3.5 text-base font-bold text-white disabled:opacity-60"
            >
              {pending ? "Checking…" : "Track my application"}
            </button>
          </form>
        </div>

        <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white p-5.5">
          <div className="mb-3 text-[15px] font-extrabold text-primary-900">How the tracker works</div>
          <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
            {applicationStages.map((st, i) => (
              <li key={st.status} className="flex gap-3 text-[13.5px] text-[#4B5563]">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-900">
                  {i + 1}
                </span>
                <span>
                  <strong className="text-neutral-900">{st.label}</strong> — {st.help}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-4 text-center text-[13px] text-[#9CA3AF]">
          Not a student yet?{" "}
          <Link href="/contact" className="font-semibold text-accent-500 no-underline">
            Start with a free enquiry →
          </Link>
        </p>
      </div>
    );
  }

  const closed = app.status === "CLOSED";
  const currentIdx = closed ? -1 : applicationStages.findIndex((s) => s.status === app.status);
  const current = applicationStages[currentIdx];

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-10 pb-[90px]">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="m-0 text-[clamp(24px,3vw,32px)] font-extrabold text-primary-900">{app.name}&apos;s application</h1>
        <button
          onClick={() => setDismissedApp(app)}
          className="cursor-pointer rounded-lg border-[1.5px] border-[#D1D5DB] bg-transparent px-4 py-2 font-semibold text-neutral-500"
        >
          Check another
        </button>
      </div>
      <div className="mb-6.5 text-[15px] text-neutral-500">
        {app.courseInterest ? <>Course: <strong className="text-neutral-900">{app.courseInterest}</strong> · </> : null}
        Enquiry received {fmtDate(app.receivedAt)} · Last updated {fmtDate(app.updatedAt)}
      </div>

      {closed ? (
        <div className="mb-5.5 rounded-2xl border border-[#E5E7EB] bg-white p-6.5 text-[15px] text-[#4B5563]">
          This enquiry has been closed. If you&apos;d still like help with admissions, message us and a counsellor will
          reopen it.
        </div>
      ) : (
        <div className="mb-5.5 rounded-2xl border border-[#E5E7EB] bg-white p-6.5">
          {applicationStages.map((st, i) => {
            const done = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <div key={st.status} className="flex items-start gap-4 pb-5.5">
                <div className="flex flex-col items-center self-stretch">
                  <div
                    className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: done || isCurrent ? "var(--color-success-500)" : "#E5E7EB",
                      color: done || isCurrent ? "#fff" : "#9CA3AF",
                    }}
                  >
                    {done ? "✓" : isCurrent ? "●" : i + 1}
                  </div>
                  {i < applicationStages.length - 1 && <div className="w-0.5 flex-1 bg-[#E5E7EB]" style={{ minHeight: 14 }} />}
                </div>
                <div className="pt-1.5">
                  <div className={`text-base font-bold ${done || isCurrent ? "text-neutral-900" : "text-[#9CA3AF]"}`}>
                    {st.label}
                    {isCurrent && (
                      <span className="ml-2 rounded-md bg-success-100 px-2 py-0.5 text-[11px] font-bold text-success-500">
                        CURRENT
                      </span>
                    )}
                  </div>
                  {isCurrent && <div className="mt-1 text-[13.5px] text-[#4B5563]">{st.help}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-primary-100 p-5.5">
        <span className="text-[15px] text-primary-900">
          {current?.status === "QUALIFIED"
            ? "Send your documents to your counsellor on WhatsApp."
            : "Questions about your application? Talk to your counsellor."}
        </span>
        <a
          href={waHref(`Hi Future Education, I'm ${app.name}. I'd like an update on my application.`)}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-accent-500 px-5 py-3 font-bold text-white no-underline"
        >
          WhatsApp us →
        </a>
      </div>
    </div>
  );
}
