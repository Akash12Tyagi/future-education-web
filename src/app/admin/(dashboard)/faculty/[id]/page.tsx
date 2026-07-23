import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { CounsellorForm } from "../CounsellorForm";
import { updateCounsellor } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [counsellor, mediaAssets] = await Promise.all([
    prisma.counsellor.findUnique({ where: { id } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!counsellor) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit faculty</h1>
      <AdminCard>
        <CounsellorForm
          action={updateCounsellor.bind(null, counsellor.id)}
          mediaAssets={mediaAssets}
          initial={{
            slug: counsellor.slug,
            name: counsellor.name,
            role: counsellor.role,
            specialization: counsellor.specialization,
            credentials: counsellor.credentials,
            bio: counsellor.bio,
            experienceYears: counsellor.experienceYears,
            email: counsellor.email,
            phone: counsellor.phone,
            imageId: counsellor.imageId,
            imageAlt: counsellor.imageAlt,
            order: counsellor.order,
            active: counsellor.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
