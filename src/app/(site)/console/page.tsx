"use client";

import { useAppState } from "@/context/app-state";
import { useChatOnline } from "@/hooks/useChatOnline";
import { trackerStages } from "@/data/tracker";

export default function ConsolePage() {
  const { leads, demoStage, advanceStage, resetStage } = useAppState();
  const chatOnline = useChatOnline();

  const stageLabel = trackerStages[Math.min(demoStage, trackerStages.length - 1)].label;

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <div className="mb-3 inline-block rounded-md bg-[#FEF3C7] px-2.5 py-1.5 text-xs font-bold text-[#92400E]">
        INTERNAL TOOL · counsellor / admin only
      </div>
      <h1 className="mb-6.5 text-[clamp(26px,3.2vw,34px)] font-extrabold text-primary-900">Counsellor console</h1>

      <div className="mb-6.5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
          <div className="mb-2.5 text-[13px] font-bold text-neutral-500">LIVE CHAT AVAILABILITY</div>
          <div className="flex items-center justify-between gap-3">
            <span
              className="flex items-center gap-2 font-bold"
              style={{ color: chatOnline ? "#25D366" : "#9CA3AF" }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: chatOnline ? "#25D366" : "#9CA3AF" }} />
              {chatOnline ? "Counsellors online" : "Offline · leave a callback"}
            </span>
            {/* Intentionally a no-op: the public "online" indicator always reflects
                real staffed hours and is never faked, even from this internal tool. */}
            <button className="cursor-pointer rounded-lg border-[1.5px] border-[#3d6ce7] bg-white px-3.5 py-2 font-bold text-[#3d6ce7]">
              Toggle
            </button>
          </div>
          <p className="m-0 mt-3 text-xs text-[#9CA3AF]">
            Public &quot;online&quot; status is only shown during staffed hours — never faked.
          </p>
        </div>
        <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
          <div className="mb-2.5 text-[13px] font-bold text-neutral-500">DEMO STUDENT · TRACKER STAGE</div>
          <div className="mb-3 text-lg font-extrabold text-success-500">{stageLabel}</div>
          <div className="flex gap-2">
            <button onClick={advanceStage} className="cursor-pointer rounded-lg border-none bg-primary-900 px-4 py-2.5 font-bold text-white">
              Advance stage →
            </button>
            <button onClick={resetStage} className="cursor-pointer rounded-lg border-[1.5px] border-[#D1D5DB] bg-white px-3.5 py-2.5 font-semibold text-neutral-500">
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5.5">
        <h2 className="mb-4 text-lg font-extrabold text-primary-900">Lead queue</h2>
        {leads.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {leads.map((l) => (
              <div key={l.id} className="flex flex-wrap justify-between gap-3.5 rounded-[10px] bg-neutral-100 px-4 py-3.5">
                <div>
                  <div className="font-bold text-neutral-900">
                    {l.name} · +91 {l.phone}
                  </div>
                  <div className="text-[13px] text-neutral-500">
                    {l.courseInterest} · source: {l.sourceTag} · {l.at}
                  </div>
                </div>
                <span className="self-center rounded-md bg-[#FEF3C7] px-2.5 py-1 text-xs font-bold text-[#B45309]">
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="m-0 text-sm text-[#9CA3AF]">
            No leads yet. Submit any lead form on the public site (Home, Contact, a course enquiry) and it appears
            here in real time.
          </p>
        )}
      </div>
    </div>
  );
}
