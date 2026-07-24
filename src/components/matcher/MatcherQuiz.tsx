"use client";

import { useState } from "react";
import Link from "next/link";
import { matcherSteps } from "@/data/matcher-steps";
import { runMatcher, type MatcherAnswers } from "@/lib/matcher";
import { waHref } from "@/lib/whatsapp";

type Phase = "quiz" | "loading" | "results";

export function MatcherQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<MatcherAnswers>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [dir, setDir] = useState(1);
  const [tick, setTick] = useState(0);
  const [results, setResults] = useState<ReturnType<typeof runMatcher> | null>(null);

  const cfg = matcherSteps[step];
  const isLast = step === matcherSteps.length - 1;
  const selected = !!answers[cfg.key as keyof MatcherAnswers];

  const select = (val: string) => setAnswers((a) => ({ ...a, [cfg.key]: val }));
  const next = () => {
    setDir(1);
    setTick((t) => t + 1);
    setStep((s) => Math.min(matcherSteps.length - 1, s + 1));
  };
  const back = () => {
    setDir(-1);
    setTick((t) => t + 1);
    setStep((s) => Math.max(0, s - 1));
  };
  const restart = () => {
    setStep(0);
    setAnswers({});
    setPhase("quiz");
    setResults(null);
  };
  const submit = () => {
    setPhase("loading");
    setTimeout(() => {
      setResults(runMatcher(answers));
      setPhase("results");
    }, 1100);
  };

  if (phase === "loading") {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white px-7 py-14 text-center">
        <div
          className="mx-auto mb-5 h-11 w-11 rounded-full border-4 border-primary-100"
          style={{ borderTopColor: "#3d6ce7", animation: "fe-spin .8s linear infinite" }}
        />
        <div className="text-lg font-bold text-primary-900">Scoring your matches…</div>
        <p className="mt-2 mb-0 text-neutral-500">Weighing stream, budget, location and program type.</p>
      </div>
    );
  }

  if (phase === "results" && results) {
    return (
      <div style={{ animation: "feFadeUp .5s cubic-bezier(.16,1,.3,1)" }}>
        {results.hasStrongMatch ? (
          <>
            <div className="mb-2">
              <span className="rounded-full bg-accent-100 px-2.5 py-1.5 text-xs font-bold text-accent-500">YOUR MATCHES</span>
            </div>
            <h1 className="mb-1.5 text-[clamp(26px,3.2vw,34px)] font-extrabold text-primary-900">Here&apos;s what fits you</h1>
            <p className="mb-6 text-neutral-500">Ranked by our matcher. Each card shows exactly why.</p>
            <div className="flex flex-col gap-4">
              {results.matches.map((m, i) => (
                <div
                  key={m.rank}
                  className="fe-card-hover flex flex-wrap items-start gap-4.5 rounded-[14px] border border-[#E5E7EB] bg-white p-5.5"
                  style={{ animation: `feFadeUp .5s cubic-bezier(.16,1,.3,1) ${i * 90}ms both` }}
                >
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-primary-900 font-extrabold text-highlight-500">
                    {m.rank}
                  </div>
                  <div className="min-w-[220px] flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="m-0 text-[19px] font-bold text-neutral-900">{m.courseName}</h3>
                      <span className="rounded-md bg-accent-100 px-2 py-1 text-[11px] font-bold text-accent-500">AI Match</span>
                    </div>
                    <div className="my-1 mb-3 text-sm text-neutral-500">
                      {m.collegeName} {m.city && <>· {m.city}</>} · {m.feeRange}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {m.reasons.map((r) => (
                        <div key={r} className="flex items-start gap-2 text-[13.5px] text-success-500">
                          <span>✓</span>
                          <span className="text-[#374151]">{r}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      <Link
                        href="/find-your-course"
                        className="rounded-[9px] border-[1.5px] border-[#3d6ce7] px-3.5 py-2 text-[13.5px] font-semibold text-[#3d6ce7] no-underline"
                      >
                        View course
                      </Link>
                      <a
                        href={waHref()}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-[9px] bg-accent-500 px-3.5 py-2.5 text-[13.5px] font-bold text-white no-underline"
                      >
                        Talk to a counsellor
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-9 text-center">
            <div className="mb-2 text-xl font-extrabold text-primary-900">No single strong match — but you&apos;re not stuck</div>
            <p className="mx-auto mb-5 max-w-[52ch] text-neutral-500">
              Your answers span a few directions. Browse the full course list, or let a counsellor talk it through with you.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <Link
                href="/find-your-course"
                className="rounded-[9px] border-[1.5px] border-[#3d6ce7] px-5 py-3 font-bold text-[#3d6ce7] no-underline"
              >
                Browse all courses
              </Link>
              <a href={waHref()} target="_blank" rel="noreferrer" className="rounded-[9px] bg-accent-500 px-5 py-3 font-bold text-white no-underline">
                Talk to a counsellor
              </a>
            </div>
          </div>
        )}
        <div className="mt-6 text-center">
          <button onClick={restart} className="cursor-pointer border-none bg-none font-semibold text-neutral-500 underline">
            ↺ Restart the matcher
          </button>
        </div>
      </div>
    );
  }

  const progressPct = ((step + 1) / matcherSteps.length) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-[clamp(22px,4vw,36px)]">
      <div key={tick} style={{ animation: `${dir >= 0 ? "feSlideInFromRight" : "feSlideInFromLeft"} ${380 + (tick % 2)}ms cubic-bezier(.16,1,.3,1)` }}>
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[13px] font-bold text-accent-500">
            {isLast ? "1 step left" : `Step ${step + 1} of ${matcherSteps.length}`}
          </span>
          <Link href="/find-your-course" className="text-[13px] text-neutral-500 no-underline">
            Skip to browse
          </Link>
        </div>
        <div className="mb-6.5 h-1.5 overflow-hidden rounded-full bg-[#eef1f7]">
          <div
            className="h-full rounded-full bg-primary-600 transition-[width] duration-400"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <h2 className="mb-5.5 text-[clamp(22px,2.8vw,28px)] font-extrabold text-primary-900">{cfg.q}</h2>
        <div className="flex flex-col gap-3">
          {cfg.opts.map(([val, label]) => {
            const active = answers[cfg.key as keyof MatcherAnswers] === val;
            return (
              <button
                key={val}
                onClick={() => select(val)}
                className="flex w-full items-center gap-3 rounded-xl border-[1.5px] px-4.5 py-4 text-left text-[15.5px] font-semibold text-neutral-900 transition-[border-color,background-color,transform]"
                style={{
                  borderColor: active ? "var(--color-accent-500)" : "#E5E7EB",
                  background: active ? "var(--color-accent-100)" : "#fff",
                }}
              >
                <span
                  className="h-4.5 w-4.5 flex-none rounded-full border-2"
                  style={{
                    borderColor: active ? "var(--color-accent-500)" : "#CBD5E1",
                    background: active ? "var(--color-accent-500)" : "#fff",
                  }}
                />
                {label}
              </button>
            );
          })}
        </div>
        <div className="mt-7 flex justify-between gap-3">
          {step > 0 ? (
            <button
              onClick={back}
              className="cursor-pointer rounded-[10px] border-[1.5px] border-[#D1D5DB] bg-white px-5.5 py-3 font-bold text-[#4B5563]"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex-1" />
          {isLast ? (
            <button
              onClick={submit}
              disabled={!selected}
              className="rounded-[10px] border-none px-6 py-3 text-[15px] font-bold text-white"
              style={{ background: selected ? "var(--color-accent-500)" : "#dad4fa", cursor: selected ? "pointer" : "not-allowed" }}
            >
              See my matches →
            </button>
          ) : (
            <button
              onClick={next}
              disabled={!selected}
              className="rounded-[10px] border-none px-6 py-3 text-[15px] font-bold text-white"
              style={{ background: selected ? "var(--color-accent-500)" : "#dad4fa", cursor: selected ? "pointer" : "not-allowed" }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
