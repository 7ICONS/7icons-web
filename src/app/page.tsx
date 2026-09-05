import FeaturedArticles from "@/components/home/FeaturedArticles";
import Hero from "@/components/home/Hero";
import IconiaAcrossIndonesia from "@/components/home/IconiaAcrossIndonesia";
import MeetMembers from "@/components/home/MeetMembers";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import UpcomingSchedule from "@/components/home/UpcomingSchedule";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedArticles />
        <MeetMembers />
        <UpcomingSchedule />
        <IconiaAcrossIndonesia />
      </main>

      <Footer />
    </>
  );
}