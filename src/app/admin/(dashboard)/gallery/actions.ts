"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { GalleryCategory } from "@/generated/prisma/enums";

const albumSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(GalleryCategory),
  active: z.coerce.boolean(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createAlbum(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = albumSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    active: formData.get("active") === "on",
  });

  const album = await prisma.galleryAlbum.create({ data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "GalleryAlbum", entityId: album.id },
  });

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateAlbum(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = albumSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    active: formData.get("active") === "on",
  });

  await prisma.galleryAlbum.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "GalleryAlbum", entityId: id },
  });

  revalidatePath("/admin/gallery");
  revalidatePath(`/admin/gallery/${id}`);
  return undefined;
}

export async function deleteAlbum(id: string) {
  const session = await requireAdmin();
  await prisma.galleryAlbum.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "GalleryAlbum", entityId: id },
  });
  revalidatePath("/admin/gallery");
}

export async function addGalleryItem(albumId: string, formData: FormData) {
  const session = await requireAdmin();
  const mediaId = formData.get("mediaId") as string;
  const caption = (formData.get("caption") as string) || null;
  if (!mediaId) return;

  await prisma.galleryItem.create({ data: { albumId, mediaId, caption } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "GalleryItem", entityId: albumId },
  });
  revalidatePath(`/admin/gallery/${albumId}`);
}

export async function deleteGalleryItem(albumId: string, itemId: string) {
  const session = await requireAdmin();
  await prisma.galleryItem.delete({ where: { id: itemId } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "GalleryItem", entityId: itemId },
  });
  revalidatePath(`/admin/gallery/${albumId}`);
}
