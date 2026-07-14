"use client";

import { useAppState } from "@/context/app-state";

export function CompareButton({ collegeId }: { collegeId: string }) {
  const { compare, addCompare } = useAppState();
  const inCompare = compare.includes(collegeId);

  return (
    <button
      onClick={() => addCompare(collegeId)}
      className="flex-none cursor-pointer rounded-[9px] border-[1.5px] px-3 py-2.5 text-[13.5px] font-semibold"
      style={{
        borderColor: inCompare ? "var(--color-success-500)" : "#D1D5DB",
        background: inCompare ? "var(--color-success-100)" : "#fff",
        color: inCompare ? "var(--color-success-500)" : "#4B5563",
      }}
    >
      {inCompare ? "✓ Added" : "+ Compare"}
    </button>
  );
}
