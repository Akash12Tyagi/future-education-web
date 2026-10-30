import type { MatcherStep } from "@/lib/types";
import type { CourseCategory } from "@/lib/site-data";

// Step 1's options are the admin-managed streams (Admin → Courses), so new
// streams and courses reach the matcher without code changes.
export function buildMatcherSteps(categories: CourseCategory[]): MatcherStep[] {
  return [
    {
      key: "category",
      q: "Which course are you looking for?",
      opts: categories.map((c) => [c.key, c.label, c.examples]),
    },
    ...fixedSteps,
  ];
}

const fixedSteps: MatcherStep[] = [
  {
    key: "score",
    q: "How did (or will) you score in Class 12?",
    opts: [["s35", "35 – 45%"], ["s46", "46 – 55%"], ["s56", "56 – 65%"], ["s66", "66 – 75%"], ["s76", "76 – 85%"], ["s86", "86% and above"]],
  },
  {
    key: "budget",
    q: "What total budget can your family plan for?",
    opts: [["b1", "Under ₹2 lakh"], ["b2", "₹2 – 5 lakh"], ["b3", "₹5 – 10 lakh"], ["b4", "₹10 – 25 lakh"], ["b5", "₹25 – 50 lakh"], ["b6", "₹50 lakh and above"]],
  },
  {
    key: "location",
    q: "Where would you prefer to study?",
    opts: [["hometown", "Near Home Town"], ["india", "Anywhere in India"], ["metro", "A metro city"], ["abroad", "Abroad"]],
  },
  {
    key: "priority",
    q: "What matters most in your final choice?",
    opts: [["fee", "Lowest total fee"], ["rank", "Best accreditation / ranking"], ["job", "Quickest route to a job"]],
  },
];
