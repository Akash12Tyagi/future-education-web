import type { Scheme } from "@/lib/types";

export const schemes: Scheme[] = [
  { id: "sc1", name: "Post-Matric Scholarship (SC/ST/OBC/EWS)", desc: "Government fee-reimbursement scheme for eligible categories, applied for through your institute.", income: "below_2.5L", stream: "" },
  { id: "sc2", name: "PM Vidyalaxmi Education Loan Scheme", desc: "Collateral-free education loans for students admitted to recognised institutions.", income: "2.5L_5L", stream: "" },
  { id: "sc3", name: "National Means-cum-Merit Scholarship", desc: "Central government support for meritorious students from economically weaker sections.", income: "below_2.5L", stream: "" },
  { id: "sc4", name: "Institute Merit Scholarships", desc: "Many of our partner institutes offer their own merit-based fee waivers — confirmed for your shortlist during counselling.", income: "2.5L_5L", stream: "" },
  { id: "sc5", name: "Bank Education Loan Guidance", desc: "We help you approach banks for education loans suited to your course and repayment capacity.", income: "5L_plus", stream: "" },
];
