import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { StoryForm } from "../StoryForm";
import { createStory } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewStoryPage() {
  const [courses, colleges, streams, mediaAssets] = await Promise.all([
    prisma.course.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.college.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.stream.findMany({ orderBy: { label: "asc" }, select: { id: true, label: true } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add success story</h1>
      <AdminCard>
        <StoryForm action={createStory} courses={courses} colleges={colleges} streams={streams} mediaAssets={mediaAssets} />
      </AdminCard>
    </div>
  );
}
