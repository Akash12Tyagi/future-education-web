import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { SeoForm } from "../SeoForm";
import { updateSeoOverride } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditSeoOverridePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seoMeta = await prisma.seoMeta.findUnique({ where: { id } });
  if (!seoMeta) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit SEO override</h1>
      <AdminCard>
        <SeoForm
          action={updateSeoOverride.bind(null, seoMeta.id)}
          lockPath
          initial={{
            path: seoMeta.path,
            title: seoMeta.title,
            description: seoMeta.description,
            ogImageUrl: seoMeta.ogImageUrl,
          }}
        />
      </AdminCard>
    </div>
  );
}
