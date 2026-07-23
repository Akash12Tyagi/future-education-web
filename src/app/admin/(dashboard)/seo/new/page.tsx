import { AdminCard } from "@/components/admin/AdminCard";
import { SeoForm } from "../SeoForm";
import { createSeoOverride } from "../actions";

export default function NewSeoOverridePage() {
  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add SEO override</h1>
      <AdminCard>
        <SeoForm action={createSeoOverride} />
      </AdminCard>
    </div>
  );
}
