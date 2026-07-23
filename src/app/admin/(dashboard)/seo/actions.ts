"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const seoSchema = z.object({
  path: z.string().min(1).startsWith("/"),
  title: z.string().optional(),
  description: z.string().optional(),
  ogImageUrl: z.string().optional(),
});

function parseFormData(formData: FormData) {
  return seoSchema.parse({
    path: formData.get("path"),
    title: formData.get("title") || undefined,
    description: formData.get("description") || undefined,
    ogImageUrl: formData.get("ogImageUrl") || undefined,
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createSeoOverride(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const existing = await prisma.seoMeta.findUnique({ where: { path: data.path } });
  if (existing) return { error: `An override for ${data.path} already exists — edit it instead.` };

  const seoMeta = await prisma.seoMeta.create({ data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "SeoMeta", entityId: seoMeta.id },
  });

  revalidatePath("/admin/seo");
  revalidatePath(data.path);
  redirect("/admin/seo");
}

export async function updateSeoOverride(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.seoMeta.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "SeoMeta", entityId: id },
  });

  revalidatePath("/admin/seo");
  revalidatePath(data.path);
  redirect("/admin/seo");
}

export async function deleteSeoOverride(id: string, path: string) {
  const session = await requireAdmin();
  await prisma.seoMeta.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "SeoMeta", entityId: id },
  });
  revalidatePath("/admin/seo");
  revalidatePath(path);
}
