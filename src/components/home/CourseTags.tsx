import Link from "next/link";
import type { CourseCategory } from "@/lib/site-data";

export function CourseTags({ categories }: { categories: CourseCategory[] }) {
  return (
    <section className="border-y border-[#E5E7EB] bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-start md:gap-12 md:px-6">
        <div className="flex-none md:w-64">
          <p className="m-0 text-sm font-medium text-neutral-500">Explore by field</p>
          <p className="m-0 mt-1 text-2xl font-bold tracking-tight text-primary-900">Answer 5 questions,</p>
          <p className="m-0 text-2xl font-light text-neutral-900">get your shortlist.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/find-your-course/matcher?category=${c.key}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-4 py-2 text-sm font-medium text-neutral-900 no-underline transition-colors hover:border-primary-900 hover:bg-primary-900 hover:text-white"
            >
              {c.label}
              <span className="text-xs text-neutral-500">{c.courseCount}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
