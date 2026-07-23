import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { CollegeForm } from "../CollegeForm";
import { createCollege } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewCollegePage() {
  const [allCourses, mediaAssets] = await Promise.all([
    prisma.course.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add college</h1>
      <AdminCard>
        <CollegeForm action={createCollege} allCourses={allCourses} mediaAssets={mediaAssets} />
      </AdminCard>
    </div>
  );
}
