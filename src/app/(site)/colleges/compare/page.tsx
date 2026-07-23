"use client";

import Link from "next/link";
import { useAppState } from "@/context/app-state";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { feeRange, typeLabel } from "@/lib/format";

export default function ComparePage() {
  const { compare, colleges, removeCompare, clearCompare } = useAppState();
  const isMobile = useIsMobile();

  const items = compare.map((id) => colleges.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c);

  const rows = (c: (typeof items)[number]) => [
    { label: "Type", value: typeLabel(c.type) },
    { label: "Location", value: `${c.city}, ${c.state}` },
    { label: "Accreditation", value: c.acc.join(" · ") },
    { label: "Verified Partner", value: c.isVerifiedPartner ? "✓ Yes" : "Not verified" },
    { label: "Fee range", value: feeRange(c.feeMin, c.feeMax) },
    { label: "Courses offered", value: String(c.courseIds.length) },
    { label: "Video tour", value: c.video ? "Available" : "—" },
  ];

  return (
    <div className="mx-auto max-w-[1220px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Compare colleges</h1>
      <p className="m-0 mb-6 text-base text-[#4B5563]">
        Facts side by side — no &quot;recommended&quot; column, no persuasion. Just the numbers.
      </p>

      {items.length < 2 ? (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-11 text-center">
          <div className="mb-2 text-lg font-bold text-neutral-900">Add at least 2 colleges to compare</div>
          <p className="m-0 mb-4.5 text-neutral-500">
            Browse the directory and tap &quot;+ Compare&quot; on any card (up to 4).
          </p>
          <Link href="/colleges" className="rounded-[9px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
            Browse colleges →
          </Link>
        </div>
      ) : (
        <div>
          {!isMobile ? (
            <div className="overflow-x-auto rounded-[14px] border border-[#E5E7EB] bg-white">
              <table className="w-full border-collapse" style={{ minWidth: 560 }}>
                <thead>
                  <tr>
                    <th className="sticky left-0 min-w-[150px] border-b border-[#E5E7EB] bg-neutral-100 p-4 text-left text-[13px] font-bold text-neutral-500">
                      Attribute
                    </th>
                    {items.map((c) => (
                      <th key={c.id} className="border-b border-[#E5E7EB] border-l border-l-[#F0F2EF] p-4 text-left align-top">
                        <div className="mb-1.5 text-[15px] font-bold text-primary-900">{c.name}</div>
                        <button
                          onClick={() => removeCompare(c.id)}
                          className="cursor-pointer border-none bg-none p-0 text-[12.5px] text-accent-500 underline"
                        >
                          Remove
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows(items[0]).map((_, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className="sticky left-0 border-b border-[#F0F2EF] bg-neutral-100 p-4 text-[13.5px] font-bold text-[#374151]">
                        {rows(items[0])[rowIdx].label}
                      </td>
                      {items.map((c) => (
                        <td key={c.id} className="border-b border-[#F0F2EF] border-l border-l-[#F0F2EF] p-4 text-sm text-neutral-900">
                          {rows(c)[rowIdx].value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((c) => (
                <div key={c.id} className="overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-neutral-100 px-4 py-3.5">
                    <span className="font-bold text-primary-900">{c.name}</span>
                    <button
                      onClick={() => removeCompare(c.id)}
                      className="cursor-pointer border-none bg-none text-[12.5px] text-accent-500 underline"
                    >
                      Remove
                    </button>
                  </div>
                  {rows(c).map((r) => (
                    <div key={r.label} className="flex justify-between gap-3.5 border-b border-[#F0F2EF] px-4 py-2.5 text-sm">
                      <span className="font-semibold text-neutral-500">{r.label}</span>
                      <span className="text-right text-neutral-900">{r.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/colleges" className="rounded-[9px] border-[1.5px] border-[#1F7A42] px-5 py-3 font-bold text-[#1F7A42] no-underline">
              + Add another college
            </Link>
            <button onClick={clearCompare} className="cursor-pointer rounded-[9px] border-[1.5px] border-[#D1D5DB] bg-white px-5 py-3 font-semibold text-neutral-500">
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
