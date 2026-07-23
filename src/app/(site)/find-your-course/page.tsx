import { Suspense } from "react";
import { FindYourCourseClient } from "@/components/find-course/FindYourCourseClient";
import { getCourses, getStreamsMeta } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/find-your-course",
    title: "Find Your Course",
    description: "Browse regular and distance programmes across medical, engineering, management, nursing and education streams — or take the 60-second course matcher.",
  });
}

export default async function FindYourCoursePage() {
  const [courses, streamsMeta] = await Promise.all([getCourses(), getStreamsMeta()]);

  return (
    <Suspense fallback={null}>
      <FindYourCourseClient courses={courses} streamsMeta={streamsMeta} />
    </Suspense>
  );
}
