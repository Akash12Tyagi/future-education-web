import Link from "next/link";
import Image from "next/image";
import { getCounsellorBySlug } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const counsellor = await getCounsellorBySlug(slug);
  if (!counsellor) return buildMetadata({ path: `/about/counsellors/${slug}`, title: "Counsellor not found", description: "This counsellor profile could not be found." });

  return buildMetadata({
    path: `/about/counsellors/${slug}`,
    title: counsellor.name,
    description: `${counsellor.name}, ${counsellor.role} at Future Education Trust — ${counsellor.specialization}`,
  });
}

export default async function CounsellorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const counsellor = await getCounsellorBySlug(slug);

  if (!counsellor) {
    return (
      <div className="mx-auto max-w-[640px] px-[22px] py-[70px] text-center">
        <div className="mb-2.5 text-xl font-extrabold text-primary-900">Counsellor not found</div>
        <Link href="/about/counsellors" className="rounded-[9px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
          All counsellors
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-7.5 pb-[90px]">
      <Link href="/about/counsellors" className="text-sm text-neutral-500 no-underline">
        ← All counsellors
      </Link>

      <div className="mt-4 flex flex-wrap items-start gap-6.5 rounded-2xl border border-[#E5E7EB] bg-white p-7.5">
        <div className="relative h-40 w-40 flex-none overflow-hidden rounded-2xl">
          <Image src={counsellor.image} alt={counsellor.imageAlt} fill sizes="160px" className="object-cover" />
        </div>
        <div className="min-w-[240px] flex-1">
          <h1 className="m-0 mb-1.5 text-[clamp(24px,3vw,32px)] font-extrabold text-primary-900">{counsellor.name}</h1>
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-primary-100 px-2.5 py-1 text-[12px] font-bold text-primary-900">{counsellor.role}</span>
            {counsellor.experienceYears != null && (
              <span className="text-[13.5px] text-neutral-500">{counsellor.experienceYears}+ years experience</span>
            )}
          </div>
          <div className="mb-3 text-[15px] font-semibold text-accent-500">{counsellor.specialization}</div>
          <div className="mb-4 text-[14.5px] leading-relaxed text-neutral-500">{counsellor.credentials}</div>

          {(counsellor.email || counsellor.phone) && (
            <div className="mb-4 flex flex-wrap gap-4 text-[14px] text-[#374151]">
              {counsellor.email && (
                <a href={`mailto:${counsellor.email}`} className="text-primary-600 no-underline">
                  ✉ {counsellor.email}
                </a>
              )}
              {counsellor.phone && (
                <a href={`tel:${counsellor.phone}`} className="text-primary-600 no-underline">
                  ☎ {counsellor.phone}
                </a>
              )}
            </div>
          )}

          <Link href="/contact" className="inline-block rounded-[10px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
            Book a consultation
          </Link>
        </div>
      </div>

      {counsellor.bio && (
        <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white p-7.5 text-[15px] leading-relaxed text-[#374151]">
          {counsellor.bio}
        </div>
      )}
    </div>
  );
}
