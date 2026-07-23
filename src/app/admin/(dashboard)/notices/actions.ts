"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NoticeType } from "@/generated/prisma/enums";

const noticeSchema = z.object({
  title: z.string().min(1),
  body: z.string().optional(),
  type: z.enum(NoticeType),
  linkHref: z.string().optional(),
  attachmentId: z.string().optional(),
  pinned: z.coerce.boolean(),
  active: z.coerce.boolean(),
  publishAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

function parseFormData(formData: FormData) {
  return noticeSchema.parse({
    title: formData.get("title"),
    body: formData.get("body") || undefined,
    type: formData.get("type"),
    linkHref: formData.get("linkHref") || undefined,
    attachmentId: formData.get("attachmentId") || undefined,
    pinned: formData.get("pinned") === "on",
    active: formData.get("active") === "on",
    publishAt: formData.get("publishAt") || undefined,
    expiresAt: formData.get("expiresAt") || undefined,
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createNotice(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const notice = await prisma.notice.create({
    data: {
      ...data,
      attachmentId: data.attachmentId || null,
      publishAt: data.publishAt ? new Date(data.publishAt) : new Date(),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Notice", entityId: notice.id },
  });

  revalidatePath("/admin/notices");
  revalidatePath("/");
  redirect("/admin/notices");
}

export async function updateNotice(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.notice.update({
    where: { id },
    data: {
      ...data,
      attachmentId: data.attachmentId || null,
      publishAt: data.publishAt ? new Date(data.publishAt) : new Date(),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Notice", entityId: id },
  });

  revalidatePath("/admin/notices");
  revalidatePath("/");
  redirect("/admin/notices");
}

export async function deleteNotice(id: string) {
  const session = await requireAdmin();
  await prisma.notice.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Notice", entityId: id },
  });
  revalidatePath("/admin/notices");
  revalidatePath("/");
}
