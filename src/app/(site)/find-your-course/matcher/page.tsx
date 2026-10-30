import { Suspense } from "react";
import { MatcherQuiz } from "@/components/matcher/MatcherQuiz";
import { buildMetadata } from "@/lib/seo";
import { getMatcherCategories } from "@/lib/site-data";

// Always reads live courses and colleges so admin changes show immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/find-your-course/matcher",
    title: "AI Course Matcher",
    description: "Answer 5 quick questions and get a personalised course shortlist in 60 seconds — every match explains why it fits.",
  });
}

export default async function MatcherPage() {
  const categories = await getMatcherCategories();

  return (
    <div className="mx-auto max-w-[720px] px-[22px] pt-10 pb-20">
      <Suspense fallback={null}>
        <MatcherQuiz categories={categories} />
      </Suspense>
    </div>
  );
}
