"use server";

import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MediaKind } from "@/generated/prisma/enums";

function kindFromMimeType(mimeType: string): MediaKind {
  if (mimeType.startsWith("image/")) return MediaKind.IMAGE;
  if (mimeType.startsWith("video/")) return MediaKind.VIDEO;
  return MediaKind.DOCUMENT;
}

export type UploadMediaState = { error?: string; asset?: { id: string; url: string; filename: string } };

export async function uploadMediaAsset(_prev: UploadMediaState, formData: FormData): Promise<UploadMediaState> {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file first." };

  const folder = (formData.get("folder") as string | null) ?? "uploads";
  const altText = (formData.get("altText") as string | null) ?? undefined;

  let blob;
  try {
    blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
  } catch {
    return { error: "Upload failed — Media Library storage isn't configured yet. Pick an existing image instead." };
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      url: blob.url,
      pathname: blob.pathname,
      filename: file.name,
      kind: kindFromMimeType(file.type),
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      altText,
      folder,
      uploadedById: session.user.id,
    },
  });

  return { asset: { id: asset.id, url: asset.url, filename: asset.filename } };
}
