import type { MatcherStep } from "@/lib/types";

export const matcherSteps: MatcherStep[] = [
  { key: "stream", q: "Which stream interests you most?", opts: [["medical", "Medical (MBBS/BDS/Nursing)"], ["engineering", "Engineering / IT"], ["management", "Management / MBA"], ["nursing", "Nursing"], ["education", "Education / B.Ed"]] },
  { key: "score", q: "How did (or will) you score in Class 12?", opts: [["low", "Below 60%"], ["mid", "60–75%"], ["good", "75–85%"], ["high", "85% and above"]] },
  { key: "budget", q: "What total budget can your family plan for?", opts: [["b1", "Under ₹2 lakh"], ["b2", "₹2–5 lakh"], ["b3", "₹5–10 lakh"], ["b4", "₹10 lakh+"]] },
  { key: "location", q: "Where would you prefer to study?", opts: [["home", "Near home (Bokaro / Jharkhand)"], ["any", "Anywhere in India"], ["metro", "A metro city"]] },
  { key: "type", q: "Regular campus or distance / online?", opts: [["regular", "Regular (on campus)"], ["distance", "Distance / Online"]] },
  { key: "priority", q: "What matters most in your final choice?", opts: [["fee", "Lowest fee"], ["home", "Staying close to home"], ["rank", "Best accreditation / ranking"]] },
];
