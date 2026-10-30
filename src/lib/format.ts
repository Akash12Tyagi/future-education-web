export function fmtLakh(value: number): string {
  const n = value / 100000;
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

function fmtFee(value: number): string {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(1)}Cr`;
  }
  if (value < 100000) return `₹${Math.round(value / 1000)}K`;
  return `₹${fmtLakh(value)}L`;
}

export function feeRange(min: number, max: number): string {
  return `${fmtFee(min)} – ${fmtFee(max)}`;
}

export function fmtNum(n: number): string {
  return n.toLocaleString("en-IN");
}

export function typeLabel(t: string): string {
  return { private: "Private", government: "Government", deemed: "Deemed" }[t] ?? t;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
