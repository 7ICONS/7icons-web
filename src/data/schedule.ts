export type ScheduleType =
  | "Performance"
  | "Fan Meeting"
  | "Livestream"
  | "TV"
  | "Other";

export type ScheduleEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: ScheduleType;
  description?: string;
};

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "7ICONS Live Performance",
    date: "2026-08-29",
    time: "19:00 WIB",
    location: "Jakarta Convention Center",
    type: "Performance",
    description:
      "A special live performance featuring 7ICONS together with ICONIA.",
  },
  {
    id: 2,
    title: "7ICONS Fan Meeting",
    date: "2026-08-31",
    time: "20:00 WIB",
    location: "Online",
    type: "Fan Meeting",
    description:
      "An online fan meeting and community session with ICONIA.",
  },
  {
    id: 3,
    title: "7ICONS Weekly Livestream",
    date: "2026-09-05",
    time: "20:00 WIB",
    location: "7ICONS Official YouTube",
    type: "Livestream",
    description:
      "Weekly livestream with updates, stories, and moments from 7ICONS.",
  },
  {
    id: 4,
    title: "TV Program Appearance",
    date: "2026-09-12",
    time: "19:00 WIB",
    location: "Entertainment TV",
    type: "TV",
    description:
      "7ICONS will appear as special guests on an entertainment program.",
  },
  {
    id: 5,
    title: "ICONIA Community Night",
    date: "2026-09-20",
    time: "19:30 WIB",
    location: "Online",
    type: "Other",
    description:
      "A community night bringing ICONIA together from different regions.",
  },
];