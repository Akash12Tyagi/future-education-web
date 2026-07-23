import { AdmissionConsultancyClient } from "@/components/consultancy/AdmissionConsultancyClient";
import { getFaqs } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/admission-consultancy",
    title: "Admission Consultancy",
    description: "Free, transparent admission counselling — how it works, what's included, and answers to common questions about scholarships and the application process.",
  });
}

export default async function AdmissionConsultancyPage() {
  const faqs = await getFaqs();
  return <AdmissionConsultancyClient faqs={faqs} />;
}
