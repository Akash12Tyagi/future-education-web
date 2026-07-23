import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { ScholarshipForm } from "../ScholarshipForm";
import { updateScholarship } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [scholarship, streams] = await Promise.all([
    prisma.scholarship.findUnique({ where: { id } }),
    prisma.stream.findMany({ orderBy: { label: "asc" }, select: { id: true, label: true } }),
  ]);

  if (!scholarship) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit scholarship</h1>
      <AdminCard>
        <ScholarshipForm
          action={updateScholarship.bind(null, scholarship.id)}
          streams={streams}
          initial={{
            name: scholarship.name,
            desc: scholarship.desc,
            income: scholarship.income,
            streamId: scholarship.streamId,
            order: scholarship.order,
            active: scholarship.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
