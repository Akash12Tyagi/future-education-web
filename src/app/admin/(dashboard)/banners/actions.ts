"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { HIDDEN_DEFAULT_BANNERS_KEY, getHiddenDefaultBannerIds } from "@/lib/site-data";
import { adminAction } from "@/lib/admin-action";

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

export const createBanner = adminAction(async function createBanner(
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
}, "Banner created");

export const updateBanner = adminAction(async function updateBanner(
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
}, "Changes saved");

export const toggleBannerActive = adminAction(async function toggleBannerActive(id: string) {
  const session = await requireAdmin();
  const banner = await prisma.banner.findUniqueOrThrow({ where: { id }, select: { active: true } });
  await prisma.banner.update({ where: { id }, data: { active: !banner.active } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: banner.active ? "hide" : "show", entityType: "Banner", entityId: id },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
});

export const toggleDefaultBanner = adminAction(async function toggleDefaultBanner(defaultId: string) {
  const session = await requireAdmin();
  const hidden = new Set(await getHiddenDefaultBannerIds());
  const wasHidden = hidden.has(defaultId);
  if (wasHidden) hidden.delete(defaultId);
  else hidden.add(defaultId);
  const value = [...hidden];
  await prisma.siteSetting.upsert({
    where: { key: HIDDEN_DEFAULT_BANNERS_KEY },
    create: { key: HIDDEN_DEFAULT_BANNERS_KEY, value },
    update: { value },
  });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: wasHidden ? "show" : "hide", entityType: "DefaultBanner", entityId: defaultId },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
});

export const deleteBanner = adminAction(async function deleteBanner(id: string) {
  const session = await requireAdmin();
  await prisma.banner.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Banner", entityId: id },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
});
