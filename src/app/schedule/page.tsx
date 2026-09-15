import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PastEvents from "@/components/schedule/PastEvents";
import ScheduleCalendar from "@/components/schedule/ScheduleCalendar";
import ScheduleEvents from "@/components/schedule/ScheduleEvents";
import ScheduleHero from "@/components/schedule/ScheduleHero";
import { getPublishedScheduleEvents } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Schedule",
};

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