"use client";

import { useEffect } from "react";

import type { GalleryItem } from "@/components/gallery/GalleryGrid";

type GalleryLightboxProps = {
  item: GalleryItem | null;
  onClose: () => void;
};

export default function GalleryLightbox({
  item,
  onClose,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!item) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[1100px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery preview"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-xl text-white backdrop-blur-md transition hover:bg-slate-950/80"
        >
          ×
        </button>

        <div className="grid max-h-[90vh] lg:grid-cols-[1.45fr_0.55fr]">
          {/* Photo */}
          <div className="relative min-h-[320px] overflow-hidden bg-slate-950 sm:min-h-[480px] lg:min-h-[650px]">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${item.image}")`,
              }}
            />
          </div>

          {/* Information */}
          <div className="overflow-y-auto p-6 sm:p-8">
            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700">
              {item.category}
            </span>

            <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-slate-950">
              {item.title}
            </h2>

            <p className="mt-3 text-sm font-medium text-slate-400">
              {item.date}
            </p>

            <div className="my-6 h-px bg-violet-100" />

            <p className="text-sm leading-7 text-slate-600">
              {item.description}
            </p>

            <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                7ICONS Gallery
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Part of the visual archive preserving moments from the
                journey of 7ICONS and ICONIA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}