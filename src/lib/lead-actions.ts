"use server";

import { prisma } from "@/lib/prisma";
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
}
