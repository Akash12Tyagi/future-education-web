"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { IncomeBracket } from "@/generated/prisma/enums";

const scholarshipSchema = z.object({
  name: z.string().min(1),
  desc: z.string().min(1),
  income: z.enum(IncomeBracket),
  streamId: z.string().optional(),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return scholarshipSchema.parse({
    name: formData.get("name"),
    desc: formData.get("desc"),
    income: formData.get("income"),
    streamId: formData.get("streamId") || undefined,
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createScholarship(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const scholarship = await prisma.scholarship.create({ data: { ...data, streamId: data.streamId || null } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Scholarship", entityId: scholarship.id },
  });

  revalidatePath("/admin/admissions/scholarships");
  revalidatePath("/admission-consultancy/scholarships");
  redirect("/admin/admissions/scholarships");
}

export async function updateScholarship(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.scholarship.update({ where: { id }, data: { ...data, streamId: data.streamId || null } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Scholarship", entityId: id },
  });

  revalidatePath("/admin/admissions/scholarships");
  revalidatePath("/admission-consultancy/scholarships");
  redirect("/admin/admissions/scholarships");
}

export async function deleteScholarship(id: string) {
  const session = await requireAdmin();
  await prisma.scholarship.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Scholarship", entityId: id },
  });
  revalidatePath("/admin/admissions/scholarships");
  revalidatePath("/admission-consultancy/scholarships");
}
