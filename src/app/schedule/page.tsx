import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import ScheduleHero from "@/components/schedule/ScheduleHero";
import ScheduleCalendar from "@/components/schedule/ScheduleCalendar";
import ScheduleEvents from "@/components/schedule/ScheduleEvents";
import PastEvents from "@/components/schedule/PastEvents";

import { getPublishedScheduleEvents } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const events = await getPublishedScheduleEvents();

  return (
    <>
      <Navbar />

      <main>
        <ScheduleHero />

        <ScheduleCalendar events={events} />

        <ScheduleEvents events={events} />

        <PastEvents events={events} />
      </main>

      <Footer />
    </>
  );
}