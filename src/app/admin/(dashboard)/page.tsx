import Link from "next/link";
import type { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface QuickLink {
  label: string;
  href: string;
  addHref?: string;
  minRole?: Role;
}

const quickLinkGroups: { heading: string; links: QuickLink[] }[] = [
  {
    heading: "Homepage",
    links: [
      { label: "Banners", href: "/admin/banners", addHref: "/admin/banners/new" },
      { label: "Notices", href: "/admin/notices", addHref: "/admin/notices/new" },
    ],
  },
  {
    heading: "Content",
    links: [
      { label: "Colleges", href: "/admin/colleges", addHref: "/admin/colleges/new" },
      { label: "Courses", href: "/admin/courses", addHref: "/admin/courses/new" },
      { label: "Counsellors", href: "/admin/faculty", addHref: "/admin/faculty/new" },
      { label: "News & Events", href: "/admin/news", addHref: "/admin/news/new" },
      { label: "Gallery albums", href: "/admin/gallery", addHref: "/admin/gallery/new" },
      { label: "Downloads", href: "/admin/downloads", addHref: "/admin/downloads/new" },
    ],
  },
  {
    heading: "Admissions & Placements",
    links: [
      { label: "Admissions overview", href: "/admin/admissions" },
      { label: "Admission FAQs", href: "/admin/admissions/faqs", addHref: "/admin/admissions/faqs/new" },
      {
        label: "Scholarships",
        href: "/admin/admissions/scholarships",
        addHref: "/admin/admissions/scholarships/new",
      },
      { label: "Success stories", href: "/admin/placements", addHref: "/admin/placements/new" },
      { label: "Recruiters", href: "/admin/placements/recruiters", addHref: "/admin/placements/recruiters/new" },
    ],
  },
  {
    heading: "Leads & System",
    links: [
      { label: "Leads & Enquiries", href: "/admin/leads" },
      { label: "Analytics", href: "/admin/analytics" },
      { label: "SEO", href: "/admin/seo", addHref: "/admin/seo/new" },
      { label: "Users & Roles", href: "/admin/users", addHref: "/admin/users/new", minRole: "ADMIN" },
      { label: "Audit log", href: "/admin/users/audit-log", minRole: "ADMIN" },
    ],
  },
];

const publicLinks = [
  { label: "Homepage", href: "/" },
  { label: "Colleges", href: "/colleges" },
  { label: "Find your course", href: "/find-your-course" },
  { label: "News & Events", href: "/news-events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Success stories", href: "/success-stories" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
];

export default async function AdminDashboardPage() {
  const [session, leadCount, collegeCount, courseCount, counsellorCount, storyCount, noticeCount] =
    await Promise.all([
      auth(),
      prisma.lead.count(),
      prisma.college.count(),
      prisma.course.count(),
      prisma.counsellor.count(),
      prisma.story.count(),
      prisma.notice.count({ where: { active: true } }),
    ]);
  const role = session?.user.role;
  const canSee = (link: QuickLink) => !link.minRole || role === link.minRole || role === "SUPER_ADMIN";

  const tiles = [
    { label: "Leads (all time)", value: leadCount, href: "/admin/leads" },
    { label: "Colleges", value: collegeCount, href: "/admin/colleges" },
    { label: "Courses", value: courseCount, href: "/admin/courses" },
    { label: "Faculty / Counsellors", value: counsellorCount, href: "/admin/faculty" },
    { label: "Success stories", value: storyCount, href: "/admin/placements" },
    { label: "Active notices", value: noticeCount, href: "/admin/notices" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-[clamp(24px,3vw,30px)] font-extrabold text-primary-900">Dashboard</h1>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 no-underline transition-colors hover:border-primary-600"
          >
            <div className="mb-2 text-[13px] font-bold text-neutral-500">{tile.label.toUpperCase()}</div>
            <div className="text-2xl font-extrabold text-primary-900">{tile.value}</div>
          </Link>
        ))}
      </div>

      <h2 className="mt-9 mb-4 text-lg font-extrabold text-primary-900">Quick links</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {quickLinkGroups.map((group) => (
          <div key={group.heading} className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
            <div className="mb-3 text-[11px] font-bold tracking-wide text-neutral-500 uppercase">{group.heading}</div>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {group.links.filter(canSee).map((link) => (
                <li key={link.href} className="flex items-center justify-between gap-3 py-1">
                  <Link href={link.href} className="text-[13.5px] font-semibold text-neutral-900 hover:text-primary-600">
                    {link.label}
                  </Link>
                  {link.addHref && (
                    <Link
                      href={link.addHref}
                      className="shrink-0 rounded-md bg-primary-100 px-2 py-1 text-[12px] font-bold text-primary-900"
                    >
                      + Add new
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
          <div className="mb-3 text-[11px] font-bold tracking-wide text-neutral-500 uppercase">View live site</div>
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {publicLinks.map((link) => (
              <li key={link.href} className="py-1">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13.5px] font-semibold text-neutral-900 hover:text-primary-600"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
