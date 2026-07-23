import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { RecruiterForm } from "../RecruiterForm";
import { updateRecruiter } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditRecruiterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recruiter = await prisma.recruiter.findUnique({ where: { id } });
  if (!recruiter) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit recruiter</h1>
      <AdminCard>
        <RecruiterForm
          action={updateRecruiter.bind(null, recruiter.id)}
          initial={{ name: recruiter.name, logoUrl: recruiter.logoUrl, order: recruiter.order, active: recruiter.active }}
        />
      </AdminCard>
    </div>
  );
}
