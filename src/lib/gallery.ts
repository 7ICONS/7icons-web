import { supabase } from "@/lib/supabase";

export type GalleryCategory =
  | "Performance"
  | "Behind the Scenes"
  | "Events"
  | "Fan Moments"
  | "Other";

export type GalleryAlbumPhoto = {
  id: string;
  album_id: string;
  image_url: string;
  storage_path: string;
  alt_text: string;
  sort_order: number;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  category: GalleryCategory;
  album_date: string | null;
  description: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  photos: GalleryAlbumPhoto[];
};

function normalizeCategory(
  value: string,
): GalleryCategory {
  if (
    value === "Performance" ||
    value === "Behind the Scenes" ||
    value === "Events" ||
    value === "Fan Moments" ||
    value === "Other"
  ) {
    return value;
  }

  return "Other";
}

export async function getPublishedGalleryAlbums(): Promise<
  GalleryAlbum[]
> {
  const { data: albums, error: albumsError } =
    await supabase
      .from("gallery_albums")
      .select(
        `
          id,
          title,
          category,
          album_date,
          description,
          is_featured,
          sort_order,
          created_at
        `,
      )
      .eq("is_published", true)
      .order("sort_order", {
        ascending: true,
      })
      .order("album_date", {
        ascending: false,
        nullsFirst: false,
      })
      .order("created_at", {
        ascending: false,
      });

  if (albumsError) {
    console.error(
      "Unable to load Gallery albums:",
      albumsError,
    );

    return [];
  }

  if (!albums || albums.length === 0) {
    return [];
  }

  const albumIds = albums.map(
    (album) => album.id,
  );

  const { data: photos, error: photosError } =
    await supabase
      .from("gallery_album_photos")
      .select(
        `
          id,
          album_id,
          image_url,
          storage_path,
          alt_text,
          sort_order
        `,
      )
      .in("album_id", albumIds)
      .order("sort_order", {
        ascending: true,
      });

  if (photosError) {
    console.error(
      "Unable to load Gallery photos:",
      photosError,
    );

    return [];
  }

  return albums.map((album) => ({
    id: album.id,
    title: album.title,
    category: normalizeCategory(
      album.category,
    ),
    album_date: album.album_date,
    description: album.description,
    is_featured: album.is_featured,
    sort_order: album.sort_order,
    created_at: album.created_at,

    photos: (photos ?? []).filter(
      (photo) =>
        photo.album_id === album.id,
    ),
  }));
}