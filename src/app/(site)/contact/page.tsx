import { ContactClient } from "@/components/contact/ContactClient";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with Future Education Trust — free admission counselling by phone, WhatsApp, or in person at our Bokaro Steel City office.",
  });
}

export default function ContactPage() {
  return <ContactClient />;
}
