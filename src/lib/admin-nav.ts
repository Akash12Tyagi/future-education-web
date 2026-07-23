import type { Role } from "@/generated/prisma/enums";

export interface AdminNavItem {
  href: string;
  label: string;
  minRole?: Role;
}

export interface AdminNavGroup {
  heading: string;
  items: AdminNavItem[];
}

// Doc's module list (§9 Admin Panel), mapped onto this site's actual content
// types (Departments → Colleges, Faculty → Counsellors, Placements → Stories).
export const adminNavGroups: AdminNavGroup[] = [
  {
    heading: "Overview",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    heading: "Homepage",
    items: [
      { href: "/admin/banners", label: "Banners" },
      { href: "/admin/notices", label: "Notices" },
    ],
  },
  {
    heading: "Content",
    items: [
      { href: "/admin/gallery", label: "Gallery" },
      { href: "/admin/courses", label: "Courses" },
      { href: "/admin/colleges", label: "Departments (Colleges)" },
      { href: "/admin/admissions", label: "Admissions" },
      { href: "/admin/faculty", label: "Faculty (Counsellors)" },
      { href: "/admin/news", label: "News & Events" },
      { href: "/admin/placements", label: "Placements" },
      { href: "/admin/downloads", label: "Downloads" },
    ],
  },
  {
    heading: "Leads",
    items: [{ href: "/admin/leads", label: "Leads & Enquiries" }],
  },
  {
    heading: "System",
    items: [
      { href: "/admin/seo", label: "SEO" },
      { href: "/admin/media", label: "Media Library" },
      { href: "/admin/analytics", label: "Analytics" },
      { href: "/admin/users", label: "Users & Roles", minRole: "ADMIN" },
    ],
  },
];
