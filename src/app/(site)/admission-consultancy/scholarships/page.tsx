import { ScholarshipsClient } from "@/components/consultancy/ScholarshipsClient";
import { getCourses, getCourseOptions, getScholarships } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/admission-consultancy/scholarships",
    title: "Scholarships & Loan Guidance",
    description: "Check which scholarship and education-loan schemes you may qualify for based on your course and family income.",
  });
}

export default async function ScholarshipsPage() {
  const [courses, courseOptions, scholarships] = await Promise.all([
    getCourses(),
    getCourseOptions(),
    getScholarships(),
  ]);

  return <ScholarshipsClient courses={courses} courseOptions={courseOptions} scholarships={scholarships} />;
}
