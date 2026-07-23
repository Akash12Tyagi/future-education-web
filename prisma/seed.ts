/**
 * One-time migration seed: copies today's static src/data/*.ts fixtures into
 * the database so the CMS launches already populated with real content.
 * Safe to re-run — every insert is an upsert keyed on a natural unique field.
 */
import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { Role, CourseType, CollegeType, IncomeBracket, MediaKind, GalleryCategory } from "../generated/prisma/enums";

import { streamsMeta } from "../src/data/streams";
import { courses } from "../src/data/courses";
import { colleges } from "../src/data/colleges";
import { counsellors } from "../src/data/counsellors";
import { stories } from "../src/data/stories";
import { mediaData } from "../src/data/media";
import { schemes } from "../src/data/schemes";
import { faqData } from "../src/data/faq";
import { timelineData } from "../src/data/timeline";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const courseTypeMap: Record<string, CourseType> = {
  regular: CourseType.REGULAR,
  distance: CourseType.DISTANCE,
};

const collegeTypeMap: Record<string, CollegeType> = {
  government: CollegeType.GOVERNMENT,
  private: CollegeType.PRIVATE,
  deemed: CollegeType.DEEMED,
};

const incomeMap: Record<string, IncomeBracket> = {
  "below_2.5L": IncomeBracket.BELOW_2_5L,
  "2.5L_5L": IncomeBracket.BETWEEN_2_5L_5L,
  "5L_plus": IncomeBracket.ABOVE_5L,
};

// Story course text doesn't always exactly match a Course.name (e.g. "B.Sc
// Nursing" vs "Nursing (GNM / ANM / B.Sc)") — explicit overrides for the
// known mismatches in today's 6 fixture stories rather than fuzzy matching.
const storyCourseSlugOverrides: Record<string, string> = {
  "priya-nursing": "nursing",
  "rahul-btech": "btech",
  "sneha-mba": "mba",
  "imran-pgdm": "pgdm",
};

const mediaAssetCache = new Map<string, string>();

async function getOrCreateLocalImageAsset(localPath: string, altText: string, folder: string) {
  const cached = mediaAssetCache.get(localPath);
  if (cached) return cached;

  const existing = await prisma.mediaAsset.findFirst({ where: { pathname: localPath } });
  if (existing) {
    mediaAssetCache.set(localPath, existing.id);
    return existing.id;
  }

  const filename = localPath.split("/").pop() ?? localPath;
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const mimeType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";

  const created = await prisma.mediaAsset.create({
    data: {
      url: localPath,
      pathname: localPath,
      filename,
      kind: MediaKind.IMAGE,
      mimeType,
      size: 0,
      altText,
      folder,
    },
  });
  mediaAssetCache.set(localPath, created.id);
  return created.id;
}

async function seedAdminUser() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) {
    console.warn("ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD not set — skipping admin user seed.");
    return;
  }
  const passwordHash = await hash(password, 12);
  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {},
    create: {
      name: "Super Admin",
      email: email.toLowerCase(),
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`Seeded SUPER_ADMIN user: ${email}`);
}

async function seedStreams() {
  const idByKey = new Map<string, string>();
  for (const [i, s] of streamsMeta.entries()) {
    const row = await prisma.stream.upsert({
      where: { key: s.key },
      update: { label: s.label, desc: s.desc },
      create: { key: s.key, label: s.label, desc: s.desc },
    });
    idByKey.set(s.key, row.id);
    void i;
  }
  return idByKey;
}

async function seedCourses(streamIdByKey: Map<string, string>) {
  const idBySlug = new Map<string, string>();
  for (const [i, c] of courses.entries()) {
    const streamId = streamIdByKey.get(c.stream);
    if (!streamId) throw new Error(`Unknown stream key: ${c.stream}`);
    const row = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        streamId,
        type: courseTypeMap[c.type],
        duration: c.duration,
        durMonths: c.durMonths,
        eligibility: c.eligibility,
        feeMin: c.feeMin,
        feeMax: c.feeMax,
        outcomes: c.outcomes,
        order: i,
      },
      create: {
        slug: c.slug,
        name: c.name,
        streamId,
        type: courseTypeMap[c.type],
        duration: c.duration,
        durMonths: c.durMonths,
        eligibility: c.eligibility,
        feeMin: c.feeMin,
        feeMax: c.feeMax,
        outcomes: c.outcomes,
        order: i,
      },
    });
    idBySlug.set(c.slug, row.id);
  }
  return idBySlug;
}

