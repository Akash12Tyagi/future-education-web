"use client";

import { updateLeadStatus } from "./actions";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"];

export function StatusSelect({ leadId, status }: { leadId: string; status: string }) {
  return (
    <form
      action={(formData) => updateLeadStatus(leadId, formData)}
      onChange={(e) => (e.currentTarget as HTMLFormElement).requestSubmit()}
    >
      <select
        name="status"
        defaultValue={status}
        className="rounded-md border-[1.5px] border-[#D1D5DB] bg-white px-2 py-1 text-[12.5px] font-bold"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}
