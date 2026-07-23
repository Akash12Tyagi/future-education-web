"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const bannerSchema = z.object({
  heading: z.string().min(1),
  subheading: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  imageId: z.string().min(1),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
});

function parseFormData(formData: FormData) {
  return bannerSchema.parse({
    heading: formData.get("heading"),
    subheading: formData.get("subheading") || undefined,
    ctaLabel: formData.get("ctaLabel") || undefined,
    ctaHref: formData.get("ctaHref") || undefined,
    imageId: formData.get("imageId"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
    startsAt: formData.get("startsAt") || undefined,
    endsAt: formData.get("endsAt") || undefined,
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createBanner(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const banner = await prisma.banner.create({
    data: {
      ...data,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Banner", entityId: banner.id },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function updateBanner(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.banner.update({
    where: { id },
    data: {
      ...data,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
    },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Banner", entityId: id },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function deleteBanner(id: string) {
  const session = await requireAdmin();
  await prisma.banner.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Banner", entityId: id },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}
