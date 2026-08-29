import type { OutcomeHighlight, StatTarget } from "@/lib/types";

export const outcomeHighlights: OutcomeHighlight[] = [
  { tag: "MBBS · 2025", title: "Seat secured at SRM Institute of Science & Technology", name: "Ankit Kumar", course: "MBBS", college: "SRM Institute of Science & Technology", points: ["Guided from NEET counselling round 1 through document verification", "Shortlisted within his family's stated budget"], pill1: "MBBS", pill2: "Verified admission", image: "/images/success/success1.png", imageAlt: "Portrait of Ankit Kumar" },
  { tag: "B.Tech · 2024", title: "Compared 3 engineering colleges before choosing IEM Kolkata", name: "Rahul Verma", course: "B.Tech (CSE)", college: "IEM, Kolkata", points: ["Side-by-side fee and accreditation comparison", "No pressure toward the highest-fee option"], pill1: "B.Tech (CSE)", pill2: "Verified admission", image: "/images/success/success2.png", imageAlt: "Portrait of Rahul Verma" },
  { tag: "MBA · 2024", title: "Found a collateral-free loan path to MATS University", name: "Aman Gupta", course: "MBA", college: "MATS University", points: ["Eligibility checker flagged a bank loan he qualified for", "Enrolled without family financial strain"], pill1: "MBA", pill2: "Verified admission", image: "/images/success/success3.png", imageAlt: "Portrait of Aman Gupta" },
];

export const statTargets: StatTarget[] = [
  { label: "Years of counselling experience", value: 15, suffix: "+" },
  { label: "Students counselled", value: 11690, suffix: "+" },
  { label: "Associate institutes", value: 5000, suffix: "+" },
  { label: "Active courses", value: 150, suffix: "+" },
];
