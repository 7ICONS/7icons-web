"use client";

import Link from "next/link";
import { useMemo } from "react";
import { scheduleEvents } from "@/data/schedule";

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatEventDate(dateString: string) {
  const date = parseLocalDate(dateString);

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
    fullDate: date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export default function PastEvents() {
  const pastEvents = useMemo(() => {
    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    return scheduleEvents
      .filter((event) => parseLocalDate(event.date) < today)
      .sort(
        (a, b) =>
          parseLocalDate(b.date).getTime() -
          parseLocalDate(a.date).getTime(),
      );
  }, []);

  if (pastEvents.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Schedule History
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Past Events
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Look back at previous 7ICONS performances, fan meetings,
            livestreams, and memorable moments shared with ICONIA.
          </p>
        </div>

        {/* History Timeline */}
        <div className="relative mt-10">
          {/* Vertical line desktop */}
          <div className="absolute bottom-0 left-[37px] top-0 hidden w-px bg-violet-100 sm:block" />

          <div className="space-y-5">
            {pastEvents.map((event) => {
              const formattedDate = formatEventDate(event.date);

              return (
                <article
                  key={event.id}
                  className="group relative sm:pl-24"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[31px] top-9 hidden h-3 w-3 rounded-full border-2 border-white bg-violet-400 shadow-sm sm:block" />

                  <div className="rounded-3xl border border-violet-100 bg-[#faf8ff] p-5 transition hover:border-violet-200 hover:bg-white hover:shadow-lg hover:shadow-violet-950/5 sm:p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                      {/* Date */}
                      <div className="flex h-[76px] w-[72px] shrink-0 flex-col items-center justify-center rounded-2xl border border-violet-100 bg-white">
                        <span className="text-2xl font-semibold leading-none text-slate-700">
                          {formattedDate.day}
                        </span>

                        <span className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-violet-500">
                          {formattedDate.month}
                        </span>

                        <span className="mt-0.5 text-[9px] text-slate-400">
                          {formattedDate.year}
                        </span>
                      </div>

                      {/* Event Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-600">
                            {event.type}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            Completed
                          </span>

                          <span className="text-xs text-slate-400">
                            {formattedDate.fullDate}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                          {event.title}
                        </h3>

                        <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-6">
                          <span>◷ {event.time}</span>
                          <span>⌖ {event.location}</span>
                        </div>

                        {event.description && (
                          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                            {event.description}
                          </p>
                        )}
                      </div>

                      {/* Detail Link */}
                      <div className="shrink-0">
                        <Link
                          href={`/schedule/${event.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                        >
                          View Details
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}