async function seedColleges(courseIdBySlug: Map<string, string>) {
  const idBySlug = new Map<string, string>();
  const slugByOldId = new Map(courses.map((c) => [c.id, c.slug]));

  for (const [i, college] of colleges.entries()) {
    const imageId = await getOrCreateLocalImageAsset(college.image, college.imageAlt, "colleges");

    const row = await prisma.college.upsert({
      where: { slug: college.slug },
      update: {
        name: college.name,
        city: college.city,
        state: college.state,
        type: collegeTypeMap[college.type],
        accreditations: college.acc,
        feeMin: college.feeMin,
        feeMax: college.feeMax,
        isVerifiedPartner: college.isVerifiedPartner,
        hasVideo: college.video,
        websiteUrl: college.website,
        imageId,
        imageAlt: college.imageAlt,
        order: i,
      },
      create: {
        slug: college.slug,
        name: college.name,
        city: college.city,
        state: college.state,
        type: collegeTypeMap[college.type],
        accreditations: college.acc,
        feeMin: college.feeMin,
        feeMax: college.feeMax,
        isVerifiedPartner: college.isVerifiedPartner,
        hasVideo: college.video,
        websiteUrl: college.website,
        imageId,
        imageAlt: college.imageAlt,
        order: i,
      },
    });
    idBySlug.set(college.slug, row.id);

    await prisma.collegeCourse.deleteMany({ where: { collegeId: row.id } });
    const courseSlugs = college.courseIds.map((oldId) => slugByOldId.get(oldId)).filter((s): s is string => !!s);
    for (const slug of courseSlugs) {
      const courseId = courseIdBySlug.get(slug);
      if (!courseId) continue;
      await prisma.collegeCourse.create({ data: { collegeId: row.id, courseId } });
    }
  }
  return idBySlug;
}

async function seedCounsellors() {
  for (const [i, c] of counsellors.entries()) {
    const slug = slugify(c.name);
    const imageId = await getOrCreateLocalImageAsset(c.image, c.imageAlt, "counsellors");
    await prisma.counsellor.upsert({
      where: { slug },
      update: {
        name: c.name,
        role: c.role,
        specialization: c.specialization,
        credentials: c.credentials,
        imageId,
        imageAlt: c.imageAlt,
        order: i,
      },
      create: {
        slug,
        name: c.name,
        role: c.role,
        specialization: c.specialization,
        credentials: c.credentials,
        imageId,
        imageAlt: c.imageAlt,
        order: i,
      },
    });
  }
}

async function seedStories(
  courseIdBySlug: Map<string, string>,
  collegeIdBySlug: Map<string, string>,
  streamIdByKey: Map<string, string>,
) {
  const collegeIdByName = new Map(colleges.map((c) => [c.name, collegeIdBySlug.get(c.slug)]));
  const courseIdByName = new Map(courses.map((c) => [c.name.toLowerCase(), courseIdBySlug.get(c.slug)]));

  for (const [i, s] of stories.entries()) {
    const collegeId = collegeIdByName.get(s.college) ?? null;
    const overrideSlug = storyCourseSlugOverrides[s.slug];
    const courseId = overrideSlug ? (courseIdBySlug.get(overrideSlug) ?? null) : (courseIdByName.get(s.course.toLowerCase()) ?? null);
    const streamId = streamIdByKey.get(s.stream) ?? null;

    await prisma.story.upsert({
      where: { slug: s.slug },
      update: { name: s.name, courseId, collegeId, streamId, quote: s.quote, year: s.year, verified: s.verified, order: i },
      create: { slug: s.slug, name: s.name, courseId, collegeId, streamId, quote: s.quote, year: s.year, verified: s.verified, order: i },
    });
  }
}

async function seedGallery() {
  const album = await prisma.galleryAlbum.upsert({
    where: { slug: "events-media" },
    update: {},
    create: { title: "Events & Media", slug: "events-media", category: GalleryCategory.EVENTS },
  });

  await prisma.galleryItem.deleteMany({ where: { albumId: album.id } });
  for (const [i, m] of mediaData.entries()) {
    const mediaId = await getOrCreateLocalImageAsset(m.image, m.imageAlt, "gallery");
    await prisma.galleryItem.create({ data: { albumId: album.id, mediaId, caption: `${m.kind} — ${m.caption}`, order: i } });
  }
}

async function seedScholarships() {
  for (const [i, s] of schemes.entries()) {
    await prisma.scholarship.upsert({
      where: { id: s.id },
      update: { name: s.name, desc: s.desc, income: incomeMap[s.income], order: i },
      create: { id: s.id, name: s.name, desc: s.desc, income: incomeMap[s.income], order: i },
    });
  }
}

async function seedFaqs() {
  for (const [i, f] of faqData.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: f.q } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: { answer: f.a, order: i } });
    } else {
      await prisma.faq.create({ data: { category: "admissions", question: f.q, answer: f.a, order: i } });
    }
  }
}

async function seedAboutTimeline() {
  const value = JSON.parse(JSON.stringify(timelineData));
  await prisma.siteSetting.upsert({
    where: { key: "about_timeline" },
    update: { value },
    create: { key: "about_timeline", value },
  });
}

async function main() {
  await seedAdminUser();
  const streamIdByKey = await seedStreams();
  const courseIdBySlug = await seedCourses(streamIdByKey);
  const collegeIdBySlug = await seedColleges(courseIdBySlug);
  await seedCounsellors();
  await seedStories(courseIdBySlug, collegeIdBySlug, streamIdByKey);
  await seedGallery();
  await seedScholarships();
  await seedFaqs();
  await seedAboutTimeline();
  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
