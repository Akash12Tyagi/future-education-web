import { prisma } from "@/lib/prisma";
import type {
  College,
  CollegeType,
  Course,
  CourseOption,
  CourseType,
  Counsellor,
  Story,
  MediaItem,
  Stream,
  StreamMeta,
} from "@/lib/types";
import { visitPhotos } from "@/data/visit-photos";

const FALLBACK_IMAGE = "/images/campus/campus-01.jpg";

function toStream(key: string): Stream {
  return key as Stream;
}

export async function getStreamsMeta(): Promise<StreamMeta[]> {
  const streams = await prisma.stream.findMany({ orderBy: { label: "asc" } });
  return streams.map((s) => ({ key: toStream(s.key), label: s.label, desc: s.desc }));
}

export async function getCourses(): Promise<Course[]> {
  const courses = await prisma.course.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { stream: true, _count: { select: { colleges: true } } },
  });
  return courses.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    stream: toStream(c.stream.key),
    streamLabel: c.stream.label,
    type: c.type.toLowerCase() as CourseType,
    duration: c.duration,
    durMonths: c.durMonths,
    eligibility: c.eligibility,
    feeMin: c.feeMin,
    feeMax: c.feeMax,
    outcomes: c.outcomes,
    collegeCount: c._count.colleges,
    minPct: c.minPct,
    abroad: c.abroad,
  }));
}

/** A stream with at least one active course — the "pick your field" list. */
export interface CourseCategory {
  key: string;
  label: string;
  examples: string;
  courseCount: number;
}

export interface MatcherCollege {
  slug: string;
  name: string;
  city: string;
  state: string;
  feeMin: number;
  feeMax: number;
  isVerifiedPartner: boolean;
  accreditationCount: number;
}

export interface MatcherProgramme {
  slug: string;
  name: string;
  duration: string;
  durMonths: number;
  eligibility: string;
  minPct: number;
  feeMin: number;
  feeMax: number;
  abroad: boolean;
  colleges: MatcherCollege[];
}

export interface MatcherCategory extends CourseCategory {
  programmes: MatcherProgramme[];
}

// Streams are ordered by their earliest course's display order, so admins
// control the sequence from Admin → Courses.
async function loadStreamsWithCourses() {
  const streams = await prisma.stream.findMany({
    include: {
      courses: {
        where: { active: true },
        orderBy: { order: "asc" },
        include: {
          colleges: {
            where: { college: { active: true } },
            include: { college: true },
            orderBy: { college: { order: "asc" } },
          },
        },
      },
    },
  });
  return streams
    .filter((s) => s.courses.length > 0)
    .sort((a, b) => a.courses[0].order - b.courses[0].order || a.label.localeCompare(b.label));
}

export async function getCourseCategories(): Promise<CourseCategory[]> {
  const streams = await loadStreamsWithCourses();
  return streams.map((s) => ({ key: s.key, label: s.label, examples: s.desc, courseCount: s.courses.length }));
}

export async function getMatcherCategories(): Promise<MatcherCategory[]> {
  const streams = await loadStreamsWithCourses();
  return streams.map((s) => ({
    key: s.key,
    label: s.label,
    examples: s.desc,
    courseCount: s.courses.length,
    programmes: s.courses.map((c) => ({
      slug: c.slug,
      name: c.name,
      duration: c.duration,
      durMonths: c.durMonths,
      eligibility: c.eligibility,
      minPct: c.minPct,
      feeMin: c.feeMin,
      feeMax: c.feeMax,
      abroad: c.abroad,
      colleges: c.colleges.map(({ college }) => ({
        slug: college.slug,
        name: college.name,
        city: college.city,
        state: college.state,
        feeMin: college.feeMin,
        feeMax: college.feeMax,
        isVerifiedPartner: college.isVerifiedPartner,
        accreditationCount: college.accreditations.length,
      })),
    })),
  }));
}

export async function getCourseOptions(): Promise<CourseOption[]> {
  const courses = await prisma.course.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    select: { slug: true, name: true },
  });
  return [...courses.map((c) => ({ value: c.slug, label: c.name })), { value: "other", label: "Not sure yet" }];
}

export async function getColleges(): Promise<College[]> {
  const colleges = await prisma.college.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { image: true, courses: { select: { courseId: true } } },
  });
  return colleges.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    city: c.city,
    state: c.state,
    type: c.type.toLowerCase() as CollegeType,
    acc: c.accreditations,
    courseIds: c.courses.map((cc) => cc.courseId),
    feeMin: c.feeMin,
    feeMax: c.feeMax,
    isVerifiedPartner: c.isVerifiedPartner,
    video: c.hasVideo,
    website: c.websiteUrl ?? "",
    image: c.image?.url ?? FALLBACK_IMAGE,
    imageAlt: c.imageAlt ?? c.name,
  }));
}

