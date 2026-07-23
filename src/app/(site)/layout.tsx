import { AppStateProvider } from "@/context/app-state";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyEnquiryWidget } from "@/components/global/StickyEnquiryWidget";
import { CompareTray } from "@/components/global/CompareTray";
import { CallbackSheet } from "@/components/global/CallbackSheet";
import { NoticeTicker } from "@/components/global/NoticeTicker";
import { AnnouncementBanner } from "@/components/global/AnnouncementBanner";
import { NoticePopup } from "@/components/global/NoticePopup";
import { PageViewTracker } from "@/components/global/PageViewTracker";
import { BackToTop } from "@/components/global/BackToTop";
import { getColleges, getCourseOptions, getCounsellors, getActiveNotices } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [colleges, courseOptions, counsellors, notices] = await Promise.all([
    getColleges(),
    getCourseOptions(),
    getCounsellors(),
    getActiveNotices(),
  ]);

  return (
    <AppStateProvider initialColleges={colleges} initialCourseOptions={courseOptions} initialCounsellors={counsellors}>
      <AnnouncementBanner notices={notices} />
      <Header />
      <NoticeTicker notices={notices} />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyEnquiryWidget />
      <CompareTray />
      <CallbackSheet />
      <NoticePopup notices={notices} />
      <PageViewTracker />
      <BackToTop />
    </AppStateProvider>
  );
}
