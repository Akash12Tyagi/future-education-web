"use client";

import { updateUserRole } from "./actions";

const roles = ["EDITOR", "ADMIN", "SUPER_ADMIN"];

export function UserRoleSelect({ userId, role, disabled }: { userId: string; role: string; disabled?: boolean }) {
  return (
    <form
      action={(formData) => updateUserRole(userId, formData)}
      onChange={(e) => (e.currentTarget as HTMLFormElement).requestSubmit()}
    >
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
    </form>
  );
}
