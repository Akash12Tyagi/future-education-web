import { MatcherQuiz } from "@/components/matcher/MatcherQuiz";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/find-your-course/matcher",
    title: "AI Course Matcher",
    description: "Answer 6 quick questions and get a personalised course shortlist in 60 seconds — every match explains why it fits.",
  });
}

export default function MatcherPage() {
  return (
    <div className="mx-auto max-w-[720px] px-[22px] pt-10 pb-20">
      <MatcherQuiz />
    </div>
  );
}
