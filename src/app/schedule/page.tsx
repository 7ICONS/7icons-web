import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScheduleHero from "@/components/schedule/ScheduleHero";
import ScheduleCalendar from "@/components/schedule/ScheduleCalendar";
import ScheduleEvents from "@/components/schedule/ScheduleEvents";
import PastEvents from "@/components/schedule/PastEvents";

export default function SchedulePage() {
  return (
    <>
      <Navbar />

      <main>
        <ScheduleHero />
        <ScheduleCalendar />
        <ScheduleEvents />
        <PastEvents />
      </main>

      <Footer />
    </>
  );
}