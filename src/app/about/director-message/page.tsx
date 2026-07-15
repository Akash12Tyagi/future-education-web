import Link from "next/link";
import Image from "next/image";
import { AboutTabs } from "@/components/about/AboutTabs";
import { counsellors } from "@/data/counsellors";

export default function DirectorMessagePage() {
  const director = counsellors[0];

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-10 pb-[90px]">
      <AboutTabs />
      <div className="mb-6.5 flex flex-wrap items-center gap-5">
        <div className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl">
          <Image src={director.image} alt={director.imageAlt} fill sizes="96px" className="object-cover" />
        </div>
        <div>
          <h1 className="m-0 text-[clamp(24px,3vw,32px)] font-extrabold text-primary-900">
            A message from our directors
          </h1>
          <div className="text-[15px] text-neutral-500">
            Anil Kumar Singh &amp; Karim Ansari · Directors, Future Education Trust
          </div>
        </div>
      </div>
      <div className="mb-5 max-w-[68ch] rounded-2xl border border-[#E5E7EB] bg-white p-7.5 text-[17px] leading-relaxed text-[#374151]">
        <p className="m-0 mb-4">
          Every member of our team has substantial, practical experience in their field, and between us, that
          experience is as broad as it is deep. We make certain that every student we work with receives a
          personal, tailored service — we don&apos;t take on more assignments than our counsellors can give proper
          attention to, and we don&apos;t believe in a one-size-fits-all approach.
        </p>
        <p className="m-0">— Anil Kumar Singh, Director</p>
      </div>
      <div className="max-w-[68ch] rounded-2xl border border-[#E5E7EB] bg-white p-7.5 text-[17px] leading-relaxed text-[#374151]">
        <p className="m-0 mb-4">
          Future Education is not just an institute pointing you toward a prospective career — it&apos;s a place to
          nurture your talents and help you reach your potential. We assist students applying both in India and
          abroad, across the UK, USA, Canada, Australia, Ireland and New Zealand, and we support you at every step,
          from your first visit to our office until you reach your destination.
        </p>
        <p className="m-0">— Karim Ansari, Director</p>
      </div>
      <Link href="/contact" className="mt-5.5 inline-block rounded-[10px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
        Talk to a counsellor
      </Link>
    </div>
  );
}
