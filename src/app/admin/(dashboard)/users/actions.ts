"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma/enums";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(Role),
});

const updateRoleSchema = z.object({ role: z.enum(Role) });

async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Only Super Admins can manage users & roles.");
  }
  return session;
}

export async function createUser(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string } | undefined> {
  const session = await requireSuperAdmin();
  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (existing) return { error: "A user with this email already exists." };

  const passwordHash = await hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), passwordHash, role: parsed.data.role },
  });

  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "create", entityType: "User", entityId: user.id },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUserRole(id: string, formData: FormData) {
  const session = await requireSuperAdmin();
  const parsed = updateRoleSchema.safeParse({ role: formData.get("role") });
  if (!parsed.success) return;

  if (id === session.user.id && parsed.data.role !== "SUPER_ADMIN") {
    throw new Error("You cannot remove your own Super Admin role.");
  }

  if (parsed.data.role !== "SUPER_ADMIN") {
    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (targetUser?.role === "SUPER_ADMIN") {
      const superAdminCount = await prisma.user.count({ where: { role: "SUPER_ADMIN" } });
      if (superAdminCount <= 1) throw new Error("At least one Super Admin must remain.");
    }
  }

  await prisma.user.update({ where: { id }, data: { role: parsed.data.role } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "update", entityType: "User", entityId: id, diff: { role: parsed.data.role } },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireSuperAdmin();
  if (session.user.id === id) throw new Error("You cannot delete your own account.");

  await prisma.user.delete({ where: { id } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "delete", entityType: "User", entityId: id },
  });
  revalidatePath("/admin/users");
}
