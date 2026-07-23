import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { CourseForm } from "../CourseForm";
import { createCourse } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  const [streams, mediaAssets] = await Promise.all([
    prisma.stream.findMany({ orderBy: { label: "asc" }, select: { id: true, label: true } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add course</h1>
      <AdminCard>
        <CourseForm action={createCourse} streams={streams} mediaAssets={mediaAssets} />
      </AdminCard>
    </div>
  );
}
