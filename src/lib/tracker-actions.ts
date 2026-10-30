"use server";

import { prisma } from "@/lib/prisma";

export interface TrackedApplication {
  name: string;
  courseInterest: string | null;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "CLOSED";
  receivedAt: string;
  updatedAt: string;
}

export type TrackerLookupState = { error?: string; application?: TrackedApplication };

// No SMS gateway is configured, so instead of an OTP the student confirms the
// first name they gave with the enquiry. That keeps a stranger who only knows
// a phone number from reading someone else's status.
export async function lookupApplication(_prev: TrackerLookupState, formData: FormData): Promise<TrackerLookupState> {
  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "").slice(-10);
  const firstName = String(formData.get("firstName") ?? "").trim().toLowerCase();

  if (phone.length !== 10) return { error: "Enter the 10-digit mobile number you gave us." };
  if (!firstName) return { error: "Enter the student's first name." };

  const leads = await prisma.lead.findMany({
    where: { phone: { endsWith: phone } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  const lead = leads.find((l) => l.name.trim().toLowerCase().split(/\s+/)[0] === firstName.split(/\s+/)[0]);

  if (!lead) {
    return {
      error:
        "We couldn't find an enquiry with that number and name. Use the same details you gave on our enquiry form, or call +91 9334649506.",
    };
  }

  return {
    application: {
      name: lead.name,
      courseInterest: lead.courseInterest,
      status: lead.status,
      receivedAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    },
  };
}
