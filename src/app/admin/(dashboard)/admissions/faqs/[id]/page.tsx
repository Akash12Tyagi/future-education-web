import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { FaqForm } from "../FaqForm";
import { updateFaq } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit FAQ</h1>
      <AdminCard>
        <FaqForm
          action={updateFaq.bind(null, faq.id)}
          initial={{
            category: faq.category,
            question: faq.question,
            answer: faq.answer,
            order: faq.order,
            active: faq.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
