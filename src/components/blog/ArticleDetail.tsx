import Link from "next/link";

import type { Article } from "@/lib/articles";

type ArticleDetailProps = {
  article: Article;
};

function formatArticleDate(
  publishedAt: string | null,
  createdAt: string,
) {
  const date = new Date(
    publishedAt ?? createdAt,
  );

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

export default function ArticleDetail({
  article,
}: ArticleDetailProps) {
  const articleDate = formatArticleDate(
    article.published_at,
    article.created_at,
  );

  const contentSource =
    article.content.trim() ||
    article.excerpt.trim();

  const contentBlocks = contentSource
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="bg-white">
      {/* Article Header */}
      <header className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
        {/* Glow */}
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1000px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
          >
            <span aria-hidden="true">←</span>
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-violet-700">
              {article.category}
            </span>

            <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
              {articleDate}
            </span>

            {article.featured && (
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            {article.excerpt}
          </p>
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto max-w-[1200px] px-5 pt-10 sm:px-8 md:pt-14 lg:px-10">
        {article.cover_image ? (
          <div
            role="img"
            aria-label={article.title}
            className="aspect-[16/9] overflow-hidden rounded-2xl border border-violet-50 bg-slate-100 bg-cover bg-center shadow-sm md:rounded-3xl"
            style={{
              backgroundImage: `url("${article.cover_image}")`,
            }}
          />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-100 via-purple-50 to-white md:rounded-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-violet-400 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                  />

                  <circle
                    cx="9"
                    cy="9"
                    r="2"
                  />

                  <path d="m4 18 5-5 3 3 2-2 6 6" />
                </svg>
              </div>

              <p className="mt-3 text-sm font-medium text-violet-400">
                7ICONS Digital Home
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Article Body */}
      <div className="mx-auto max-w-[820px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
        <div className="space-y-6">
          {contentBlocks.map(
            (paragraph, index) => (
              <p
                key={`${article.id}-${index}`}
                className="whitespace-pre-line text-base leading-8 text-slate-700"
              >
                {paragraph}
              </p>
            ),
          )}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

        {/* Article Footer */}
        <div className="rounded-3xl border border-violet-100 bg-[#faf8ff] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
            Continue Exploring
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-slate-950">
            Discover more stories from 7ICONS
            &amp; ICONIA.
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Return to the Blog &amp; Stories page
            to explore articles, community
            moments, memories, and more.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}