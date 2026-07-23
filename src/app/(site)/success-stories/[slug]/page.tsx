"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { stories } from "@/data/stories";
import { initials } from "@/lib/format";
import { waHref } from "@/lib/whatsapp";

export default function StoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const story = stories.find((s) => s.slug === params.slug);

  if (!story) {
    return (
      <div className="mx-auto max-w-[640px] px-[22px] py-[70px] text-center">
        <div className="mb-2.5 text-xl font-extrabold text-primary-900">Story not found</div>
        <Link href="/success-stories" className="rounded-[9px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
          All stories
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] px-[22px] pt-7.5 pb-[90px]">
      <Link href="/success-stories" className="text-sm text-neutral-500 no-underline">
        ← All success stories
      </Link>
      <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-8">
        <div className="mb-5.5 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-900 text-xl font-bold text-highlight-500">
            {initials(story.name)}
          </span>
          <div>
            <div className="text-xl font-extrabold text-primary-900">{story.name}</div>
            <div className="text-sm text-neutral-500">
              {story.course} · {story.college}
            </div>
            {story.verified && (
              <span className="mt-1.5 inline-block rounded-md bg-success-100 px-2 py-1 text-[11px] font-bold text-success-500">
                ✓ Counselled by Future Education · {story.year}
              </span>
            )}
          </div>
        </div>
        <p className="mb-5 text-lg leading-relaxed text-neutral-900">&quot;{story.quote}&quot;</p>
        <p className="m-0 text-[15px] leading-relaxed text-[#4B5563]">
          Like most families we work with, {story.name}&apos;s biggest worry was trust — whether the guidance was
          honest and whether the seat was real. A counsellor walked them through eligibility, a transparent
          shortlist and every document, one step at a time, at no cost to the student.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href="/contact" className="rounded-[10px] bg-accent-500 px-5.5 py-3 font-bold text-white no-underline">
            Start your story
          </Link>
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="rounded-[10px] border-[1.5px] border-[#1F7A42] px-5 py-2.5 font-bold text-[#1F7A42] no-underline"
          >
            Share on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
