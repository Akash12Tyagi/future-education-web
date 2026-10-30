import { feeRange } from "@/lib/format";
import type { MatcherCategory, MatcherCollege, MatcherProgramme } from "@/lib/site-data";

export interface MatcherAnswers {
  category?: string;
  score?: string;
  budget?: string;
  location?: string;
  priority?: string;
}

export interface MatchCollege {
  slug: string;
  name: string;
  place: string;
  feeRange: string;
  withinBudget: boolean;
}

export interface MatchResult {
  rank: number;
  courseSlug: string;
  courseName: string;
  categoryKey: string;
  categoryLabel: string;
  duration: string;
  eligibility: string;
  feeRange: string;
  withinBudget: boolean;
  reasons: string[];
  cautions: string[];
  colleges: MatchCollege[];
}

export interface MatcherRunResult {
  matches: MatchResult[];
  /** At least one match the student is eligible for and can afford. */
  hasStrongMatch: boolean;
}

const MAX_MATCHES = 5;
const MAX_COLLEGES = 3;

// Old hardcoded category keys still used in shared links (?category=btech).
const legacyCategoryKeys: Record<string, string> = {
  "ug-medical": "medical",
  "pharma-nursing": "nursing",
  btech: "engineering",
  "management-it": "management",
};

export function findCategory(categories: MatcherCategory[], key: string | undefined): MatcherCategory | undefined {
  if (!key) return undefined;
  const resolved = legacyCategoryKeys[key] ?? key;
  return categories.find((c) => c.key === resolved);
}

// Upper bound of each Class 12 score band — a student in the band may reach a
// programme's minimum, so the programme stays in the list with a caution.
const scoreBands: Record<string, { low: number; high: number }> = {
  s35: { low: 35, high: 45 },
  s46: { low: 46, high: 55 },
  s56: { low: 56, high: 65 },
  s66: { low: 66, high: 75 },
  s76: { low: 76, high: 85 },
  s86: { low: 86, high: 100 },
};

const budgetCaps: Record<string, number> = {
  b1: 200000,
  b2: 500000,
  b3: 1000000,
  b4: 2500000,
  b5: 5000000,
  b6: Number.POSITIVE_INFINITY,
};

const locationReasons: Record<string, string> = {
  hometown: "We'll shortlist partner colleges closest to your home town",
  india: "Open to partner colleges anywhere in India",
  metro: "We'll prioritise colleges in metro cities",
};

function durationMonths(p: MatcherProgramme): number {
  return p.durMonths > 0 ? p.durMonths : 999;
}

/** Partner colleges offering the programme, best fit for the student first. */
function shortlistColleges(colleges: MatcherCollege[], budgetMax: number, priority: string | undefined): MatchCollege[] {
  return [...colleges]
    .sort((a, b) => {
      const aIn = a.feeMin <= budgetMax ? 0 : 1;
      const bIn = b.feeMin <= budgetMax ? 0 : 1;
      if (aIn !== bIn) return aIn - bIn;
      if (priority === "rank") {
        const byQuality =
          Number(b.isVerifiedPartner) - Number(a.isVerifiedPartner) || b.accreditationCount - a.accreditationCount;
        if (byQuality) return byQuality;
      }
      return a.feeMin - b.feeMin;
    })
    .slice(0, MAX_COLLEGES)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      place: [c.city, c.state].filter(Boolean).join(", "),
      feeRange: feeRange(c.feeMin, c.feeMax),
      withinBudget: c.feeMin <= budgetMax,
    }));
}

export function runMatcher(ans: MatcherAnswers, categories: MatcherCategory[]): MatcherRunResult {
  const category = findCategory(categories, ans.category);
  if (!category) return { matches: [], hasStrongMatch: false };

  const band = (ans.score && scoreBands[ans.score]) || scoreBands.s86;
  const budgetMax = (ans.budget && budgetCaps[ans.budget]) || Number.POSITIVE_INFINITY;
  const wantsAbroad = ans.location === "abroad";

  const scored = category.programmes
    // Only programmes the student can be eligible for with their Class 12 score.
    .filter((p) => band.high >= p.minPct)
    .map((p) => {
      let score = 0;
      const reasons: string[] = [`Matches your interest in ${category.label}`];
      const cautions: string[] = [];

      if (band.low >= p.minPct) {
        score += 2;
        reasons.push(p.minPct > 0 ? `Your Class 12 score meets the ${p.minPct}% minimum` : "Admission is based on your qualifying exam");
      } else {
        cautions.push(`Needs at least ${p.minPct}% in Class 12 — confirm your exact marks with a counsellor`);
      }

      const withinBudget = p.feeMin <= budgetMax;
      if (withinBudget) {
        score += 4;
        reasons.push(p.feeMax <= budgetMax ? "Fully within your stated budget" : "Has colleges within your budget");
      } else {
        cautions.push("Above your stated budget — ask us about scholarships and education loans");
      }

      if (wantsAbroad) {
        if (p.abroad) {
          score += 3;
          reasons.push("Study-abroad programme, as you preferred");
        }
      } else if (p.abroad) {
        score -= 1;
        reasons.push("Also available abroad, often at a lower total fee");
      } else if (ans.location && locationReasons[ans.location]) {
        reasons.push(locationReasons[ans.location]);
      }

      if (ans.priority === "fee" && withinBudget) reasons.push("Ranked by lowest total fee, as you asked");
      if (ans.priority === "rank") reasons.push("We'll shortlist only NAAC / NIRF-ranked or approved colleges");
      if (ans.priority === "job" && durationMonths(p) <= 36) reasons.push("Shorter programme — an earlier start to working");

      const colleges = shortlistColleges(p.colleges, budgetMax, ans.priority);
      const affordable = p.colleges.filter((c) => c.feeMin <= budgetMax).length;
      if (affordable > 0) {
        reasons.push(`${affordable} partner college${affordable === 1 ? "" : "s"} offer this within your budget`);
      }

      return { p, score, withinBudget, reasons, cautions, colleges };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (ans.priority === "job") return durationMonths(a.p) - durationMonths(b.p);
      return a.p.feeMin - b.p.feeMin;
    })
    .slice(0, MAX_MATCHES);

  const matches: MatchResult[] = scored.map((x, i) => ({
    rank: i + 1,
    courseSlug: x.p.slug,
    courseName: x.p.name,
    categoryKey: category.key,
    categoryLabel: category.label,
    duration: x.p.duration,
    eligibility: x.p.eligibility,
    feeRange: feeRange(x.p.feeMin, x.p.feeMax),
    withinBudget: x.withinBudget,
    reasons: x.reasons,
    cautions: x.cautions,
    colleges: x.colleges,
  }));

  return { matches, hasStrongMatch: scored.some((x) => x.withinBudget && x.cautions.length === 0) };
}
