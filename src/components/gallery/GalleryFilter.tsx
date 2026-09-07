"use client";

export type GalleryCategory =
  | "All"
  | "Performance"
  | "Behind the Scenes"
  | "Events"
  | "Fan Moments"
  | "Other";

type GalleryFilterProps = {
  activeCategory: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
};

const categories: GalleryCategory[] = [
  "All",
  "Performance",
  "Behind the Scenes",
  "Events",
  "Fan Moments",
  "Other",
];

export default function GalleryFilter({
  activeCategory,
  onChange,
}: GalleryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
              active
                ? "border-violet-700 bg-violet-700 text-white shadow-md shadow-violet-300/30"
                : "border-violet-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700",
            ].join(" ")}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}