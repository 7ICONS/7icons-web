"use client";

import { useMemo } from "react";

import type { GalleryCategory } from "@/components/gallery/GalleryFilter";

export type GalleryItem = {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  date: string;
  image: string;
  description: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
  activeCategory: GalleryCategory;
  onSelect: (item: GalleryItem) => void;
};

export default function GalleryGrid({
  items,
  activeCategory,
  onSelect,
}: GalleryGridProps) {
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return items;
    }

    return items.filter(
      (item) => item.category === activeCategory,
    );
  }, [activeCategory, items]);

  if (filteredItems.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-violet-200 bg-[#faf8ff] px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
          🖼️
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-950">
          No photos yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Photos in this category will appear here when they are added
          to the 7ICONS gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filteredItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className="group overflow-hidden rounded-3xl border border-violet-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-violet-50">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url("${item.image}")`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-80" />

            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700 backdrop-blur-sm">
              {item.category}
            </span>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-400">
              {item.date}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-950 transition group-hover:text-violet-700">
              {item.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
              {item.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
              View Photo
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}