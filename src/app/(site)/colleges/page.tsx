import { Suspense } from "react";
import { CollegesDirectoryClient } from "@/components/colleges/CollegesDirectoryClient";
import { getColleges, getCourses } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/colleges",
    title: "Colleges & Universities",
    description: "Browse 5,000+ partner colleges and universities — filter by course, city, budget, and compare institutes side by side.",
  });
}

export default async function CollegesPage() {
  const [colleges, courses] = await Promise.all([getColleges(), getCourses()]);

  return (
    <Suspense fallback={null}>
      <CollegesDirectoryClient colleges={colleges} courses={courses} />
    </Suspense>
  );
}
