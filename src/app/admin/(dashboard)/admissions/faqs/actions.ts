"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const faqSchema = z.object({
  category: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.coerce.number().int(),
  active: z.coerce.boolean(),
});

function parseFormData(formData: FormData) {
  return faqSchema.parse({
    category: formData.get("category") || "admissions",
    question: formData.get("question"),
    answer: formData.get("answer"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session;
}

export async function createFaq(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  const faq = await prisma.faq.create({ data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "Faq", entityId: faq.id },
  });

  revalidatePath("/admin/admissions/faqs");
  revalidatePath("/admission-consultancy");
  redirect("/admin/admissions/faqs");
}

export async function updateFaq(
  id: string,
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireAdmin();
  const data = parseFormData(formData);

  await prisma.faq.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Faq", entityId: id },
  });

  revalidatePath("/admin/admissions/faqs");
  revalidatePath("/admission-consultancy");
  redirect("/admin/admissions/faqs");
}

export async function deleteFaq(id: string) {
  const session = await requireAdmin();
  await prisma.faq.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "Faq", entityId: id },
  });
  revalidatePath("/admin/admissions/faqs");
  revalidatePath("/admission-consultancy");
}
