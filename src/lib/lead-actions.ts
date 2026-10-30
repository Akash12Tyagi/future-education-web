"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendLeadToLms } from "@/lib/lms";
import type { LeadPayload } from "@/lib/types";

export async function submitLeadToDb(payload: LeadPayload) {
  const lead = await prisma.lead.create({
    data: {
      name: payload.name,
      phone: payload.phone,
      courseInterest: payload.courseInterest,
      city: payload.city,
      level: payload.level,
      message: payload.message,
      classYear: payload.classYear,
      sourceTag: payload.sourceTag,
    },
  });

  await prisma.analyticsEvent.create({
    data: { type: "ENQUIRY", entityId: lead.id, metadata: { sourceTag: payload.sourceTag } },
  });

  // The page the form was submitted from (carries any utm_* params).
  const pageUrl = (await headers()).get("referer");
  // Forward to the LMS after responding, so the student isn't kept waiting.
  after(() => sendLeadToLms(payload, pageUrl));
}
