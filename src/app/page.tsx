import FeaturedArticles from "@/components/home/FeaturedArticles";
import Hero from "@/components/home/Hero";
import IconiaAcrossIndonesia from "@/components/home/IconiaAcrossIndonesia";
import MeetMembers from "@/components/home/MeetMembers";
import UpcomingSchedule from "@/components/home/UpcomingSchedule";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { getPublishedScheduleEvents } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function Home() {
  const scheduleEvents =
    await getPublishedScheduleEvents();

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <FeaturedArticles />

        <MeetMembers />

        <UpcomingSchedule
          events={scheduleEvents}
        />

        <IconiaAcrossIndonesia />
      </main>

      <Footer />
    </>
  );
}