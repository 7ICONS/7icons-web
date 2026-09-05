import { supabase } from "@/lib/supabase";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  featured: boolean;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPublishedArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        cover_image,
        featured,
        status,
        published_at,
        created_at,
        updated_at
      `,
    )
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    console.error(
      "Failed to load published articles:",
      error,
    );

    return [];
  }

  return (data ?? []) as Article[];
}

export async function getFeaturedArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        cover_image,
        featured,
        status,
        published_at,
        created_at,
        updated_at
      `,
    )
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    console.error(
      "Failed to load featured articles:",
      error,
    );

    return [];
  }

  return (data ?? []) as Article[];
}

export async function getPublishedArticleBySlug(
  slug: string,
) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        cover_image,
        featured,
        status,
        published_at,
        created_at,
        updated_at
      `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      `Failed to load article "${slug}":`,
      error,
    );

    return null;
  }

  return data as Article | null;
}