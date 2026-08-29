"use client";

import { useMemo, useState } from "react";
import { scheduleEvents } from "@/data/schedule";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatEventDate(dateString: string) {
  const date = parseLocalDate(dateString);

  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: monthNames[date.getMonth()].slice(0, 3).toUpperCase(),
  };
}

export default function UpcomingSchedule() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDay.getDate();

    // JavaScript:
    // Sunday = 0
    // Monday = 1
    //
    // Calendar kita:
    // Monday = 0
    // Sunday = 6
    const startingDay = (firstDay.getDay() + 6) % 7;

    const days: Array<number | null> = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [currentMonth, currentYear]);

  const upcomingEvents = useMemo(() => {
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return scheduleEvents
      .filter((event) => parseLocalDate(event.date) >= todayOnly)
      .sort(
        (a, b) =>
          parseLocalDate(a.date).getTime() -
          parseLocalDate(b.date).getTime(),
      )
      .slice(0, 4);
  }, []);

  function previousMonth() {
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1),
    );
  }

  function nextMonth() {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1),
    );
  }

  function hasEvent(day: number) {
    return scheduleEvents.some((event) => {
      const eventDate = parseLocalDate(event.date);

      return (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getDate() === day
      );
    });
  }

  function isToday(day: number) {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Upcoming Schedule
          </p>

          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Stay Updated with{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              7ICONS
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Keep up with upcoming performances, fan meetings,
            livestreams, appearances, and memorable moments with
            7ICONS.
          </p>
        </div>

        {/* Calendar + Events */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-10">
          {/* Calendar */}
          <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-950/5 sm:p-7">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={previousMonth}
                aria-label="Previous month"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 bg-white text-lg text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                ‹
              </button>

              <div className="text-center">
                <p className="text-lg font-semibold text-slate-950 sm:text-xl">
                  {monthNames[currentMonth]}
                </p>

                <p className="mt-0.5 text-xs font-semibold tracking-[0.15em] text-slate-400">
                  {currentYear}
                </p>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 bg-white text-lg text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                ›
              </button>
            </div>

            {/* Days */}
            <div className="mt-7 grid grid-cols-7 gap-1 text-center">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="aspect-square"
                    />
                  );
                }

                const eventExists = hasEvent(day);
                const todayDate = isToday(day);

                return (
                  <div
                    key={day}
                    className="flex aspect-square items-center justify-center"
                  >
                    <div
                      className={[
                        "relative flex h-9 w-9 items-center justify-center rounded-full text-sm transition sm:h-11 sm:w-11",
                        todayDate
                          ? "bg-gradient-to-br from-violet-700 to-purple-500 font-semibold text-white shadow-md shadow-violet-400/30"
                          : eventExists
                            ? "bg-violet-50 font-semibold text-violet-700"
                            : "text-slate-600",
                      ].join(" ")}
                    >
                      {day}

                      {eventExists && (
                        <span
                          className={[
                            "absolute bottom-1 h-1 w-1 rounded-full",
                            todayDate
                              ? "bg-white"
                              : "bg-violet-600",
                          ].join(" ")}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 border-t border-violet-50 pt-5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-700 to-purple-500" />
                Today
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-200" />
                Event
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="mb-5 flex items-end justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                  Coming Up
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  Upcoming Events
                </h3>
              </div>

              <span className="hidden text-xs text-slate-400 sm:block">
                Next {upcomingEvents.length} events
              </span>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => {
                  const formattedDate = formatEventDate(event.date);

                  return (
                    <article
                      key={event.id}
                      className="group rounded-2xl border border-violet-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/5 sm:p-5"
                    >
                      <div className="flex gap-4 sm:gap-5">
                        {/* Date */}
                        <div className="flex h-[72px] w-[66px] shrink-0 flex-col items-center justify-center rounded-2xl bg-violet-50">
                          <span className="text-2xl font-semibold leading-none text-violet-700">
                            {formattedDate.day}
                          </span>

                          <span className="mt-1 text-[10px] font-semibold tracking-[0.15em] text-violet-500">
                            {formattedDate.month}
                          </span>
                        </div>

                        {/* Event Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-600">
                              {event.type}
                            </span>
                          </div>

                          <h4 className="mt-2 text-base font-semibold text-slate-950 sm:text-lg">
                            {event.title}
                          </h4>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
                            <span>◷ {event.time}</span>
                            <span>⌖ {event.location}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/40 p-8 text-center">
                  <p className="font-semibold text-slate-800">
                    No upcoming events yet.
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    New schedules will appear here when they are
                    announced.
                  </p>
                </div>
              )}
            </div>

            {/* Future Full Schedule Button */}
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
              >
                View Full Schedule
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}