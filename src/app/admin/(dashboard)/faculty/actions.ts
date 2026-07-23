"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const counsellorSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  specialization: z.string().min(1),
  credentials: z.string().min(1),
  bio: z.string().optional(),
  experienceYears: z.coerce.number().int().nonnegative().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  imageId: z.string().optional(),
  imageAlt: z.string().optional(),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return counsellorSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    role: formData.get("role"),
    specialization: formData.get("specialization"),
    credentials: formData.get("credentials"),
    bio: formData.get("bio") || undefined,
    experienceYears: formData.get("experienceYears") || undefined,
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    imageId: formData.get("imageId") || undefined,
    imageAlt: formData.get("imageAlt") || undefined,
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createCounsellor(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const counsellor = await prisma.counsellor.create({
    data: { ...data, imageId: data.imageId || null },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Counsellor", entityId: counsellor.id },
  });

  revalidatePath("/admin/faculty");
  redirect("/admin/faculty");
}

export async function updateCounsellor(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.counsellor.update({
    where: { id },
    data: { ...data, imageId: data.imageId || null },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Counsellor", entityId: id },
  });

  revalidatePath("/admin/faculty");
  redirect("/admin/faculty");
}

export async function deleteCounsellor(id: string) {
  const session = await requireAdmin();
  await prisma.counsellor.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Counsellor", entityId: id },
  });
  revalidatePath("/admin/faculty");
}
