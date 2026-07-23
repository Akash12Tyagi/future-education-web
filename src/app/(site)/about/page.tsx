import { AboutStoryClient } from "@/components/about/AboutStoryClient";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/about",
    title: "Our Story",
    description:
      "Future Education Trust — 15+ years of honest, transparent admission counselling from Bokaro Steel City, backed by a network of 5,000+ associate institutes.",
  });
}

export default function AboutStoryPage() {
  return <AboutStoryClient />;
}
