import { HeroCarousel } from "@/components/home/HeroCarousel";
import { NotificationBoard } from "@/components/home/NotificationBoard";
import { StartHere } from "@/components/home/StartHere";
import { CourseTags } from "@/components/home/CourseTags";
import { BuildFuture } from "@/components/home/BuildFuture";
import { BeyondCounselling } from "@/components/home/BeyondCounselling";
import { FeaturedColleges } from "@/components/home/FeaturedColleges";
import { GoverningTeam } from "@/components/home/GoverningTeam";
import { FinalCta } from "@/components/home/FinalCta";
import { buildNotifications } from "@/lib/notifications";
import {
  getColleges,
  getCounsellors,
  getStories,
  getActiveBanners,
  getActiveNotices,
  getNewsEvents,
  getCourseCategories,
} from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [colleges, stories, counsellors, banners, notices, news, categories] = await Promise.all([
    getColleges(),
    getStories(),
    getCounsellors(),
    getActiveBanners(),
    getActiveNotices(),
    getNewsEvents(),
    getCourseCategories(),
  ]);
  const notifications = buildNotifications(notices, news);

  return (
    <div className="bg-white text-neutral-900">
      <HeroCarousel slides={banners} />
      <NotificationBoard notices={notifications.notices} news={notifications.news} />
      <StartHere />
      <CourseTags categories={categories} />
      <BuildFuture stories={stories} />
      <BeyondCounselling />
      <FeaturedColleges colleges={colleges} />
      <GoverningTeam counsellors={counsellors} />
      <FinalCta />
    </div>
  );
}
