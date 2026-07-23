"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const recruiterSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().min(1),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return recruiterSchema.parse({
    name: formData.get("name"),
    logoUrl: formData.get("logoUrl"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createRecruiter(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const recruiter = await prisma.recruiter.create({ data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Recruiter", entityId: recruiter.id },
  });

  revalidatePath("/admin/placements/recruiters");
  revalidatePath("/placements");
  redirect("/admin/placements/recruiters");
}

export async function updateRecruiter(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.recruiter.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Recruiter", entityId: id },
  });

  revalidatePath("/admin/placements/recruiters");
  revalidatePath("/placements");
  redirect("/admin/placements/recruiters");
}

export async function deleteRecruiter(id: string) {
  const session = await requireAdmin();
  await prisma.recruiter.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Recruiter", entityId: id },
  });
  revalidatePath("/admin/placements/recruiters");
  revalidatePath("/placements");
}
