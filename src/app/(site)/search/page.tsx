import Link from "next/link";
import { globalSearch } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({ path: "/search", title: "Search", description: "Search courses, colleges, faculty, notices, and downloads." });
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = q ? await globalSearch(q) : [];
  const groups = [...new Set(results.map((r) => r.category))];

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,36px)] font-extrabold text-primary-900">Search</h1>

      <form className="mb-8 flex gap-2.5" action="/search">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search courses, colleges, faculty, notices, downloads…"
          className="flex-1 rounded-[10px] border-[1.5px] border-[#D1D5DB] bg-white px-4 py-3 text-base outline-none"
        />
        <button type="submit" className="cursor-pointer rounded-[10px] border-none bg-accent-500 px-5 py-3 font-bold text-white">
          Search
        </button>
      </form>

      {q && results.length === 0 && (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="text-lg font-bold text-neutral-900">No results for &quot;{q}&quot;</div>
          <p className="m-0 mt-2 text-neutral-500">Try a different term, or talk to a counsellor directly.</p>
        </div>
      )}

      {groups.map((group) => (
        <div key={group} className="mb-7">
          <h2 className="mb-3 text-lg font-extrabold text-primary-900">{group}</h2>
          <div className="flex flex-col gap-2.5">
            {results
              .filter((r) => r.category === group)
              .map((r, i) => (
                <Link
                  key={`${group}-${i}`}
                  href={r.href}
                  className="rounded-[11px] border border-[#E5E7EB] bg-white p-4 no-underline"
                >
                  <div className="font-bold text-neutral-900">{r.title}</div>
                  {r.description && <div className="mt-0.5 text-[13.5px] text-neutral-500">{r.description}</div>}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
