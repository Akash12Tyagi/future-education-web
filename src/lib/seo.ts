import type { Metadata } from "next";
import { getSeoOverride } from "@/lib/site-data";

export const SITE_NAME = "Future Education Trust";

export async function buildMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Promise<Metadata> {
  const override = await getSeoOverride(path);

  const finalTitle = override?.title ?? title;
  const finalDescription = override?.description ?? description;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: path },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: path,
      siteName: SITE_NAME,
      images: override?.ogImageUrl ? [{ url: override.ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
    },
  };
}
