import type { FaqItem } from "@/lib/types";

export const faqData: FaqItem[] = [
  { q: "Is this counselling service really free for students?", a: "Yes. Counselling, shortlisting and admission guidance cost you nothing — we never take a service fee from students or their families. We work with our partner institutes, and we never take on more students than our counsellors can give proper attention to." },
  { q: "Can you help with direct or management-quota admission?", a: "Where a course genuinely has quota or management-quota seats, we'll explain the real terms — fees, seat availability and process — so you can decide with full information, not pressure." },
  { q: "Do you only help with admissions inside India?", a: "No. Alongside our India-based consultancy, we also guide students applying to institutions in the UK, USA, Canada, Australia, Ireland and New Zealand." },
  { q: "What if my scores don't suit any strong option right now?", a: "We'll tell you plainly — including when the honest advice is to wait a cycle and reattempt an entrance exam rather than accept a seat that isn't right for you." },
  { q: "Can you help with scholarships and education loans?", a: "Yes — use our eligibility checker for a starting point, and our team can guide you toward institute scholarships and collateral-free bank loan options where you qualify." },
];

export const processFull: { n: number; label: string; body: string }[] = [
  { n: 1, label: "Free Counselling Call", body: "We understand your scores, budget and goals first — no cost, no obligation to proceed." },
  { n: 2, label: "Course & College Shortlist", body: "A shortlist built around what actually fits you, drawn from our network of 5,000+ associate institutes." },
  { n: 3, label: "Application & Documentation", body: "Eligibility checks, document verification and application filing, including quota and management-quota routes where relevant." },
  { n: 4, label: "Entrance / Interview Preparation", body: "Guidance ahead of counselling rounds and interviews, where the course requires them." },
  { n: 5, label: "Admission & Post-Admission Support", body: "Confirmation support, scholarship and loan guidance, and help settling in after you enrol." },
];

export const includedItems: string[] = [
  "Personalised eligibility assessment",
  "Document verification & checklist",
  "Direct and management-quota admission guidance",
  "Scholarship & education-loan guidance",
  "Pre-admission training for entrance exams and interviews",
  "Virtual campus tours of partner institutions",
];
