"use client";

const categories = [
  "All",
  "News",
  "Story",
  "Behind the Scene",
  "Community",
];

type BlogHeroProps = {
  searchQuery: string;
  activeCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
};

export default function BlogHero({
  searchQuery,
  activeCategory,
  onSearchChange,
  onCategoryChange,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#f8f5ff] to-white">
      {/* Decorative background */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="absolute left-[15%] top-24 h-2 w-2 rotate-45 bg-violet-400/40" />
      <div className="absolute right-[18%] top-32 h-3 w-3 rotate-45 bg-purple-400/30" />
      <div className="absolute right-[30%] top-16 h-2 w-2 rotate-45 bg-violet-400/30" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Decoration */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-violet-300" />

            <span aria-hidden="true" className="text-xl text-violet-600">
              ✦
            </span>

            <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet-300" />
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Blog{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              &amp; Stories
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Stories, updates, and memorable moments from 7ICONS &amp; ICONIA.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-2xl">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>

            <input
              id="blog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search articles, stories, and more..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 pr-14 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />

            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full items-center justify-start gap-2 px-0.5 sm:justify-center">
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                      active
                        ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-500/20"
                        : "border-violet-200 bg-white/70 text-slate-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}