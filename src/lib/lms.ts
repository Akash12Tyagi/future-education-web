import type { LeadPayload } from "@/lib/types";

// Future Education LMS public enquiry endpoint. Each website lead becomes a
// NEW lead there with source "Website Enquiry" (deduplicated by phone/email).
const DEFAULT_ENDPOINT = "https://api.futureeducationonline.com/api/v1/leads/public/website-enquiry";
const TIMEOUT_MS = 10_000;

/**
 * Forwards a website lead to the LMS. Never throws: the lead is already saved
 * in this site's database, so an LMS outage only gets logged.
 */
export async function sendLeadToLms(payload: LeadPayload, pageUrl: string | null): Promise<void> {
  const endpoint = process.env.LMS_LEAD_ENDPOINT || DEFAULT_ENDPOINT;
  const apiKey = process.env.LMS_LEAD_API_KEY;

  let utm: URLSearchParams | null = null;
  try {
    utm = pageUrl ? new URL(pageUrl).searchParams : null;
  } catch {
    pageUrl = null;
  }
  const details = [
    payload.message,
    payload.level && `Level: ${payload.level}`,
    payload.classYear && `Class/Year: ${payload.classYear}`,
    `Form: ${payload.sourceTag}`,
  ].filter(Boolean);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "x-api-key": apiKey } : {}),
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        course: payload.courseInterest || undefined,
        city: payload.city || undefined,
        message: details.join(" · "),
        pageUrl: pageUrl ?? undefined,
        utmSource: utm?.get("utm_source") ?? undefined,
        utmMedium: utm?.get("utm_medium") ?? undefined,
        utmCampaign: utm?.get("utm_campaign") ?? undefined,
        website: "",
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[lms] lead not accepted (${res.status}):`, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("[lms] failed to send lead:", err);
  }
}
