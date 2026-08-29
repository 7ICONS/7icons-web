"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  scheduleEvents,
  type ScheduleType,
} from "@/data/schedule";

type FilterType = "All" | ScheduleType;

const filters: FilterType[] = [
  "All",
  "Performance",
  "Fan Meeting",
  "Livestream",
  "TV",
  "Other",
];

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

export default function ScheduleEvents() {
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("All");

  const upcomingEvents = useMemo(() => {
    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    return scheduleEvents
      .filter((event) => {
        const eventDate = parseLocalDate(event.date);

        const isUpcoming = eventDate >= today;

        const matchesFilter =
          activeFilter === "All" ||
          event.type === activeFilter;

        return isUpcoming && matchesFilter;
      })
      .sort(
        (a, b) =>
          parseLocalDate(a.date).getTime() -
          parseLocalDate(b.date).getTime(),
      );
  }, [activeFilter]);

  return (
    <section className="relative overflow-hidden bg-[#faf8ff] py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Upcoming Events
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            What&apos;s Coming Next
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Explore upcoming performances, fan meetings,
            livestreams, media appearances, and other activities
            from 7ICONS.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "border-violet-700 bg-violet-700 text-white shadow-md shadow-violet-300/30"
                    : "border-violet-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700",
                ].join(" ")}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Result Count */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {upcomingEvents.length}
            </span>{" "}
            upcoming{" "}
            {upcomingEvents.length === 1
              ? "event"
              : "events"}
          </p>

          {activeFilter !== "All" && (
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="text-sm font-semibold text-violet-700 transition hover:text-violet-900"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Events */}
        <div className="mt-6 space-y-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              const formattedDate = formatEventDate(
                event.date,
              );

              return (
                <article
                  key={event.id}
                  className="group rounded-3xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5 sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Date */}
                    <div className="flex sm:block">
                      <div className="flex h-[82px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50">
                        <span className="text-2xl font-semibold leading-none text-violet-700">
                          {formattedDate.day}
                        </span>

                        <span className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-violet-500">
                          {formattedDate.month}
                        </span>

                        <span className="mt-0.5 text-[9px] text-slate-400">
                          {formattedDate.year}
                        </span>
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-600">
                          {event.type}
                        </span>

                        <span className="text-xs text-slate-400">
                          {formattedDate.fullDate}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                        {event.title}
                      </h3>

                      <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-6">
                        <span>
                          ◷ {event.time}
                        </span>

                        <span>
                          ⌖ {event.location}
                        </span>
                      </div>

                      {event.description && (
                        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Detail Button */}
                    {/* Detail Button */}
<div className="shrink-0 sm:self-center">
  <Link
    href={`/schedule/${event.slug}`}
    className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition group-hover:border-violet-300 group-hover:bg-violet-50"
  >
    View Details
    <span aria-hidden="true">→</span>
  </Link>
</div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-violet-200 bg-white/70 px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                📅
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                No upcoming events
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                There are currently no upcoming events in this
                category. Try another filter or check back later.
              </p>

              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className="mt-5 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
              >
                Show All Events
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}