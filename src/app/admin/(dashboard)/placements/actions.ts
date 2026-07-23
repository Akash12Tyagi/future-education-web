"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const storySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  courseId: z.string().optional(),
  collegeId: z.string().optional(),
  streamId: z.string().optional(),
  quote: z.string().min(1),
  year: z.coerce.number().int(),
  verified: z.coerce.boolean(),
  videoUrl: z.string().optional(),
  packageLpa: z.coerce.number().optional(),
  imageId: z.string().optional(),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return storySchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    courseId: formData.get("courseId") || undefined,
    collegeId: formData.get("collegeId") || undefined,
    streamId: formData.get("streamId") || undefined,
    quote: formData.get("quote"),
    year: formData.get("year"),
    verified: formData.get("verified") === "on",
    videoUrl: formData.get("videoUrl") || undefined,
    packageLpa: formData.get("packageLpa") || undefined,
    imageId: formData.get("imageId") || undefined,
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createStory(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const story = await prisma.story.create({
    data: {
      ...data,
      courseId: data.courseId || null,
      collegeId: data.collegeId || null,
      streamId: data.streamId || null,
      imageId: data.imageId || null,
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Story", entityId: story.id },
  });

  revalidatePath("/admin/placements");
  redirect("/admin/placements");
}

export async function updateStory(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.story.update({
    where: { id },
    data: {
      ...data,
      courseId: data.courseId || null,
      collegeId: data.collegeId || null,
      streamId: data.streamId || null,
      imageId: data.imageId || null,
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Story", entityId: id },
  });

  revalidatePath("/admin/placements");
  redirect("/admin/placements");
}

export async function deleteStory(id: string) {
  const session = await requireAdmin();
  await prisma.story.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Story", entityId: id },
  });
  revalidatePath("/admin/placements");
}
