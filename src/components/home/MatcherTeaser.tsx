import Link from "next/link";

const previewQuestions = [
  "Which stream interests you?",
  "What's your budget range?",
  "Preferred location & program type?",
];

export function MatcherTeaser() {
  return (
    <section className="mx-auto max-w-[1220px] px-[22px] py-14">
      <div className="flex flex-wrap items-center gap-9 rounded-[18px] border border-[#E5E7EB] bg-white p-[clamp(24px,4vw,42px)]">
        <div className="min-w-[280px] flex-1" style={{ flexBasis: 420 }}>
          <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-1.5 text-xs font-bold text-accent-500">
            FLAGSHIP · AI COURSE MATCHER
          </div>
          <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-extrabold text-primary-900">
            Answer 6 questions → get your shortlist in 60 seconds
          </h2>
          <p className="mb-5.5 max-w-[56ch] text-base text-[#4B5563]">
            Every match shows <strong>why</strong> it fits — your stream, budget and location. No black box, no
            &quot;best fit&quot; without a reason. Then compare or talk to a real counsellor.
          </p>
          <Link
            href="/find-your-course/matcher"
            className="inline-block rounded-[10px] bg-accent-500 px-5.5 py-3 text-[15px] font-bold text-white no-underline"
          >
            Start the matcher →
          </Link>
        </div>
        <div className="flex min-w-[260px] flex-1 flex-col gap-2.5" style={{ flexBasis: 300 }}>
          {previewQuestions.map((q, i) => (
            <div key={q} className="flex items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-neutral-100 p-3.5">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-primary-100 text-[13px] font-bold text-[#3d6ce7]">
                {i + 1}
              </span>
              <span className="text-sm">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
