export interface NavLink {
  href: string;
  label: string;
  tag?: string;
}

export interface NavGroup {
  key: string;
  label: string;
  href: string;
  children: NavLink[];
}

export const navGroups: NavGroup[] = [
  {
    key: "find",
    label: "Find Your Course",
    href: "/find-your-course",
    children: [
      { href: "/find-your-course/matcher", label: "AI Course Matcher", tag: "quiz" },
      { href: "/find-your-course?stream=medical", label: "Browse by Stream" },
      { href: "/find-your-course?type=regular", label: "Regular Programs" },
      { href: "/find-your-course?type=distance", label: "Distance / Online Programs" },
    ],
  },
  {
    key: "colleges",
    label: "Colleges & Universities",
    href: "/colleges",
    children: [
      { href: "/colleges", label: "Browse All (5,000+)" },
      { href: "/colleges/compare", label: "Compare Colleges" },
      { href: "/colleges?featured=true", label: "Featured Partner Institutes" },
    ],
  },
  {
    key: "admission",
    label: "Admission Consultancy",
    href: "/admission-consultancy",
    children: [
      { href: "/admission-consultancy", label: "How It Works" },
      { href: "/admission-consultancy#services", label: "Counselling Services" },
      { href: "/tracker", label: "Application Tracker", tag: "student login" },
      { href: "/admission-consultancy/scholarships", label: "Scholarships & Loan Guidance" },
    ],
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    children: [
      { href: "/about", label: "Our Story" },
      { href: "/about/director-message", label: "Director's Message" },
      { href: "/about/counsellors", label: "Our Counsellors" },
      { href: "/about/media", label: "Media & Recognition" },
    ],
  },
];

export const successStoriesLink: NavLink = { href: "/success-stories", label: "Success Stories" };

export const footerGroups = [
  {
    heading: "Find Your Course",
    links: [
      { href: "/find-your-course/matcher", label: "AI Course Matcher" },
      { href: "/find-your-course?stream=medical", label: "Browse by Stream" },
      { href: "/find-your-course?type=distance", label: "Distance / Online" },
    ],
  },
  {
    heading: "Colleges",
    links: [
      { href: "/colleges", label: "Browse Directory" },
      { href: "/colleges/compare", label: "Compare Colleges" },
      { href: "/success-stories", label: "Success Stories" },
    ],
  },
  {
    heading: "Consultancy",
    links: [
      { href: "/admission-consultancy", label: "How It Works" },
      { href: "/admission-consultancy/scholarships", label: "Scholarships & Loans" },
      { href: "/tracker", label: "Application Tracker" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about/counsellors", label: "Our Counsellors" },
      { href: "/about/media", label: "Media & Recognition" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
