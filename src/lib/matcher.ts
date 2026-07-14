import { courses } from "@/data/courses";
import { colleges } from "@/data/colleges";
import { streamsMeta } from "@/data/streams";
import { feeRange } from "@/lib/format";

export interface MatcherAnswers {
  stream?: string;
  score?: string;
  budget?: string;
  location?: string;
  type?: string;
  priority?: string;
}

export interface MatchResult {
  rank: number;
  courseName: string;
  courseSlug: string;
  collegeName: string;
  collegeSlug: string;
  city: string;
  feeRange: string;
  reasons: string[];
  verified: boolean;
}

export interface MatcherRunResult {
  matches: MatchResult[];
  hasStrongMatch: boolean;
}

const budgetCaps: Record<string, number> = { b1: 200000, b2: 500000, b3: 1000000, b4: 5000000 };

function streamLabel(key?: string): string {
  return streamsMeta.find((s) => s.key === key)?.label ?? key ?? "";
}

export function runMatcher(ans: MatcherAnswers): MatcherRunResult {
  const budgetMax = (ans.budget && budgetCaps[ans.budget]) || 5000000;
  const prefType = ans.type || "regular";

  const scored = courses
    .map((c) => {
      let score = 0;
      const reasons: string[] = [];
      if (c.stream === ans.stream) {
        score += 4;
        reasons.push(`Matches your ${streamLabel(ans.stream)} stream interest`);
      }
      if (c.feeMin <= budgetMax) {
        score += 2;
        reasons.push(c.feeMax <= budgetMax ? "Fully within your stated budget" : "Has options within your budget");
      }
      if (c.type === prefType) {
        score += 2;
        reasons.push(prefType === "distance" ? "Distance / online, as you preferred" : "Regular on-campus program, as you preferred");
      }
      return { c, score, reasons };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const prefState = ans.location === "home" ? ["Jharkhand"] : null;

  const matches: MatchResult[] = scored.map((x, i) => {
    const offering = colleges.filter((g) => g.courseIds.includes(x.c.id));
    let college = offering[0];

    if (prefState) {
      const local = offering.find((g) => prefState.includes(g.state));
      if (local) {
        college = local;
        x.reasons.push(`Available near home at ${local.name}`);
      }
    }
    if (ans.priority === "rank") {
      const acc = offering.find((g) => g.acc.join().includes("A++") || g.acc.join().includes("NIRF"));
      if (acc) {
        college = acc;
        x.reasons.push("Top-accredited option for your ranking priority");
      }
    }
    if (ans.priority === "fee") {
      const cheap = offering.slice().sort((a, b) => a.feeMin - b.feeMin)[0];
      if (cheap) college = cheap;
    }

    return {
      rank: i + 1,
      courseName: x.c.name,
      courseSlug: x.c.slug,
      collegeName: college ? college.name : "Multiple partner colleges",
      collegeSlug: college ? college.slug : "",
      city: college ? college.city : "",
      feeRange: feeRange(x.c.feeMin, x.c.feeMax),
      reasons: x.reasons,
      verified: college ? college.isVerifiedPartner : false,
    };
  });

  const top = scored.length ? scored[0].score : 0;
  return { matches, hasStrongMatch: top >= 6 };
}
