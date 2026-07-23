// Seed-only fixture — kept for prisma/seed.ts, no longer imported by the UI
// (the live site reads counsellors from the database, see src/lib/site-data.ts).
interface CounsellorSeed {
  id: string;
  name: string;
  role: string;
  specialization: string;
  credentials: string;
  image: string;
  imageAlt: string;
}

export const counsellors: CounsellorSeed[] = [
  { id: "t1", name: "Anil Kumar Singh", role: "Director", specialization: "Overall counselling strategy & institute partnerships", credentials: "Founding director, Future Education Trust · 15+ years in educational consultancy", image: "/images/team/counsellor-01.jpg", imageAlt: "Portrait of a senior male education consultant in business attire" },
  { id: "t2", name: "Karim Ansari", role: "Director", specialization: "India & study-abroad admissions (UK, USA, Canada, Australia, Ireland, New Zealand)", credentials: "Founding director, Future Education Trust · personalised guidance from first visit to enrolment", image: "/images/team/counsellor-02.jpg", imageAlt: "Portrait of a male education consultant smiling in an office setting" },
  // { id: "t3", name: "Counselling & Admissions Team", role: "Senior Counsellors", specialization: "Medical, engineering, management, nursing, education & distance-learning admissions", credentials: "15+ years of combined counselling experience · physical visits to 2,000+ campuses", image: "/images/team/counsellor-03.jpg", imageAlt: "Portrait of a professional counsellor in business attire" },
];
