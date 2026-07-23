import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { CollegeForm } from "../CollegeForm";
import { updateCollege } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [college, allCourses, mediaAssets] = await Promise.all([
    prisma.college.findUnique({ where: { id }, include: { courses: { select: { courseId: true } } } }),
    prisma.course.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!college) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit college</h1>
      <AdminCard>
        <CollegeForm
          action={updateCollege.bind(null, college.id)}
          allCourses={allCourses}
          mediaAssets={mediaAssets}
          initial={{
            id: college.id,
            slug: college.slug,
            name: college.name,
            city: college.city,
            state: college.state,
            type: college.type,
            accreditations: college.accreditations,
            feeMin: college.feeMin,
            feeMax: college.feeMax,
            isVerifiedPartner: college.isVerifiedPartner,
            hasVideo: college.hasVideo,
            websiteUrl: college.websiteUrl,
            imageId: college.imageId,
            imageAlt: college.imageAlt,
            labsAndAchievements: college.labsAndAchievements,
            order: college.order,
            active: college.active,
            courseIds: college.courses.map((c) => c.courseId),
          }}
        />
      </AdminCard>
    </div>
  );
}
