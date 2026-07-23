"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { LeadStatus } from "@/generated/prisma/enums";

export async function updateLeadStatus(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");

  const status = formData.get("status") as string;
  if (!Object.values(LeadStatus).includes(status as LeadStatus)) return;

  await prisma.lead.update({ where: { id }, data: { status: status as LeadStatus } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "Lead", entityId: id, diff: { status } },
  });
  revalidatePath("/admin/leads");
}
