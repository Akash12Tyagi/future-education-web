"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { DownloadCategory } from "@/generated/prisma/enums";

const downloadSchema = z.object({
  title: z.string().min(1),
  category: z.enum(DownloadCategory),
  fileId: z.string().min(1),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return downloadSchema.parse({
    title: formData.get("title"),
    category: formData.get("category"),
    fileId: formData.get("fileId"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createDownload(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const download = await prisma.download.create({ data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Download", entityId: download.id },
  });

  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
  redirect("/admin/downloads");
}

export async function updateDownload(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.download.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Download", entityId: id },
  });

  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
  redirect("/admin/downloads");
}

export async function deleteDownload(id: string) {
  const session = await requireAdmin();
  await prisma.download.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Download", entityId: id },
  });
  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}
