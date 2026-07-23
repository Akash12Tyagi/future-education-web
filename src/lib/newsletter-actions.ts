"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const emailSchema = z.string().email();

export type NewsletterState = { success?: boolean; error?: string };

export async function subscribeToNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { error: "Enter a valid email address." };

  await prisma.newsletterSubscriber.upsert({
    where: { email: parsed.data.toLowerCase() },
    update: {},
    create: { email: parsed.data.toLowerCase() },
  });

  return { success: true };
}
