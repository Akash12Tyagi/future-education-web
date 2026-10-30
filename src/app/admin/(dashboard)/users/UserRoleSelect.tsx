"use client";

import { ActionForm } from "@/components/admin/ActionForm";
import { updateUserRole } from "./actions";

const roles = ["EDITOR", "ADMIN", "SUPER_ADMIN"];

export function UserRoleSelect({ userId, role, disabled }: { userId: string; role: string; disabled?: boolean }) {
  return (
    <ActionForm action={(formData) => updateUserRole(userId, formData)} success="Role updated" submitOnChange>
      <select
        name="role"
        defaultValue={role}
        disabled={disabled}
        className="rounded-md border-[1.5px] border-[#D1D5DB] bg-white px-2 py-1 text-[12.5px] font-bold disabled:opacity-60"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </ActionForm>
  );
}
