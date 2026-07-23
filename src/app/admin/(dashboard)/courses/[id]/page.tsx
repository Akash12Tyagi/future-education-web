import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { CourseForm } from "../CourseForm";
import { updateCourse } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [course, streams, mediaAssets] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    prisma.stream.findMany({ orderBy: { label: "asc" }, select: { id: true, label: true } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!course) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit course</h1>
      <AdminCard>
        <CourseForm
          action={updateCourse.bind(null, course.id)}
          streams={streams}
          mediaAssets={mediaAssets}
          initial={{
            slug: course.slug,
            name: course.name,
            streamId: course.streamId,
            type: course.type,
            duration: course.duration,
            durMonths: course.durMonths,
            eligibility: course.eligibility,
            feeMin: course.feeMin,
            feeMax: course.feeMax,
            outcomes: course.outcomes,
            brochureId: course.brochureId,
            order: course.order,
            active: course.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
