import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { ScholarshipForm } from "../ScholarshipForm";
import { createScholarship } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewScholarshipPage() {
  const streams = await prisma.stream.findMany({ orderBy: { label: "asc" }, select: { id: true, label: true } });

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add scholarship</h1>
      <AdminCard>
        <ScholarshipForm action={createScholarship} streams={streams} />
      </AdminCard>
    </div>
  );
}
