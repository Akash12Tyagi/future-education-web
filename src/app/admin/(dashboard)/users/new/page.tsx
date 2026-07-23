import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminCard } from "@/components/admin/AdminCard";
import { UserForm } from "./UserForm";

export default async function NewUserPage() {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") redirect("/admin/users");

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add user</h1>
      <AdminCard>
        <UserForm />
      </AdminCard>
    </div>
  );
}
