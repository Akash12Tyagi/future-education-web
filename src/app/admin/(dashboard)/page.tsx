import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [leadCount, collegeCount, courseCount, counsellorCount, storyCount, noticeCount] = await Promise.all([
    prisma.lead.count(),
    prisma.college.count(),
    prisma.course.count(),
    prisma.counsellor.count(),
    prisma.story.count(),
    prisma.notice.count({ where: { active: true } }),
  ]);

  const tiles = [
    { label: "Leads (all time)", value: leadCount },
    { label: "Colleges", value: collegeCount },
    { label: "Courses", value: courseCount },
    { label: "Faculty / Counsellors", value: counsellorCount },
    { label: "Success stories", value: storyCount },
    { label: "Active notices", value: noticeCount },
  ];

  return (
    <div>
      <h1 className="mb-6 text-[clamp(24px,3vw,30px)] font-extrabold text-primary-900">Dashboard</h1>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
            <div className="mb-2 text-[13px] font-bold text-neutral-500">{tile.label.toUpperCase()}</div>
            <div className="text-2xl font-extrabold text-primary-900">{tile.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
