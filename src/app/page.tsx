import { Hero } from "@/components/home/Hero";
import { TrustStatsBar } from "@/components/home/TrustStatsBar";
import { MatcherTeaser } from "@/components/home/MatcherTeaser";
import { PopularStreams } from "@/components/home/PopularStreams";
import { FeaturedColleges } from "@/components/home/FeaturedColleges";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { HomeSuccessStories } from "@/components/home/HomeSuccessStories";
import { GoverningTeam } from "@/components/home/GoverningTeam";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustStatsBar />
      <MatcherTeaser />
      <PopularStreams />
      <FeaturedColleges />
      <ProcessStrip />
      <HomeSuccessStories />
      <GoverningTeam />
      <FinalCta />
    </div>
  );
}
