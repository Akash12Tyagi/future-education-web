import Link from "next/link";
import { getRecruiters, getStories } from "@/lib/site-data";
import { initials } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/placements",
    title: "Placements & Recruiters",
    description: "Recruiting partners and verified student outcomes from students counselled by Future Education Trust.",
  });
}

export default async function PlacementsPage() {
  const [recruiters, stories] = await Promise.all([getRecruiters(), getStories()]);
  const verifiedCount = stories.filter((s) => s.verified).length;
  const featured = stories.slice(0, 3);

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Placements &amp; recruiters</h1>
      <p className="m-0 mb-8 max-w-[64ch] text-[17px] text-[#4B5563]">
        Where our students land — recruiting partners and verified outcomes from students we&apos;ve counselled.
      </p>

      <div
        className="mb-9 grid overflow-hidden rounded-2xl border border-[#E5E7EB]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        <div className="border-r border-[#E5E7EB] px-6 py-5">
          <div className="text-[clamp(28px,3.6vw,38px)] leading-none font-extrabold text-accent-500">{recruiters.length}+</div>
          <div className="mt-2 text-[13px] text-neutral-500">Recruiting &amp; hiring partners</div>
        </div>
        <div className="px-6 py-5">
          <div className="text-[clamp(28px,3.6vw,38px)] leading-none font-extrabold text-primary-900">{verifiedCount}+</div>
          <div className="mt-2 text-[13px] text-neutral-500">Verified student outcomes</div>
        </div>
      </div>

      {recruiters.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-extrabold text-primary-900">Our recruiting partners</h2>
          <div className="overflow-hidden">
            <div className="fe-marquee-track flex w-max gap-4">
              {[...recruiters, ...recruiters].map((r, i) => (
                <div
                  key={`${r.id}-${i}`}
                  className="flex h-16 w-36 flex-none items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.logoUrl} alt={r.name} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 className="m-0 text-xl font-extrabold text-primary-900">Recent success stories</h2>
        <Link href="/success-stories" className="font-bold text-accent-500 no-underline">
          All success stories →
        </Link>
      </div>
      <div className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {featured.map((st) => (
          <div key={st.id} className="fe-card-hover flex flex-col gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-900 text-sm font-bold text-highlight-500">
                {initials(st.name)}
              </span>
              <div>
                <div className="font-bold text-neutral-900">{st.name}</div>
                <div className="text-[12.5px] text-neutral-500">
                  {st.course} · {st.college}
                </div>
              </div>
            </div>
            <p className="m-0 text-sm leading-snug text-[#374151]">&quot;{st.quote}&quot;</p>
            <Link href={`/success-stories/${st.slug}`} className="text-[13px] font-bold text-accent-500 no-underline">
              Read full story →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-primary-100 p-5.5">
        <span className="text-base font-semibold text-primary-900">Curious where your course could take you?</span>
        <Link href="/contact" className="rounded-lg bg-primary-900 px-5 py-3 font-bold text-white no-underline">
          Talk to a counsellor →
        </Link>
      </div>
    </div>
  );
}
