"use server";

import { prisma } from "@/lib/prisma";
import { AnalyticsEventType } from "@/generated/prisma/enums";

export async function trackEvent(type: AnalyticsEventType, path?: string, entityId?: string) {
  try {
    await prisma.analyticsEvent.create({ data: { type, path, entityId } });
  } catch (err) {
    // Analytics must never break the page it's tracking.
    console.error("Failed to record analytics event", err);
  }
}
