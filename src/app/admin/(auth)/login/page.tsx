import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin login" };

export default function AdminLoginPage() {
  return (
    <div className="w-full max-w-[400px] rounded-2xl border border-[#E5E7EB] bg-white p-7.5">
      <h1 className="mb-1.5 text-2xl font-extrabold text-primary-900">Admin login</h1>
      <p className="m-0 mb-6 text-[14.5px] text-neutral-500">Sign in to manage site content.</p>
      <LoginForm />
    </div>
  );
}
