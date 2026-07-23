import { AboutCounsellorsClient } from "@/components/about/AboutCounsellorsClient";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/about/counsellors",
    title: "Our Counsellors",
    description: "Meet the named counsellors guiding Future Education Trust students — real credentials, not an anonymous call centre.",
  });
}

export default function AboutCounsellorsPage() {
  return <AboutCounsellorsClient />;
}
