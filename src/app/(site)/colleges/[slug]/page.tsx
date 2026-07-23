import Link from "next/link";
import { getCollegeBySlug } from "@/lib/site-data";
import { CollegeProfileClient } from "@/components/colleges/CollegeProfileClient";
import { buildMetadata } from "@/lib/seo";
import { feeRange, typeLabel } from "@/lib/format";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getCollegeBySlug(slug);
  if (!result) return buildMetadata({ path: `/colleges/${slug}`, title: "College not found", description: "This college listing could not be found." });

  const { college } = result;
  return buildMetadata({
    path: `/colleges/${slug}`,
    title: college.name,
    description: `${college.name} — ${college.city}, ${college.state}. ${typeLabel(college.type)} institute, fees ${feeRange(college.feeMin, college.feeMax)}. Compare courses, accreditation, and apply through Future Education.`,
  });
}

export default async function CollegeProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getCollegeBySlug(slug);

  if (!result) {
    return (
      <div className="mx-auto max-w-[640px] px-[22px] py-[70px] text-center">
        <div className="mb-2.5 text-xl font-extrabold text-primary-900">College not found</div>
        <Link href="/colleges" className="rounded-[9px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
          Back to directory
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: result.college.name,
    address: { "@type": "PostalAddress", addressLocality: result.college.city, addressRegion: result.college.state, addressCountry: "IN" },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CollegeProfileClient college={result.college} profileCourses={result.profileCourses} />
    </>
  );
}
