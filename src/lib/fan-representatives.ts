import { supabase } from "@/lib/supabase";

export type RepresentativeSection = {
  heading?: string;
  paragraphs: string[];
};

export type FanRepresentative = {
  id: string;
  slug: string;
  name: string;
  region: string;
  city: string;
  role: string;
  image: string;
  shortBio: string;
  since: string;

  instagram?: string;
  instagramUrl?: string;
  whatsapp?: string;

  profile?: {
    description: string;
    mission: string;
    motto: string;
    sections: RepresentativeSection[];
  };
};

type FanRepresentativeRow = {
  id: string;
  slug: string;
  name: string;
  region: string;
  city: string;
  role: string;
  image_url: string;
  short_bio: string;
  since: string;
  instagram: string;
  instagram_url: string;
  whatsapp: string;
  profile_description: string;
  profile_mission: string;
  profile_motto: string;
  profile_sections: unknown;
};

function normalizeProfileSections(
  value: unknown,
): RepresentativeSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (
        item,
      ): item is Record<string, unknown> =>
        typeof item === "object" &&
        item !== null,
    )
    .map((item) => ({
      heading:
        typeof item.heading === "string"
          ? item.heading
          : undefined,

      paragraphs: Array.isArray(
        item.paragraphs,
      )
        ? item.paragraphs.filter(
            (
              paragraph,
            ): paragraph is string =>
              typeof paragraph === "string",
          )
        : [],
    }));
}

function mapRepresentative(
  row: FanRepresentativeRow,
): FanRepresentative {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region,
    city: row.city,
    role: row.role,
    image: row.image_url,
    shortBio: row.short_bio,
    since: row.since,

    instagram:
      row.instagram || undefined,

    instagramUrl:
      row.instagram_url || undefined,

    whatsapp:
      row.whatsapp || undefined,

    profile: {
      description:
        row.profile_description,

      mission:
        row.profile_mission,

      motto:
        row.profile_motto,

      sections:
        normalizeProfileSections(
          row.profile_sections,
        ),
    },
  };
}

const representativeSelect = `
  id,
  slug,
  name,
  region,
  city,
  role,
  image_url,
  short_bio,
  since,
  instagram,
  instagram_url,
  whatsapp,
  profile_description,
  profile_mission,
  profile_motto,
  profile_sections
`;

export async function getPublishedFanRepresentatives(): Promise<
  FanRepresentative[]
> {
  const { data, error } =
    await supabase
      .from("fan_representatives")
      .select(representativeSelect)
      .eq("is_published", true)
      .order("display_order", {
        ascending: true,
      })
      .order("created_at", {
        ascending: true,
      });

  if (error) {
    console.error(
      "Unable to load Fan Representatives:",
      error,
    );

    return [];
  }

  return (
    (data ?? []) as FanRepresentativeRow[]
  ).map(mapRepresentative);
}

export async function getPublishedFanRepresentativeBySlug(
  slug: string,
): Promise<FanRepresentative | null> {
  const { data, error } =
    await supabase
      .from("fan_representatives")
      .select(representativeSelect)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

  if (error) {
    console.error(
      "Unable to load Fan Representative:",
      error,
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return mapRepresentative(
    data as FanRepresentativeRow,
  );
}