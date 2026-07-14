export const WHATSAPP_NUMBER = "919334649506";

export function waHref(message?: string, number: string = WHATSAPP_NUMBER): string {
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function leadWaHref(params: { name?: string; phone?: string; courseInterest?: string }, number: string = WHATSAPP_NUMBER): string {
  const msg = `Hi Future Education, I'm ${params.name || "a student"} (${params.phone || ""}). I'd like guidance on ${params.courseInterest || "admissions"}.`;
  return waHref(msg, number);
}
