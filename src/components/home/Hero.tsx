"use client";

import { useAppState } from "@/context/app-state";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { courseOptions } from "@/data/courses";
import { waHref } from "@/lib/whatsapp";
import { useIsMobile } from "@/hooks/useMediaQuery";

const heroStats = [
  { value: "11,690+", label: "Students counselled" },
  { value: "5,000+", label: "Institute tie-ups" },
  { value: "15 yrs", label: "On the ground" },
];

export function Hero() {
  const { recordLead } = useAppState();
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6]">
      <div
        className={
          isMobile
            ? "relative mx-auto flex max-w-[1220px] flex-col gap-7 px-[22px] pt-11 pb-10"
            : "relative mx-auto flex max-w-[1260px] flex-row items-start justify-between gap-12 px-[22px] pt-[90px] pb-20"
        }
      >
        <div className={isMobile ? "max-w-full" : "max-w-[560px] flex-1 pt-1.5"} style={!isMobile ? { flex: "1 1 480px" } : undefined}>
          <div
            className="mb-5.5 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-[13px] font-bold text-primary-900"
            style={{ animation: "feRise .6s cubic-bezier(.16,1,.3,1) both" }}
          >
            <span aria-hidden>🛡</span>
            <span>Registered Trust · 15+ Years</span>
          </div>
          <h1
            className="mb-5 text-[clamp(30px,4.4vw,50px)] leading-[1.12] font-extrabold text-primary-900"
            style={{ animation: "feRise .7s cubic-bezier(.16,1,.3,1) 80ms both" }}
          >
            The admission decision is huge.
            <br />
            Your guidance shouldn&rsquo;t
            <br />
            <span className="relative inline-block whitespace-nowrap">
              be a guess.
              <span className="absolute right-0 bottom-[2px] left-0 -z-10 h-[9px] bg-highlight-500" />
            </span>
          </h1>
          <p
            className="mb-7 max-w-[52ch] text-[17px] leading-relaxed text-[#4B5563]"
            style={{ animation: "feRise .7s cubic-bezier(.16,1,.3,1) 160ms both" }}
          >
            Honest, transparent admission counselling for MBBS, BDS, Engineering, Nursing and more. We show you every
            option, every fee, every seat — not just the ones that pay commission.
          </p>
          <div
            className="mb-7 flex flex-wrap gap-3.5"
            style={{ animation: "feRise .7s cubic-bezier(.16,1,.3,1) 240ms both" }}
          >
            <MagneticLink
              href="/find-your-course/matcher"
              className="inline-flex items-center gap-2.5 rounded-[11px] bg-accent-500 px-[22px] py-[15px] text-base font-bold text-white no-underline"
            >
              <span aria-hidden>✨</span>
              <span>Find My Course</span>
              <span className="rounded-full bg-white/20 px-2 py-[3px] text-[11px] font-extrabold tracking-[.03em]">60 SEC</span>
            </MagneticLink>
            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[11px] border-[1.5px] border-[#D1D5DB] bg-white px-[22px] py-3.5 text-base font-bold text-primary-900 no-underline"
            >
              <span aria-hidden>💬</span>
              <span>Talk on WhatsApp</span>
            </a>
          </div>
          <div className="mb-6 h-px bg-[#E5E7EB]" />
          <div
            className="flex flex-wrap gap-9"
            style={{ animation: "feRise .7s cubic-bezier(.16,1,.3,1) 320ms both" }}
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <div className="inline-block border-b-4 border-highlight-500 pb-1.5 text-[26px] leading-none font-extrabold text-primary-900">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={isMobile ? "w-full" : "w-full max-w-[460px]"} style={!isMobile ? { flex: "1 1 400px" } : undefined}>
          <div className="rounded-[20px] border border-[#EFEFEA] bg-white p-9 shadow-[0_20px_50px_rgba(15,61,38,.10)]">
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[21px] font-extrabold text-primary-900">Talk to a counsellor</div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6EE] px-3 py-1.5 text-[12.5px] font-bold text-[#1F7A42]">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-[#1F7A42]" />
                Online now
              </div>
            </div>
            <p className="mb-5.5 text-[13.5px] text-neutral-500">Free 15-minute call. No spam, no fees.</p>
            <LeadForm
              variant="micro"
              showClassField
              nameLabel="Student name"
              namePlaceholder="e.g. student's full name"
              sourceTag="home_hero"
              submitLabel="Request Free Counselling"
              onSubmitLead={recordLead}
              courseOptions={courseOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
