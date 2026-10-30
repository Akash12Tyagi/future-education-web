import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { ZodError } from "zod";

/** One-time success message shown as a toast on the next admin page. */
export const FLASH_COOKIE = "admin_flash";

export type ActionResult = { error?: string; success?: string };

const fieldLabels: Record<string, string> = {
  slug: "Slug",
  streamId: "Stream",
  imageId: "Image",
  fileId: "File",
  brochureId: "Brochure",
  feeMin: "Fee min",
  feeMax: "Fee max",
  durMonths: "Duration (months)",
  minPct: "Minimum Class 12 %",
  ctaHref: "CTA link",
  startsAt: "Start date",
  endsAt: "End date",
};

function label(field: PropertyKey | undefined): string {
  if (field === undefined) return "Form";
  const key = String(field);
  return fieldLabels[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

/** Turns anything an admin action can throw into a message an admin can act on. */
export function describeError(err: unknown): string {
  if (err instanceof ZodError) {
    const issues = err.issues.slice(0, 3).map((i) => {
      const field = label(i.path[0]);
      // Empty form fields arrive as null (FormData.get on a missing/blank field).
      const missing = i.code === "invalid_type" && /received (null|undefined)/.test(i.message);
      return missing ? `${field} is required` : `${field}: ${i.message}`;
    });
    return `Please fix: ${issues.join("; ")}.`;
  }

  const code = (err as { code?: unknown })?.code;
  if (code === "P2002") {
    type UniqueMeta = { target?: unknown; driverAdapterError?: { cause?: { constraint?: { fields?: unknown } } } };
    const meta = (err as { meta?: UniqueMeta }).meta;
    // The Neon driver adapter reports the columns under driverAdapterError.
    const target = meta?.target ?? meta?.driverAdapterError?.cause?.constraint?.fields;
    const fields = Array.isArray(target) && target.length ? target.map(label).join(", ") : null;
    return fields
      ? `This ${fields} is already used by another record — choose a different one.`
      : "This value is already used by another record — choose a different one.";
  }
  if (code === "P2003" || code === "P2014") {
    return "This item is still linked to other records (e.g. stories, colleges or banners). Remove those links first.";
  }
  if (code === "P2025") return "This item no longer exists — it may have been deleted. Refresh the page.";

  if (err instanceof Error) {
    if (err.message === "Not authenticated.") return "Your session has expired — please sign in again.";
    return err.message || "Something went wrong.";
  }
  return "Something went wrong. Please try again.";
}

function isRedirect(err: unknown): boolean {
  const digest = (err as { digest?: unknown })?.digest;
  return typeof digest === "string" && digest.startsWith("NEXT_REDIRECT");
}

/**
 * Wraps an admin server action so it never crashes the page: failures come
 * back as `{ error }` (shown as a toast), and a `success` message is flashed
 * to the next page when the action redirects.
 */
export function adminAction<A extends unknown[], R>(fn: (...args: A) => Promise<R>, success?: string) {
  return async (...args: A): Promise<R | ActionResult> => {
    try {
      const result = await fn(...args);
      // Saves that stay on the page (no redirect) report success directly.
      return result === undefined && success ? { success } : result;
    } catch (err) {
      if (success && isRedirect(err)) {
        (await cookies()).set(FLASH_COOKIE, encodeURIComponent(success), { path: "/admin", maxAge: 60 });
      }
      unstable_rethrow(err);
      console.error(`[admin] ${fn.name || "action"} failed:`, err);
      return { error: describeError(err) };
    }
  };
}
