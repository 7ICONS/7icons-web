import { supabase } from "@/lib/supabase";

export type ScheduleType =
  | "Performance"
  | "Fan Meeting"
  | "Livestream"
  | "TV"
  | "Other";

export type ScheduleEvent = {
  id: string;
  slug: string;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  event_type: ScheduleType;
  description: string;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPublishedScheduleEvents() {
  const { data, error } = await supabase
    .from("schedule_events")
    .select(
      `
        id,
        slug,
        title,
        event_date,
        event_time,
        location,
        event_type,
        description,
        is_published,
        is_featured,
        created_at,
        updated_at
      `,
    )
    .eq("is_published", true)
    .order("event_date", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Failed to load schedule events:",
      error,
    );

    return [];
  }

  return (data ?? []) as ScheduleEvent[];
}

export async function getPublishedScheduleEventBySlug(
  slug: string,
) {
  const { data, error } = await supabase
    .from("schedule_events")
    .select(
      `
        id,
        slug,
        title,
        event_date,
        event_time,
        location,
        event_type,
        description,
        is_published,
        is_featured,
        created_at,
        updated_at
      `,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error(
      "Failed to load schedule event:",
      error,
    );

    return null;
  }

  return data as ScheduleEvent | null;
}

export async function getUpcomingScheduleEvents(
  limit = 3,
) {
  const today = new Date();

  const dateKey = [
    today.getFullYear(),
    String(
      today.getMonth() + 1,
    ).padStart(2, "0"),
    String(today.getDate()).padStart(
      2,
      "0",
    ),
  ].join("-");

  const { data, error } = await supabase
    .from("schedule_events")
    .select(
      `
        id,
        slug,
        title,
        event_date,
        event_time,
        location,
        event_type,
        description,
        is_published,
        is_featured,
        created_at,
        updated_at
      `,
    )
    .eq("is_published", true)
    .gte("event_date", dateKey)
    .order("event_date", {
      ascending: true,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Failed to load upcoming schedule events:",
      error,
    );

    return [];
  }

  return (data ?? []) as ScheduleEvent[];
}