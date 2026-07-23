import { AdminCard } from "@/components/admin/AdminCard";
import { FaqForm } from "../FaqForm";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add FAQ</h1>
      <AdminCard>
        <FaqForm action={createFaq} />
      </AdminCard>
    </div>
  );
}
