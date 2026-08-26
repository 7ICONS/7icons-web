import Image from "next/image";
import Link from "next/link";

import Pagination from "@/components/blog/Pagination";
import { blogArticles } from "@/data/blogArticles";

type ArticleGridProps = {
  searchQuery: string;
  activeCategory: string;
};

export default function ArticleGrid({
  searchQuery,
  activeCategory,
}: ArticleGridProps) {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" ||
      article.filterCategory === activeCategory;

    const searchableContent = [
      article.title,
      article.excerpt,
      article.category,
      article.filterCategory,
      article.date,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearch === "" ||
      searchableContent.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  const isFiltering =
    activeCategory !== "All" || normalizedSearch !== "";

  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                Latest Stories
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Explore Our Stories
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Discover stories, updates, community moments, and memories from
              7ICONS &amp; ICONIA.
            </p>
          </div>

          <p className="hidden text-sm text-slate-400 md:block">
            Showing {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {filteredArticles.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/5"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-violet-50"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700 shadow-sm backdrop-blur-md">
                      {article.category}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                      {article.date}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-950 transition group-hover:text-violet-700">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {article.excerpt}
                    </p>

                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
                      >
                        Read Article

                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {!isFiltering && <Pagination />}
          </>
        ) : (
          <div className="rounded-3xl border border-violet-100 bg-[#faf8ff] px-6 py-16 text-center md:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-2xl text-violet-600">
              ✦
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-950">
              No stories found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              Try another keyword or choose a different category to discover
              more stories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}