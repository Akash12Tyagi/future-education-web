export interface NavLink {
  href: string;
  label: string;
  tag?: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface MegaMenuPromo {
  eyebrow: string;
  /** Lines of the headline, rendered one per line. */
  title: string[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export interface NavGroup {
  key: string;
  label: string;
  href: string;
  children: NavLink[];
  columns: MegaMenuColumn[];
  promo: MegaMenuPromo;
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
    columns: [
      {
        heading: "Find Your Course",
        links: [
          { href: "/find-your-course", label: "Overview" },
          { href: "/find-your-course/matcher", label: "AI Course Matcher", tag: "quiz" },
          { href: "/find-your-course?stream=medical", label: "Browse by Stream" },
        ],
      },
      {
        heading: "Program Formats",
        links: [
          { href: "/find-your-course?type=regular", label: "Regular Programs" },
          { href: "/find-your-course?type=distance", label: "Distance / Online Programs" },
        ],
      },
    ],
    promo: {
      eyebrow: "AI Course Matcher",
      title: ["Find the course", "built for you"],
      description: "Answer a few quick questions and get matched with streams and colleges that fit your goals.",
      ctaLabel: "Take the quiz",
      ctaHref: "/find-your-course/matcher",
      image: "/images/campus/campus-03.jpg",
    },
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
    columns: [
      {
        heading: "Explore Colleges",
        links: [
          { href: "/colleges", label: "Browse All (5,000+)" },
          { href: "/colleges/compare", label: "Compare Colleges" },
        ],
      },
      {
        heading: "Highlights",
        links: [{ href: "/colleges?featured=true", label: "Featured Partner Institutes" }],
      },
    ],
    promo: {
      eyebrow: "Partner Network",
      title: ["5,000+ colleges,", "one directory"],
      description: "Compare fees, cutoffs, and placements across India's top colleges and universities in one place.",
      ctaLabel: "Browse colleges",
      ctaHref: "/colleges",
      image: "/images/campus/campus-05.jpg",
    },
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
      { href: "/downloads", label: "Downloads" },
    ],
    columns: [
      {
        heading: "Get Started",
        links: [
          { href: "/admission-consultancy", label: "How It Works" },
          { href: "/admission-consultancy#services", label: "Counselling Services" },
          { href: "/tracker", label: "Application Tracker", tag: "student login" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { href: "/admission-consultancy/scholarships", label: "Scholarships & Loan Guidance" },
          { href: "/downloads", label: "Downloads" },
        ],
      },
    ],
    promo: {
      eyebrow: "Admissions Open 2026",
      title: ["Join a new", "generation of learners"],
      description: "Explore academics, campus life, and the student experience in one focused view.",
      ctaLabel: "Learn more",
      ctaHref: "/admission-consultancy",
      image: "/images/campus/campus-07.jpg",
    },
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
      { href: "/news-events", label: "News & Events" },
    ],
    columns: [
      {
        heading: "About Us",
        links: [
          { href: "/about", label: "Our Story" },
          { href: "/about/director-message", label: "Director's Message" },
          { href: "/about/counsellors", label: "Our Counsellors" },
        ],
      },
      {
        heading: "More",
        links: [
          { href: "/about/media", label: "Media & Recognition" },
          { href: "/news-events", label: "News & Events" },
        ],
      },
    ],
    promo: {
      eyebrow: "15+ Years of Trust",
      title: ["Meet the team", "guiding your future"],
      description: "Get to know our counsellors, our story, and the people behind every successful admission.",
      ctaLabel: "Meet our counsellors",
      ctaHref: "/about/counsellors",
      image: "/images/team/counsellor-01.jpg",
    },
  },
];

export const successStoriesLink: NavLink = { href: "/success-stories", label: "Success Stories" };
export const galleryLink: NavLink = { href: "/gallery", label: "Gallery" };

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
      { href: "/downloads", label: "Downloads" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about/counsellors", label: "Our Counsellors" },
      { href: "/gallery", label: "Gallery" },
      { href: "/news-events", label: "News & Events" },
      { href: "/placements", label: "Placements" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
