"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import GalleryFilter, {
  type GalleryCategory,
} from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import type { GalleryAlbum } from "@/lib/gallery";

type GalleryContentProps = {
  albums: GalleryAlbum[];
};

export default function GalleryContent({
  albums,
}: GalleryContentProps) {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [
    activeCategory,
    setActiveCategory,
  ] =
    useState<GalleryCategory>(
      "All",
    );

  const [
    selectedAlbum,
    setSelectedAlbum,
  ] =
    useState<GalleryAlbum | null>(
      null,
    );

  const requestedAlbumId =
    searchParams.get("album");

  const requestedCommentId =
    searchParams.get("comment");

  /*
   * =========================================================
   * OPEN ALBUM FROM DEEP LINK
   * =========================================================
   *
   * Example:
   *
   * /gallery
   *   ?album=<album-id>
   *   &comment=<comment-id>
   *
   * When the Gallery is opened from
   * Profile activity/bookmarks, find
   * the matching album and open its
   * lightbox automatically.
   */
  useEffect(() => {
    if (
      !requestedAlbumId
    ) {
      return;
    }

    const matchingAlbum =
      albums.find(
        (album) =>
          album.id ===
          requestedAlbumId,
      );

    if (!matchingAlbum) {
      return;
    }

    setSelectedAlbum(
      matchingAlbum,
    );
  }, [
    albums,
    requestedAlbumId,
  ]);

  /*
   * =========================================================
   * NORMAL GALLERY SELECTION
   * =========================================================
   */
  const handleSelectAlbum =
    useCallback(
      (
        album: GalleryAlbum,
      ) => {
        setSelectedAlbum(
          album,
        );
      },
      [],
    );

  /*
   * =========================================================
   * CLOSE LIGHTBOX
   * =========================================================
   *
   * If the lightbox was opened through
   * a Profile deep-link, remove the
   * album/comment query parameters so
   * the Gallery returns to its normal
   * state.
   */
  const handleClose =
    useCallback(() => {
      setSelectedAlbum(
        null,
      );

      if (
        requestedAlbumId ||
        requestedCommentId
      ) {
        router.replace(
          "/gallery",
          {
            scroll: false,
          },
        );
      }
    }, [
      requestedAlbumId,
      requestedCommentId,
      router,
    ]);

  const focusCommentId =
    selectedAlbum?.id ===
    requestedAlbumId
      ? requestedCommentId
      : null;

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          {/* Filter */}
          <GalleryFilter
            activeCategory={
              activeCategory
            }
            onChange={
              setActiveCategory
            }
          />

          {/* Gallery */}
          <div className="mt-8">
            <GalleryGrid
              albums={albums}
              activeCategory={
                activeCategory
              }
              onSelect={
                handleSelectAlbum
              }
            />
          </div>
        </div>
      </section>

      {/* Album Lightbox */}
      <GalleryLightbox
        album={
          selectedAlbum
        }
        focusCommentId={
          focusCommentId
        }
        onClose={
          handleClose
        }
      />
    </>
  );
}