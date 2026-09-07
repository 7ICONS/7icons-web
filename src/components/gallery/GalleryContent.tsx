"use client";

import { useState } from "react";

import GalleryFilter, {
  type GalleryCategory,
} from "@/components/gallery/GalleryFilter";

import GalleryGrid, {
  type GalleryItem,
} from "@/components/gallery/GalleryGrid";

import GalleryLightbox from "@/components/gallery/GalleryLightbox";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "7ICONS Live Performance",
    category: "Performance",
    date: "September 2026",
    image: "/brand/7icons-logo-v2.png",
    description:
      "A memorable stage moment from the continuing journey of 7ICONS.",
  },
  {
    id: 2,
    title: "Behind the Stage",
    category: "Behind the Scenes",
    date: "September 2026",
    image: "/brand/7icons-logo-v2.png",
    description:
      "A glimpse behind the scenes capturing moments away from the main stage.",
  },
  {
    id: 3,
    title: "Special Event Moment",
    category: "Events",
    date: "August 2026",
    image: "/brand/7icons-logo-v2.png",
    description:
      "A special event preserved as part of the 7ICONS visual archive.",
  },
  {
    id: 4,
    title: "Together with ICONIA",
    category: "Fan Moments",
    date: "August 2026",
    image: "/brand/7icons-logo-v2.png",
    description:
      "A moment representing the connection shared between 7ICONS and ICONIA.",
  },
  {
    id: 5,
    title: "Another Performance",
    category: "Performance",
    date: "July 2026",
    image: "/brand/7icons-logo-v2.png",
    description:
      "Another stage memory from the journey and performances of 7ICONS.",
  },
  {
    id: 6,
    title: "A Memory to Keep",
    category: "Other",
    date: "July 2026",
    image: "/brand/7icons-logo-v2.png",
    description:
      "A visual memory preserved as another chapter in the 7ICONS archive.",
  },
];

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All");

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  return (
    <>
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                Photo Archive
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Explore the Gallery
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Browse photographs and visual memories from
                performances, events, behind-the-scenes moments, and
                the journey shared by 7ICONS and ICONIA.
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="mt-8">
            <GalleryFilter
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Grid */}
          <div className="mt-8">
            <GalleryGrid
              items={galleryItems}
              activeCategory={activeCategory}
              onSelect={setSelectedItem}
            />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}