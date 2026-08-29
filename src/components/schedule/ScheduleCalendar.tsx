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

export default function ScheduleCalendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDay.getDate();

    // Monday = 0, Sunday = 6
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

  function previousMonth() {
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1),
    );

    setSelectedDate(null);
  }

  function nextMonth() {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1),
    );

    setSelectedDate(null);
  }

  function goToToday() {
    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), 1),
    );

    setSelectedDate(null);
  }

  function buildDateString(day: number) {
    const month = String(currentMonth + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${currentYear}-${month}-${date}`;
  }

  function getEventsForDay(day: number) {
    const dateString = buildDateString(day);

    return scheduleEvents.filter(
      (event) => event.date === dateString,
    );
  }

  function isToday(day: number) {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  }

  const selectedEvents = selectedDate
    ? scheduleEvents.filter(
        (event) => event.date === selectedDate,
      )
    : [];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Calendar
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Explore the Schedule
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Browse upcoming 7ICONS activities by month and select
              highlighted dates to see scheduled events.
            </p>
          </div>

          <button
            type="button"
            onClick={goToToday}
            className="w-fit rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            Today
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Main Calendar */}
          <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-950/5 sm:p-7 md:p-8">
            {/* Month Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={previousMonth}
                aria-label="Previous month"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-100 text-xl text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                ‹
              </button>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-950 sm:text-2xl">
                  {monthNames[currentMonth]}
                </h3>

                <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-slate-400">
                  {currentYear}
                </p>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-100 text-xl text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                ›
              </button>
            </div>

            {/* Weekday Names */}
            <div className="mt-8 grid grid-cols-7 text-center">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-xs"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Dates */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="aspect-square"
                    />
                  );
                }

                const events = getEventsForDay(day);
                const eventExists = events.length > 0;
                const todayDate = isToday(day);
                const dateString = buildDateString(day);
                const selected = selectedDate === dateString;

                return (
                  <div
                    key={day}
                    className="flex aspect-square items-center justify-center p-1"
                  >
                    <button
                      type="button"
                      disabled={!eventExists}
                      onClick={() => {
                        if (eventExists) {
                          setSelectedDate(dateString);
                        }
                      }}
                      className={[
                        "relative flex h-full w-full max-h-[64px] max-w-[64px] items-center justify-center rounded-2xl text-sm transition sm:text-base",
                        selected
                          ? "bg-violet-700 font-semibold text-white shadow-lg shadow-violet-300/40"
                          : todayDate
                            ? "bg-gradient-to-br from-violet-700 to-purple-500 font-semibold text-white shadow-md shadow-violet-300/30"
                            : eventExists
                              ? "cursor-pointer bg-violet-50 font-semibold text-violet-700 hover:bg-violet-100"
                              : "cursor-default text-slate-600",
                      ].join(" ")}
                    >
                      {day}

                      {eventExists && (
                        <span
                          className={[
                            "absolute bottom-1.5 h-1.5 w-1.5 rounded-full",
                            selected || todayDate
                              ? "bg-white"
                              : "bg-violet-600",
                          ].join(" ")}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-7 flex flex-wrap gap-5 border-t border-violet-100 pt-5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gradient-to-br from-violet-700 to-purple-500" />
                Today
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-violet-200" />
                Scheduled Event
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-violet-700" />
                Selected
              </div>
            </div>
          </div>

          {/* Selected Date Panel */}
          <div className="rounded-3xl border border-violet-100 bg-[#faf8ff] p-5 sm:p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
              Selected Date
            </p>

            {selectedDate ? (
              <>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  {parseLocalDate(selectedDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </h3>

                <div className="mt-7 space-y-4">
                  {selectedEvents.map((event) => (
                    <article
                      key={event.id}
                      className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
                    >
                      <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-600">
                        {event.type}
                      </span>

                      <h4 className="mt-3 text-lg font-semibold text-slate-950">
                        {event.title}
                      </h4>

                      <div className="mt-3 space-y-2 text-sm text-slate-500">
                        <p>◷ {event.time}</p>
                        <p>⌖ {event.location}</p>
                      </div>

                      {event.description && (
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {event.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-8 flex min-h-[280px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                  📅
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  Choose an event date
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Select a highlighted date on the calendar to see
                  the event scheduled for that day.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}