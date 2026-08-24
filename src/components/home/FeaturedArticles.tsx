import Image from "next/image";
import Link from "next/link";

const articles = [
    {
    id: 1,
    title: "The Beginning of Our Journey",
    excerpt:
      "A story about beginnings, memories, and the moments that brought 7ICONS and ICONIA together.",
    category: "Featured",
    date: "August 20, 2026",
    image: "/featured/featured-journey.png",
    href: "/blog/the-beginning-of-our-journey",
  },
  {
    id: 2,
    title: "Behind the Scenes: Practice Day",
    excerpt:
      "A glimpse behind the scenes where preparation, laughter, and unforgettable moments come together.",
    category: "Behind the Scene",
    date: "August 18, 2026",
    image: "/featured/featured-practice-day.png",
    href: "/blog/behind-the-scenes-practice-day",
  },
  {
    id: 3,
    title: "7 Voices, 1 Dream",
    excerpt:
      "Different voices, different stories, and one journey shared together with ICONIA.",
    category: "Story",
    date: "August 15, 2026",
    image: "/featured/featured-seven-voices.png",
    href: "/blog/7-voices-1-dream",
  },
];

export default function FeaturedArticles() {
    return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                Discover
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Featured Articles
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Stories, updates, and memorable moments from 7ICONS &amp; ICONIA.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800 md:inline-flex"
          >
            View All Articles

            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Article Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/5"
            >
              {/* Image */}
              <Link
                href={article.href}
                className="relative block aspect-[16/10] overflow-hidden bg-violet-50"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                {/* Category */}
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
                  <Link href={article.href}>{article.title}</Link>
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {article.excerpt}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href={article.href}
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

        {/* Mobile View All */}
        <div className="mt-8 md:hidden">
          <Link
            href="/blog"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300 px-5 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            View All Articles

            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}