export type ScheduleType =
  | "Performance"
  | "Fan Meeting"
  | "Livestream"
  | "TV"
  | "Other";

export type ScheduleEvent = {
  id: number;
  slug: string;
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
    slug: "7icons-live-performance",
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
    slug: "7icons-fan-meeting",
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
    slug: "7icons-weekly-livestream",
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
    slug: "tv-program-appearance",
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
    slug: "iconia-community-night",
    title: "ICONIA Community Night",
    date: "2026-09-20",
    time: "19:30 WIB",
    location: "Online",
    type: "Other",
    description:
      "A community night bringing ICONIA together from different regions.",
  },
    {
    id: 6,
    slug: "7icons-summer-stage",
    title: "7ICONS Summer Stage",
    date: "2026-08-16",
    time: "18:30 WIB",
    location: "Jakarta",
    type: "Performance",
    description:
      "A summer stage performance featuring 7ICONS and memorable moments shared with ICONIA.",
  },
  {
    id: 7,
    slug: "iconia-online-gathering",
    title: "ICONIA Online Gathering",
    date: "2026-08-09",
    time: "20:00 WIB",
    location: "Online",
    type: "Fan Meeting",
    description:
      "An online gathering bringing 7ICONS and ICONIA together for stories, updates, and community moments.",
  },
  {
    id: 8,
    slug: "7icons-special-livestream",
    title: "7ICONS Special Livestream",
    date: "2026-08-02",
    time: "19:30 WIB",
    location: "7ICONS Official YouTube",
    type: "Livestream",
    description:
      "A special livestream featuring conversations, updates, and memorable moments with 7ICONS.",
  },
];