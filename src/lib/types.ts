export type Stream = "medical" | "engineering" | "management" | "nursing" | "education" | "distance";
export type CourseType = "regular" | "distance";
export type CollegeType = "government" | "private" | "deemed";

export interface StreamMeta {
  key: Stream;
  label: string;
  desc: string;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  stream: Stream;
  streamLabel: string;
  type: CourseType;
  duration: string;
  durMonths: number;
  eligibility: string;
  feeMin: number;
  feeMax: number;
  outcomes: string[];
  collegeCount: number;
}

export interface College {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  type: CollegeType;
  acc: string[];
  courseIds: string[];
  feeMin: number;
  feeMax: number;
  isVerifiedPartner: boolean;
  video: boolean;
  website: string;
  image: string;
  imageAlt: string;
  labsAndAchievements?: string | null;
}

export interface Story {
  id: string;
  slug: string;
  name: string;
  course: string;
  college: string;
  stream: Stream;
  quote: string;
  year: number;
  verified: boolean;
  video: boolean;
  image?: string;
  imageAlt?: string;
}

export interface Counsellor {
  id: string;
  slug: string;
  name: string;
  role: string;
  specialization: string;
  credentials: string;
  image: string;
  imageAlt: string;
}

export interface Scheme {
  id: string;
  name: string;
  desc: string;
  income: "below_2.5L" | "2.5L_5L" | "5L_plus";
  stream: Stream | "";
}

export interface TimelineEntry {
  year: string;
  event: string;
}

export interface BentoItem {
  tag: string;
  title: string;
  body: string;
  big: boolean;
  image: string;
  imageAlt: string;
}

export interface MediaItem {
  kind: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  n: number;
  label: string;
  body?: string;
}

export interface MatcherStep {
  key: string;
  q: string;
  opts: [string, string][];
}

export interface OutcomeHighlight {
  tag: string;
  title: string;
  name: string;
  course: string;
  college: string;
  points: string[];
  pill1: string;
  pill2: string;
}

export interface StatTarget {
  label: string;
  value: number;
  suffix: string;
}

export interface CourseOption {
  value: string;
  label: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  courseInterest: string;
  city?: string;
  level?: string;
  message?: string;
  classYear?: string;
  sourceTag: string;
}

export interface Lead extends LeadPayload {
  id: string;
  at: string;
  status: "new";
}
