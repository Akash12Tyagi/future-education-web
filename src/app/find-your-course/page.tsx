import { Suspense } from "react";
import { FindYourCourseClient } from "@/components/find-course/FindYourCourseClient";

export default function FindYourCoursePage() {
  return (
    <Suspense fallback={null}>
      <FindYourCourseClient />
    </Suspense>
  );
}
