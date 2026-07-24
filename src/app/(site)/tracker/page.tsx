"use client";

import Link from "next/link";
import { useAppState } from "@/context/app-state";
import { trackerStages } from "@/data/tracker";

export default function TrackerPage() {
  const { auth, setAuthPhone, setAuthOtp, requestOtp, verifyOtp, logout, demoStage } = useAppState();

  if (auth.phase !== "in") {
    return (
      <div className="mx-auto max-w-[440px] px-[22px] pt-14 pb-[90px]">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7.5">
          <h1 className="mb-1.5 text-2xl font-extrabold text-primary-900">Application Tracker</h1>
          <p className="m-0 mb-6 text-[14.5px] text-neutral-500">
            Log in with the phone number you gave your counsellor.
          </p>

          {auth.phase === "phone" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                requestOtp();
              }}
              className="flex flex-col gap-3.5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[13.5px] font-bold text-[#374151]">Mobile number</label>
                <div className="flex overflow-hidden rounded-[10px] border-[1.5px] border-[#D1D5DB]">
                  <span className="border-r border-[#E5E7EB] bg-neutral-100 px-3 py-3 text-neutral-500">+91</span>
                  <input
                    value={auth.phone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    className="flex-1 border-none px-3.5 py-3 text-base outline-none"
                  />
                </div>
              </div>
              {auth.error && <div className="text-[13px] text-accent-500">{auth.error}</div>}
              <button type="submit" className="cursor-pointer rounded-[10px] border-none bg-accent-500 py-3.5 text-base font-bold text-white">
                Send OTP
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyOtp();
              }}
              className="flex flex-col gap-3.5"
            >
              <div className="rounded-lg bg-success-100 px-3 py-2.5 text-[13.5px] text-success-500">
                OTP sent to +91 {auth.phone}. <strong>Demo: enter any 4 digits.</strong>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13.5px] font-bold text-[#374151]">Enter OTP</label>
                <input
                  value={auth.otp}
                  onChange={(e) => setAuthOtp(e.target.value)}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="4-digit code"
                  className="rounded-[10px] border-[1.5px] border-[#D1D5DB] px-3.5 py-3 text-center text-xl tracking-[.4em] outline-none"
                />
              </div>
              {auth.error && <div className="text-[13px] text-accent-500">{auth.error}</div>}
              <button type="submit" className="cursor-pointer rounded-[10px] border-none bg-accent-500 py-3.5 text-base font-bold text-white">
                Verify &amp; log in
              </button>
            </form>
          )}
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

  const stages = trackerStages.map((st, i) => ({ ...st, done: i < demoStage, current: i === demoStage }));
  const stageLabel = trackerStages[Math.min(demoStage, trackerStages.length - 1)].label;
  const docsVisible = demoStage >= 2;

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-10 pb-[90px]">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="m-0 text-[clamp(24px,3vw,32px)] font-extrabold text-primary-900">Your application</h1>
        <button
          onClick={logout}
          className="cursor-pointer rounded-lg border-[1.5px] border-[#D1D5DB] bg-transparent px-4 py-2 font-semibold text-neutral-500"
        >
          Log out
        </button>
      </div>
      <div className="mb-6.5 text-[15px] text-neutral-500">
        Current stage: <strong className="text-success-500">{stageLabel}</strong>
      </div>

      <div className="mb-5.5 rounded-2xl border border-[#E5E7EB] bg-white p-6.5">
        {stages.map((st, i) => (
          <div key={st.key} className="flex gap-4 items-start pb-5.5">
            <div className="flex flex-col items-center self-stretch">
              <div
                className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: st.done || st.current ? "var(--color-success-500)" : "#E5E7EB",
                  color: st.done || st.current ? "#fff" : "#9CA3AF",
                }}
              >
                {st.done && "✓"}
                {st.current && "●"}
              </div>
              {i < stages.length - 1 && <div className="w-0.5 flex-1 bg-[#E5E7EB]" style={{ minHeight: 14 }} />}
            </div>
            <div className="pt-1.5">
              <div className="text-base font-bold text-neutral-900">{st.label}</div>
              <div className="text-[13px] text-[#9CA3AF]">{st.ts}</div>
            </div>
          </div>
        ))}
      </div>

      {docsVisible && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5.5">
          <h2 className="mb-3.5 text-lg font-extrabold text-primary-900">Documents</h2>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between rounded-[10px] bg-neutral-100 px-3.5 py-3">
              <span className="text-sm">12th_marksheet.pdf</span>
              <span className="rounded-md bg-success-100 px-2.5 py-1 text-xs font-bold text-success-500">Received</span>
            </div>
            <div className="flex items-center justify-between rounded-[10px] bg-neutral-100 px-3.5 py-3">
              <span className="text-sm">neet_scorecard.pdf</span>
              <span className="rounded-md bg-success-100 px-2.5 py-1 text-xs font-bold text-success-500">Received</span>
            </div>
            <div className="flex items-center justify-between rounded-[10px] border border-dashed border-[#D1D5DB] bg-neutral-100 px-3.5 py-3">
              <span className="text-sm text-neutral-500">category_certificate.pdf</span>
              <span className="rounded-md bg-[#FEF3C7] px-2.5 py-1 text-xs font-bold text-[#B45309]">Pending</span>
            </div>
            <button className="mt-1.5 cursor-pointer self-start rounded-lg border-[1.5px] border-[#3d6ce7] bg-white px-4.5 py-2.5 font-bold text-[#3d6ce7]">
              Upload a document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
