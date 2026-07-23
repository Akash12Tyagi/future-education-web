import { SuccessStoriesClient } from "@/components/stories/SuccessStoriesClient";
import { getStories } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/success-stories",
    title: "Success Stories",
    description: "Real students, real colleges — verified admission outcomes from students counselled by Future Education Trust.",
  });
}

export default async function SuccessStoriesPage() {
  const stories = await getStories();
  return <SuccessStoriesClient stories={stories} />;
}
