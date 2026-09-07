"use client";

import { useMemo } from "react";

import type {
  GalleryAlbum,
  GalleryCategory,
} from "@/lib/gallery";

type GalleryGridProps = {
  albums: GalleryAlbum[];
  activeCategory: "All" | GalleryCategory;
  onSelect: (album: GalleryAlbum) => void;
};

function formatAlbumDate(
  dateString: string | null,
) {
  if (!dateString) {
    return null;
  }

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day,
  );

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function GalleryGrid({
  albums,
  activeCategory,
  onSelect,
}: GalleryGridProps) {
  const filteredAlbums = useMemo(() => {
    if (activeCategory === "All") {
      return albums;
    }

    return albums.filter(
      (album) =>
        album.category ===
        activeCategory,
    );
  }, [
    albums,
    activeCategory,
  ]);

  if (filteredAlbums.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/40 px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="2"
            />

            <circle
              cx="9"
              cy="9"
              r="2"
            />

            <path d="m4 18 5-5 3 3 2-2 6 6" />
          </svg>
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-900">
          No gallery albums found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          There are currently no published
          Gallery albums in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredAlbums.map(
        (album) => {
          const cover =
            album.photos[0];

          const date =
            formatAlbumDate(
              album.album_date,
            );

          return (
            <button
              key={album.id}
              type="button"
              onClick={() =>
                onSelect(album)
              }
              className="group overflow-hidden rounded-3xl border border-violet-100 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10"
            >
              {/* Cover */}
              <div className="relative aspect-[4/3] overflow-hidden bg-violet-50">
                {cover ? (
                  <div
                    role="img"
                    aria-label={
                      cover.alt_text ||
                      album.title
                    }
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url("${cover.image_url}")`,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-violet-300">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-12 w-12"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                      />

                      <circle
                        cx="9"
                        cy="9"
                        r="2"
                      />

                      <path d="m4 18 5-5 3 3 2-2 6 6" />
                    </svg>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm backdrop-blur">
                    {album.category}
                  </span>
                </div>

                {/* Photo Count */}
                <div className="absolute bottom-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                      />
                      <circle
                        cx="9"
                        cy="9"
                        r="2"
                      />
                      <path d="m4 18 5-5 3 3 2-2 6 6" />
                    </svg>

                    {album.photos.length}{" "}
                    {album.photos.length === 1
                      ? "Photo"
                      : "Photos"}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
                  {date && (
                    <span>{date}</span>
                  )}

                  {date &&
                    album.is_featured && (
                      <span>•</span>
                    )}

                  {album.is_featured && (
                    <span className="text-violet-600">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 transition group-hover:text-violet-700">
                  {album.title}
                </h2>

                {album.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {
                      album.description
                    }
                  </p>
                )}

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-600">
                  View Album

                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>
            </button>
          );
        },
      )}
    </div>
  );
}