export async function getCollegeBySlug(slug: string): Promise<{ college: College; profileCourses: Course[] } | null> {
  const c = await prisma.college.findUnique({
    where: { slug },
    include: {
      image: true,
      courses: { include: { course: { include: { stream: true, _count: { select: { colleges: true } } } } } },
    },
  });
  if (!c) return null;

  const college: College = {
    id: c.id,
    slug: c.slug,
    name: c.name,
    city: c.city,
    state: c.state,
    type: c.type.toLowerCase() as CollegeType,
    acc: c.accreditations,
    courseIds: c.courses.map((cc) => cc.courseId),
    feeMin: c.feeMin,
    feeMax: c.feeMax,
    isVerifiedPartner: c.isVerifiedPartner,
    video: c.hasVideo,
    website: c.websiteUrl ?? "",
    image: c.image?.url ?? FALLBACK_IMAGE,
    imageAlt: c.imageAlt ?? c.name,
    labsAndAchievements: c.labsAndAchievements,
  };

  const profileCourses: Course[] = c.courses.map((cc) => ({
    id: cc.course.id,
    slug: cc.course.slug,
    name: cc.course.name,
    stream: toStream(cc.course.stream.key),
    streamLabel: cc.course.stream.label,
    type: cc.course.type.toLowerCase() as CourseType,
    duration: cc.course.duration,
    durMonths: cc.course.durMonths,
    eligibility: cc.course.eligibility,
    feeMin: cc.course.feeMin,
    feeMax: cc.course.feeMax,
    outcomes: cc.course.outcomes,
    collegeCount: cc.course._count.colleges,
    minPct: cc.course.minPct,
    abroad: cc.course.abroad,
  }));

  return { college, profileCourses };
}

export async function getCounsellors(): Promise<Counsellor[]> {
  const counsellors = await prisma.counsellor.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { image: true },
  });
  return counsellors.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    role: c.role,
    specialization: c.specialization,
    credentials: c.credentials,
    image: c.image?.url ?? FALLBACK_IMAGE,
    imageAlt: c.imageAlt ?? c.name,
  }));
}

export interface CounsellorProfile extends Counsellor {
  bio: string | null;
  experienceYears: number | null;
  email: string | null;
  phone: string | null;
}

export async function getCounsellorBySlug(slug: string): Promise<CounsellorProfile | null> {
  const c = await prisma.counsellor.findUnique({ where: { slug }, include: { image: true } });
  if (!c) return null;
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    role: c.role,
    specialization: c.specialization,
    credentials: c.credentials,
    image: c.image?.url ?? FALLBACK_IMAGE,
    imageAlt: c.imageAlt ?? c.name,
    bio: c.bio,
    experienceYears: c.experienceYears,
    email: c.email,
    phone: c.phone,
  };
}

export async function getStories(): Promise<Story[]> {
  const stories = await prisma.story.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { course: true, college: true, stream: true, image: true },
  });
  return stories.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    course: s.course?.name ?? "",
    college: s.college?.name ?? "",
    stream: toStream(s.stream?.key ?? ""),
    quote: s.quote,
    year: s.year,
    verified: s.verified,
    video: !!s.videoUrl,
    image: s.image?.url,
    imageAlt: s.image?.altText ?? s.name,
  }));
}

export async function getMediaItems(): Promise<MediaItem[]> {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: "asc" },
    include: { media: true, album: true },
  });
  return items.map((i) => ({
    kind: i.album.title,
    caption: i.caption ?? "",
    image: i.media.url,
    imageAlt: i.media.altText ?? i.caption ?? i.album.title,
  }));
}

export interface PublicDownload {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  filename: string;
}

export async function getDownloads(): Promise<PublicDownload[]> {
  const downloads = await prisma.download.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { file: true },
  });
  return downloads.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    fileUrl: d.file.url,
    filename: d.file.filename,
  }));
}

export interface PublicNewsEvent {
  id: string;
  slug: string;
  title: string;
  type: "NEWS" | "EVENT";
  body: string;
  eventDate: string | null;
  image: string | null;
  featured: boolean;
  publishAt: string;
}

export async function getNewsEvents(): Promise<PublicNewsEvent[]> {
  const now = new Date();
  const items = await prisma.newsEvent.findMany({
    where: { active: true, publishAt: { lte: now } },
    orderBy: { publishAt: "desc" },
    include: { image: true },
  });
  return items.map((n) => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    type: n.type,
    body: n.body,
    eventDate: n.eventDate?.toISOString() ?? null,
    image: n.image?.url ?? null,
    featured: n.featured,
    publishAt: n.publishAt.toISOString(),
  }));
}

