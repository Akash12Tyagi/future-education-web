export type Lang = "en" | "hi";

export interface Dict {
  heroHead: string;
  heroSub: string;
  heroHook: string;
  heroLine2: string;
  heroLine3: string;
  ctaPrimary: string;
  ctaSecondary: string;
  processTitle: string;
  steps: string[];
  langLabel: string;
}

export const dict: Record<Lang, Dict> = {
  en: {
    heroHead: "Find the right MBBS, B.Tech or MBA college — guided by 15+ years of admission counselling",
    heroSub: "A transparent shortlist, a real counsellor on the phone, and side-by-side comparisons across our network of 5,000+ associate institutes. This is the guidance 11,690+ students have relied on.",
    heroHook: "Your Future,",
    heroLine2: "Honestly Guided",
    heroLine3: "Into the Right College",
    ctaPrimary: "Find My Course",
    ctaSecondary: "Talk to a Counsellor",
    processTitle: "How our admission consultancy works",
    steps: ["Free Counselling Call", "Course & College Shortlist", "Apply & Documentation", "Confirm & Enroll"],
    langLabel: "हिन्दी",
  },
  hi: {
    heroHead: "सही MBBS, B.Tech या MBA कॉलेज खोजें — 15+ साल के एडमिशन काउंसलिंग अनुभव के साथ",
    heroSub: "पारदर्शी शॉर्टलिस्ट, फोन पर असली काउंसलर और हमारे 5,000+ संबद्ध संस्थानों में आमने-सामने तुलना। यही वह मार्गदर्शन है जिस पर 11,690+ छात्रों ने भरोसा किया है।",
    heroHook: "आपका भविष्य,",
    heroLine2: "ईमानदारी से निर्देशित",
    heroLine3: "सही कॉलेज की ओर",
    ctaPrimary: "मेरा कोर्स खोजें",
    ctaSecondary: "काउंसलर से बात करें",
    processTitle: "हमारी एडमिशन काउंसलिंग कैसे काम करती है",
    steps: ["मुफ्त काउंसलिंग कॉल", "कोर्स और कॉलेज शॉर्टलिस्ट", "आवेदन और दस्तावेज़", "पुष्टि और एडमिशन"],
    langLabel: "English",
  },
};
