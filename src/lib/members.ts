import { supabase } from "@/lib/supabase";

export type MemberSection = {
  heading: string;
  paragraphs: string[];
};

export type Member = {
  id: string;
  slug: string;
  name: string;
  member_status: "current" | "former";
  role: string;
  image_url: string | null;
  short_bio: string;

  profile_display_name: string;
  profile_position: string;
  profile_description: string;
  profile_sections: MemberSection[];

  display_order: number;
  is_published: boolean;

  created_at: string;
  updated_at: string;
};

export async function getPublishedMembers() {
  const { data, error } = await supabase
    .from("members")
    .select(
      `
        id,
        slug,
        name,
        member_status,
        role,
        image_url,
        short_bio,
        profile_display_name,
        profile_position,
        profile_description,
        profile_sections,
        display_order,
        is_published,
        created_at,
        updated_at
      `,
    )
    .eq("is_published", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Failed to load published members:",
      error,
    );

    return [];
  }

  return (data ?? []) as Member[];
}

export async function getPublishedMemberBySlug(
  slug: string,
) {
  const { data, error } = await supabase
    .from("members")
    .select(
      `
        id,
        slug,
        name,
        member_status,
        role,
        image_url,
        short_bio,
        profile_display_name,
        profile_position,
        profile_description,
        profile_sections,
        display_order,
        is_published,
        created_at,
        updated_at
      `,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error(
      `Failed to load member "${slug}":`,
      error,
    );

    return null;
  }

  return data as Member | null;
}