import { GalleryClient } from "@/components/gallery/GalleryClient";
import { getGalleryAlbums } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/gallery",
    title: "Gallery",
    description: "Campus tours, counselling events, and student moments from Future Education Trust — organised by category.",
  });
}

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();
  return <GalleryClient albums={albums} />;
}
