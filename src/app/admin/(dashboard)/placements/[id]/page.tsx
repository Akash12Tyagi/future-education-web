import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { StoryForm } from "../StoryForm";
import { updateStory } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [story, courses, colleges, streams, mediaAssets] = await Promise.all([
    prisma.story.findUnique({ where: { id } }),
    prisma.course.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.college.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.stream.findMany({ orderBy: { label: "asc" }, select: { id: true, label: true } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!story) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit success story</h1>
      <AdminCard>
        <StoryForm
          action={updateStory.bind(null, story.id)}
          courses={courses}
          colleges={colleges}
          streams={streams}
          mediaAssets={mediaAssets}
          initial={{
            slug: story.slug,
            name: story.name,
            courseId: story.courseId,
            collegeId: story.collegeId,
            streamId: story.streamId,
            quote: story.quote,
            year: story.year,
            verified: story.verified,
            videoUrl: story.videoUrl,
            packageLpa: story.packageLpa,
            imageId: story.imageId,
            order: story.order,
            active: story.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
