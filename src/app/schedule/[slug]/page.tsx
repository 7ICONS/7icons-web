import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { scheduleEvents } from "@/data/schedule";

type ScheduleDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatFullDate(dateString: string) {
  return parseLocalDate(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return scheduleEvents.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: ScheduleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = scheduleEvents.find(
    (item) => item.slug === slug,
  );

  if (!event) {
    return {
      title: "Event Not Found | 7ICONS",
    };
  }

  return {
    title: `${event.title} | 7ICONS`,
    description: event.description,
  };
}

export default async function ScheduleDetailPage({
  params,
}: ScheduleDetailPageProps) {
  const { slug } = await params;

  const event = scheduleEvents.find(
    (item) => item.slug === slug,
  );

  if (!event) {
    notFound();
  }

  const fullDate = formatFullDate(event.date);

  // =========================================
  // EVENT STATUS
  // =========================================

  const today = new Date();

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const eventDate = parseLocalDate(event.date);

  const isPastEvent = eventDate < todayOnly;

  const eventStatus = isPastEvent
    ? "Completed"
    : "Upcoming";

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* =========================================
            EVENT HERO
        ========================================= */}

        <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
          {/* Background Decorations */}
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-[1000px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
            {/* Back Button */}
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
            >
              <span aria-hidden="true">←</span>
              Back to Schedule
            </Link>

            <div className="mt-10">
              {/* Event Type + Status */}
              <div className="flex flex-wrap gap-2">
                {/* Event Category */}
                <span className="inline-flex rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 backdrop-blur-sm">
                  {event.type}
                </span>

                {/* Event Status */}
                <span
                  className={[
                    "inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]",
                    isPastEvent
                      ? "bg-slate-100 text-slate-500"
                      : "bg-violet-700 text-white",
                  ].join(" ")}
                >
                  {eventStatus}
                </span>
              </div>

              {/* Event Title */}
              <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                {event.title}
              </h1>

              {/* Event Description */}
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {event.description}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            EVENT INFORMATION
        ========================================= */}

        <section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* =========================================
                MAIN CONTENT
            ========================================= */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Event Details
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                About This Event
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-700">
                {event.description}
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Stay connected with 7ICONS and ICONIA for the latest
                updates related to this schedule. Event information
                may be updated when additional details become
                available.
              </p>

              {/* Back to Schedule Card */}
              <div className="mt-12 rounded-3xl border border-violet-100 bg-[#faf8ff] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                  7ICONS Schedule
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  Explore more upcoming events.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  Visit the full schedule to discover upcoming
                  performances, fan meetings, livestreams, and other
                  activities from 7ICONS.
                </p>

                <Link
                  href="/schedule"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  ← Back to Schedule
                </Link>
              </div>
            </div>

            {/* =========================================
                EVENT SUMMARY
            ========================================= */}

            <aside className="h-fit rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-950/5 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Event Information
              </p>

              <div className="mt-6 space-y-6">
                {/* Date */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Date
                  </p>

                  <p className="mt-2 font-semibold leading-6 text-slate-900">
                    {fullDate}
                  </p>
                </div>

                {/* Time */}
                <div className="border-t border-violet-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Time
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {event.time}
                  </p>
                </div>

                {/* Location */}
                <div className="border-t border-violet-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Location
                  </p>

                  <p className="mt-2 font-semibold leading-6 text-slate-900">
                    {event.location}
                  </p>
                </div>

                {/* Category */}
                <div className="border-t border-violet-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Category
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                    {event.type}
                  </span>
                </div>

                {/* Status */}
                <div className="border-t border-violet-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Status
                  </p>

                  <span
                    className={[
                      "mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold",
                      isPastEvent
                        ? "bg-slate-100 text-slate-500"
                        : "bg-violet-50 text-violet-700",
                    ].join(" ")}
                  >
                    {eventStatus}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}