export interface PublicRecruiter {
  id: string;
  name: string;
  logoUrl: string;
}

export async function getRecruiters(): Promise<PublicRecruiter[]> {
  const recruiters = await prisma.recruiter.findMany({ where: { active: true }, orderBy: { order: "asc" } });
  return recruiters.map((r) => ({ id: r.id, name: r.name, logoUrl: r.logoUrl }));
}

export interface PublicScholarship {
  id: string;
  name: string;
  desc: string;
  income: string;
  streamKey: string | null;
}

export async function getScholarships(): Promise<PublicScholarship[]> {
  const scholarships = await prisma.scholarship.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { stream: true },
  });
  return scholarships.map((s) => ({
    id: s.id,
    name: s.name,
    desc: s.desc,
    income: s.income,
    streamKey: s.stream?.key ?? null,
  }));
}

export async function getSeoOverride(path: string) {
  return prisma.seoMeta.findUnique({ where: { path } });
}

export async function getFaqs(category = "admissions") {
  const faqs = await prisma.faq.findMany({ where: { active: true, category }, orderBy: { order: "asc" } });
  return faqs.map((f) => ({ q: f.question, a: f.answer }));
}

export interface GalleryAlbumWithItems {
  id: string;
  title: string;
  slug: string;
  category: string;
  items: { id: string; url: string; alt: string; caption: string | null; kind: string }[];
}

export async function getGalleryAlbums(): Promise<GalleryAlbumWithItems[]> {
  const albums = await prisma.galleryAlbum.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" }, include: { media: true } } },
  });
  return albums.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    items: a.items.map((i) => ({
      id: i.id,
      url: i.media.url,
      alt: i.media.altText ?? i.caption ?? a.title,
      caption: i.caption,
      kind: i.media.kind,
    })),
  }));
}

// ---------------------------------------------------------------------------
// Banners (Hero slider)
// ---------------------------------------------------------------------------

export interface BannerSlide {
  id: string;
  heading: string | null;
  subheading: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  image: string;
  imageAlt: string;
}

// Built-in hero slides (team visit photos). They can be hidden from Admin →
// Banners but not deleted; hidden ids are stored in SiteSetting.
export const HIDDEN_DEFAULT_BANNERS_KEY = "hiddenDefaultBanners";

export const defaultBannerSlides: BannerSlide[] = visitPhotos.map((p) => ({
  id: `default-${p.id}`,
  image: p.src,
  imageAlt: p.alt,
  heading: p.caption,
  subheading: null,
  ctaLabel: null,
  ctaHref: null,
}));

export async function getHiddenDefaultBannerIds(): Promise<string[]> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: HIDDEN_DEFAULT_BANNERS_KEY } });
  return Array.isArray(setting?.value) ? setting.value.filter((v): v is string => typeof v === "string") : [];
}

export async function getActiveBanners(): Promise<BannerSlide[]> {
  const hidden = new Set(await getHiddenDefaultBannerIds());
  const defaults = defaultBannerSlides.filter((s) => !hidden.has(s.id));
  const now = new Date();
  const banners = await prisma.banner.findMany({
    where: {
      active: true,
      AND: [
        { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
        { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
      ],
    },
    orderBy: { order: "asc" },
    include: { image: true },
  });
  const custom = banners.map((b) => ({
    id: b.id,
    heading: b.heading,
    subheading: b.subheading,
    ctaLabel: b.ctaLabel,
    ctaHref: b.ctaHref,
    image: b.image.url,
    imageAlt: b.image.altText ?? b.heading,
  }));
  return [...custom, ...defaults];
}

// ---------------------------------------------------------------------------
// Notices
// ---------------------------------------------------------------------------

export interface PublicNotice {
  id: string;
  title: string;
  body: string | null;
  type: "POPUP" | "TICKER" | "BANNER";
  linkHref: string | null;
  attachmentUrl: string | null;
  /** True for JPG/PNG/WebP attachments, false for PDFs and other documents. */
  attachmentIsImage: boolean;
  pinned: boolean;
  publishAt: string;
}

export async function getActiveNotices(): Promise<PublicNotice[]> {
  const now = new Date();
  const notices = await prisma.notice.findMany({
    where: {
      active: true,
      publishAt: { lte: now },
      OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
    },
    orderBy: [{ pinned: "desc" }, { publishAt: "desc" }],
    include: { attachment: true },
  });
  return notices.map((n) => ({
    id: n.id,
    title: n.title,
    body: n.body,
    type: n.type,
    linkHref: n.linkHref,
    attachmentUrl: n.attachment?.url ?? null,
    attachmentIsImage: n.attachment?.kind === "IMAGE",
    pinned: n.pinned,
    publishAt: n.publishAt.toISOString(),
  }));
}
