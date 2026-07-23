"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CollegeType } from "@/generated/prisma/enums";

const collegeSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  type: z.enum(CollegeType),
  accreditations: z.string().transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),
  feeMin: z.coerce.number().int().nonnegative(),
  feeMax: z.coerce.number().int().nonnegative(),
  isVerifiedPartner: z.coerce.boolean(),
  hasVideo: z.coerce.boolean(),
  websiteUrl: z.string().optional(),
  imageId: z.string().optional(),
  imageAlt: z.string().optional(),
  labsAndAchievements: z.string().optional(),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
  courseIds: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => (v ? (Array.isArray(v) ? v : [v]) : [])),
});

function parseFormData(formData: FormData) {
  return collegeSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    city: formData.get("city"),
    state: formData.get("state"),
    type: formData.get("type"),
    accreditations: formData.get("accreditations") ?? "",
    feeMin: formData.get("feeMin"),
    feeMax: formData.get("feeMax"),
    isVerifiedPartner: formData.get("isVerifiedPartner") === "on",
    hasVideo: formData.get("hasVideo") === "on",
    websiteUrl: formData.get("websiteUrl") || undefined,
    imageId: formData.get("imageId") || undefined,
    imageAlt: formData.get("imageAlt") || undefined,
    labsAndAchievements: formData.get("labsAndAchievements") || undefined,
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
    courseIds: formData.getAll("courseIds"),
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createCollege(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const college = await prisma.college.create({
    data: {
      slug: data.slug,
      name: data.name,
      city: data.city,
      state: data.state,
      type: data.type,
      accreditations: data.accreditations,
      feeMin: data.feeMin,
      feeMax: data.feeMax,
      isVerifiedPartner: data.isVerifiedPartner,
      hasVideo: data.hasVideo,
      websiteUrl: data.websiteUrl,
      imageId: data.imageId || null,
      imageAlt: data.imageAlt,
      labsAndAchievements: data.labsAndAchievements,
      order: data.order,
      active: data.active,
      courses: { create: data.courseIds.map((courseId) => ({ courseId })) },
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "College", entityId: college.id },
  });

  revalidatePath("/admin/colleges");
  redirect("/admin/colleges");
}

export async function updateCollege(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.$transaction([
    prisma.collegeCourse.deleteMany({ where: { collegeId: id } }),
    prisma.college.update({
      where: { id },
      data: {
        slug: data.slug,
        name: data.name,
        city: data.city,
        state: data.state,
        type: data.type,
        accreditations: data.accreditations,
        feeMin: data.feeMin,
        feeMax: data.feeMax,
        isVerifiedPartner: data.isVerifiedPartner,
        hasVideo: data.hasVideo,
        websiteUrl: data.websiteUrl,
        imageId: data.imageId || null,
        imageAlt: data.imageAlt,
        labsAndAchievements: data.labsAndAchievements,
        order: data.order,
        active: data.active,
        courses: { create: data.courseIds.map((courseId) => ({ courseId })) },
      },
    }),
  ]);

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "College", entityId: id },
  });

  revalidatePath("/admin/colleges");
  redirect("/admin/colleges");
}

export async function deleteCollege(id: string) {
  const session = await requireAdmin();
  await prisma.college.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "College", entityId: id },
  });
  revalidatePath("/admin/colleges");
}
