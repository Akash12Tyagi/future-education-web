import { Hero } from "@/components/home/Hero";
import { TrustStatsBar } from "@/components/home/TrustStatsBar";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { MatcherTeaser } from "@/components/home/MatcherTeaser";
import { PopularStreams } from "@/components/home/PopularStreams";
import { FeaturedColleges } from "@/components/home/FeaturedColleges";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { HomeSuccessStories } from "@/components/home/HomeSuccessStories";
import { GoverningTeam } from "@/components/home/GoverningTeam";
import { FinalCta } from "@/components/home/FinalCta";
import { getColleges, getCounsellors, getStories, getActiveBanners } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [colleges, stories, counsellors, banners] = await Promise.all([
    getColleges(),
    getStories(),
    getCounsellors(),
    getActiveBanners(),
  ]);

  return (
    <div>
      <Hero banners={banners} />
      <TrustStatsBar />
      <AboutTeaser />
      <MatcherTeaser />
      <PopularStreams />
      <FeaturedColleges colleges={colleges} />
      <ProcessStrip />
      <HomeSuccessStories stories={stories} />
      <GoverningTeam counsellors={counsellors} />
      <FinalCta />
    </div>
  );
}
