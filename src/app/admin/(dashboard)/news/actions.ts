"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NewsEventType } from "@/generated/prisma/enums";

const newsEventSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(NewsEventType),
  body: z.string().min(1),
  eventDate: z.string().optional(),
  imageId: z.string().optional(),
  featured: z.coerce.boolean(),
  publishAt: z.string().optional(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return newsEventSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    type: formData.get("type"),
    body: formData.get("body"),
    eventDate: formData.get("eventDate") || undefined,
    imageId: formData.get("imageId") || undefined,
    featured: formData.get("featured") === "on",
    publishAt: formData.get("publishAt") || undefined,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createNewsEvent(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const newsEvent = await prisma.newsEvent.create({
    data: {
      ...data,
      imageId: data.imageId || null,
      eventDate: data.eventDate ? new Date(data.eventDate) : null,
      publishAt: data.publishAt ? new Date(data.publishAt) : new Date(),
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "NewsEvent", entityId: newsEvent.id },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news-events");
  redirect("/admin/news");
}

export async function updateNewsEvent(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.newsEvent.update({
    where: { id },
    data: {
      ...data,
      imageId: data.imageId || null,
      eventDate: data.eventDate ? new Date(data.eventDate) : null,
      publishAt: data.publishAt ? new Date(data.publishAt) : new Date(),
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "NewsEvent", entityId: id },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news-events");
  redirect("/admin/news");
}

export async function deleteNewsEvent(id: string) {
  const session = await requireAdmin();
  await prisma.newsEvent.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "NewsEvent", entityId: id },
  });
  revalidatePath("/admin/news");
  revalidatePath("/news-events");
}
