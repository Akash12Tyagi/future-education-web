import { AboutMediaClient } from "@/components/about/AboutMediaClient";
import { getMediaItems } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/about/media",
    title: "Media & Recognition",
    description: "Press coverage, event photos, and recognition for Future Education Trust's counselling programmes.",
  });
}

export default async function AboutMediaPage() {
  const mediaItems = await getMediaItems();
  return <AboutMediaClient mediaItems={mediaItems} />;
}
