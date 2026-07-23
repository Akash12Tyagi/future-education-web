"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CourseType } from "@/generated/prisma/enums";

const courseSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  streamId: z.string().min(1),
  type: z.enum(CourseType),
  duration: z.string().min(1),
  durMonths: z.coerce.number().int().nonnegative(),
  eligibility: z.string().min(1),
  feeMin: z.coerce.number().int().nonnegative(),
  feeMax: z.coerce.number().int().nonnegative(),
  outcomes: z.string().transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),
  brochureId: z.string().optional(),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return courseSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    streamId: formData.get("streamId"),
    type: formData.get("type"),
    duration: formData.get("duration"),
    durMonths: formData.get("durMonths"),
    eligibility: formData.get("eligibility"),
    feeMin: formData.get("feeMin"),
    feeMax: formData.get("feeMax"),
    outcomes: formData.get("outcomes") ?? "",
    brochureId: formData.get("brochureId") || undefined,
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createCourse(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const course = await prisma.course.create({
    data: { ...data, brochureId: data.brochureId || null },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Course", entityId: course.id },
  });

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function updateCourse(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.course.update({
    where: { id },
    data: { ...data, brochureId: data.brochureId || null },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Course", entityId: id },
  });

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
  const session = await requireAdmin();
  await prisma.course.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Course", entityId: id },
  });
  revalidatePath("/admin/courses");
}
