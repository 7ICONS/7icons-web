"use client";

import { useState } from "react";

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
  const [
    activeCategory,
    setActiveCategory,
  ] = useState<GalleryCategory>("All");

  const [
    selectedAlbum,
    setSelectedAlbum,
  ] = useState<GalleryAlbum | null>(
    null,
  );

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
                setSelectedAlbum
              }
            />
          </div>
        </div>
      </section>

      {/* Album Lightbox */}
      <GalleryLightbox
        album={selectedAlbum}
        onClose={() =>
          setSelectedAlbum(null)
        }
      />
    </>
  );
}