"use client";

import { useState } from "react";

const pages = [1, 2, 3, 4, 5];

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    setCurrentPage((current) => Math.max(1, current - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((current) => Math.min(pages.length, current + 1));
  };

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 flex items-center justify-center gap-2 md:mt-12"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ←
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        const active = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            aria-current={active ? "page" : undefined}
            className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition ${
              active
                ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-500/20"
                : "border-violet-200 bg-white text-slate-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={goToNextPage}
        disabled={currentPage === pages.length}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        →
      </button>
    </nav>
  );
}