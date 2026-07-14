export function fmtLakh(value: number): string {
  const n = value / 100000;
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

export function feeRange(min: number, max: number): string {
  return `₹${fmtLakh(min)}L – ₹${fmtLakh(max)}L`;
}

export function fmtNum(n: number): string {
  return n.toLocaleString("en-IN");
}

export function typeLabel(t: string): string {
  return { private: "Private", government: "Government", deemed: "Deemed" }[t] ?? t;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
