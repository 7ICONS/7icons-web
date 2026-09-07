"use client";

import {
  useEffect,
  useState,
} from "react";

import type { GalleryAlbum } from "@/lib/gallery";

type GalleryLightboxProps = {
  album: GalleryAlbum | null;
  onClose: () => void;
};

function formatAlbumDate(
  dateString: string | null,
) {
  if (!dateString) {
    return null;
  }

  const [year, month, day] =
    dateString
      .split("-")
      .map(Number);

  const date = new Date(
    year,
    month - 1,
    day,
  );

  return date.toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

export default function GalleryLightbox({
  album,
  onClose,
}: GalleryLightboxProps) {
  const [
    activePhotoIndex,
    setActivePhotoIndex,
  ] = useState(0);

  useEffect(() => {
    setActivePhotoIndex(0);
  }, [album?.id]);

  useEffect(() => {
    if (!album) {
      return;
    }

    const photos = album.photos;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        setActivePhotoIndex(
          (current) => {
            if (photos.length <= 1) {
              return current;
            }

            return (
              (current + 1) %
              photos.length
            );
          },
        );
      }

      if (event.key === "ArrowLeft") {
        setActivePhotoIndex(
          (current) => {
            if (photos.length <= 1) {
              return current;
            }

            return (
              (current -
                1 +
                photos.length) %
              photos.length
            );
          },
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    album,
    onClose,
  ]);

  if (!album) {
    return null;
  }

  const photos = album.photos;

  const activePhoto =
    photos[activePhotoIndex];

  const albumDate =
    formatAlbumDate(
      album.album_date,
    );

  function showPreviousPhoto() {
    if (photos.length <= 1) {
      return;
    }

    setActivePhotoIndex(
      (current) =>
        (current -
          1 +
          photos.length) %
        photos.length,
    );
  }

  function showNextPhoto() {
    if (photos.length <= 1) {
      return;
    }

    setActivePhotoIndex(
      (current) =>
        (current + 1) %
        photos.length,
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-6"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[94vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Gallery album"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-xl font-light text-white backdrop-blur transition hover:bg-slate-950/80"
        >
          ×
        </button>

        {/* Photo Area */}
        <div className="relative flex min-h-[420px] flex-col bg-slate-950 lg:min-h-[720px]">
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {activePhoto ? (
              <div
                role="img"
                aria-label={
                  activePhoto.alt_text ||
                  `${album.title} photo ${
                    activePhotoIndex + 1
                  }`
                }
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${activePhoto.image_url}")`,
                }}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-white/60">
                No photos in this album.
              </div>
            )}

            {/* Previous */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={
                  showPreviousPhoto
                }
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-xl text-white backdrop-blur transition hover:bg-slate-950/80"
              >
                ←
              </button>
            )}

            {/* Next */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={
                  showNextPhoto
                }
                aria-label="Next photo"
                className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-xl text-white backdrop-blur transition hover:bg-slate-950/80"
              >
                →
              </button>
            )}

            {/* Counter */}
            {photos.length > 0 && (
              <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                {activePhotoIndex + 1} /{" "}
                {photos.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="border-t border-white/10 bg-slate-950 px-4 py-4">
              <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {photos.map(
                  (
                    photo,
                    index,
                  ) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex(
                          index,
                        )
                      }
                      className={[
                        "relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-900 transition sm:h-20 sm:w-24",
                        index ===
                        activePhotoIndex
                          ? "border-violet-400"
                          : "border-transparent opacity-60 hover:opacity-100",
                      ].join(" ")}
                    >
                      <div
                        role="img"
                        aria-label={
                          photo.alt_text ||
                          `${album.title} thumbnail ${
                            index + 1
                          }`
                        }
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url("${photo.image_url}")`,
                        }}
                      />
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Album Information */}
        <aside className="overflow-y-auto bg-white px-6 py-7 sm:px-8 lg:max-h-[94vh] lg:px-7 lg:py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Gallery Album
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
              {album.category}
            </span>

            {album.is_featured && (
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                Featured
              </span>
            )}
          </div>

          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-slate-950">
            {album.title}
          </h2>

          {albumDate && (
            <p className="mt-3 text-sm font-semibold text-slate-400">
              {albumDate}
            </p>
          )}

          {album.description && (
            <p className="mt-6 text-sm leading-7 text-slate-600">
              {album.description}
            </p>
          )}

          <div className="mt-8 border-t border-violet-100 pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Album Photos
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-700">
              {photos.length}{" "}
              {photos.length === 1
                ? "Photo"
                : "Photos"}
            </p>
          </div>

          {activePhoto && (
            <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                Current Photo
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {activePhoto.alt_text ||
                  `${album.title} photo ${
                    activePhotoIndex + 1
                  }`}
              </p>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50 p-5">
            <p className="text-sm font-bold text-slate-900">
              Browse the album
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Use the arrows,
              thumbnails, or your
              keyboard&apos;s left and
              right arrow keys to move
              between photos.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}