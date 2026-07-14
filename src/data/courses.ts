import type { Course, CourseOption } from "@/lib/types";

export const courses: Course[] = [
  { id: "c1", slug: "mbbs", name: "MBBS", stream: "medical", streamLabel: "Medical", type: "regular", duration: "4 years", durMonths: 48, eligibility: "10+2 with Physics, Chemistry & Biology · NEET-UG qualified", feeMin: 500000, feeMax: 1500000, outcomes: ["Physician", "Medical Officer", "Junior Resident"], collegeCount: 45 },
  { id: "c2", slug: "bds", name: "BDS", stream: "medical", streamLabel: "Medical", type: "regular", duration: "4 years", durMonths: 48, eligibility: "10+2 with PCB · NEET-UG qualified", feeMin: 300000, feeMax: 900000, outcomes: ["Dental Surgeon", "Orthodontist (with further study)"], collegeCount: 25 },
  { id: "c3", slug: "md-ms", name: "MD / MS", stream: "medical", streamLabel: "Medical", type: "regular", duration: "2 years", durMonths: 24, eligibility: "MBBS with NEET-PG qualification", feeMin: 800000, feeMax: 2000000, outcomes: ["Specialist Physician", "Surgeon"], collegeCount: 15 },
  { id: "c4", slug: "nursing", name: "Nursing (GNM / ANM / B.Sc)", stream: "nursing", streamLabel: "Nursing", type: "regular", duration: "3–4 years, course-dependent", durMonths: 42, eligibility: "10+2 with PCB (B.Sc) · 10+2 any stream (GNM/ANM)", feeMin: 100000, feeMax: 400000, outcomes: ["Staff Nurse", "Community Health Nurse"], collegeCount: 60 },
  { id: "c5", slug: "btech", name: "B.Tech (CSE / ECE / Mechanical / EEE)", stream: "engineering", streamLabel: "Engineering", type: "regular", duration: "4 years", durMonths: 48, eligibility: "10+2 with PCM · JEE or state entrance exam", feeMin: 200000, feeMax: 800000, outcomes: ["Software Engineer", "Field Engineer", "Systems Analyst"], collegeCount: 150 },
  { id: "c6", slug: "mba", name: "MBA (University Programme)", stream: "management", streamLabel: "Management", type: "regular", duration: "2 years", durMonths: 24, eligibility: "Graduation in any stream · CAT / MAT / CMAT", feeMin: 300000, feeMax: 1200000, outcomes: ["Business Analyst", "Manager"], collegeCount: 90 },
  { id: "c7", slug: "pgdm", name: "PGDM (Autonomous Programme)", stream: "management", streamLabel: "Management", type: "regular", duration: "2 years", durMonths: 24, eligibility: "Graduation in any stream", feeMin: 400000, feeMax: 1400000, outcomes: ["Consultant", "Product Manager"], collegeCount: 40 },
  { id: "c8", slug: "bed", name: "B.Ed", stream: "education", streamLabel: "Education", type: "regular", duration: "2 years", durMonths: 24, eligibility: "Graduation with 50%+ marks", feeMin: 50000, feeMax: 200000, outcomes: ["School Teacher", "Academic Coordinator"], collegeCount: 70 },
  { id: "c9", slug: "distance-mba-pgdm", name: "Distance MBA / PGDM", stream: "management", streamLabel: "Management", type: "distance", duration: "2 years", durMonths: 24, eligibility: "Graduation in any stream", feeMin: 60000, feeMax: 180000, outcomes: ["Career upskilling for working professionals"], collegeCount: 20 },
  { id: "c10", slug: "bca-mca", name: "BCA / MCA", stream: "engineering", streamLabel: "Computer Applications", type: "distance", duration: "3 years (BCA) · 2 years (MCA)", durMonths: 36, eligibility: "10+2 with Maths (BCA) · Graduation with Maths (MCA)", feeMin: 90000, feeMax: 300000, outcomes: ["Application Developer", "IT Support Executive"], collegeCount: 30 },
  { id: "c11", slug: "vocational-programmes", name: "BJMC / B.P.Ed / Biotech & other vocational programmes", stream: "distance", streamLabel: "Vocational", type: "distance", duration: "Varies by programme", durMonths: 30, eligibility: "Eligibility confirmed during counselling", feeMin: 60000, feeMax: 250000, outcomes: ["Media & Communication", "Physical Education", "Biotechnology"], collegeCount: 25 },
];

export const courseOptions: CourseOption[] = [
  ...courses.map((c) => ({ value: c.slug, label: c.name })),
  { value: "other", label: "Not sure yet" },
];
