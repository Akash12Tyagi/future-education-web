import { AdminCard } from "@/components/admin/AdminCard";
import { RecruiterForm } from "../RecruiterForm";
import { createRecruiter } from "../actions";

export default function NewRecruiterPage() {
  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add recruiter</h1>
      <AdminCard>
        <RecruiterForm action={createRecruiter} />
      </AdminCard>
    </div>
  );
}
