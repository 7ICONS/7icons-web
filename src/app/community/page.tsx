import type { Metadata } from "next";
import Link from "next/link";

import AccountBadge, {
  type AccountBadgeType,
} from "@/components/account/AccountBadge";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Community Comments",
  description:
    "Discover recent conversations from the 7ICONS & ICONIA community.",
};

type CommunityComment = {
  id: string;
  body: string;
  created_at: string;
  author_id: string | null;
  author_name: string;
  username: string | null;
  avatar_url: string | null;
  account_badge: string | null;
  content_type: "article" | "gallery";
  content_id: string;
  content_title: string;
  article_slug: string | null;
};

const validAccountBadges: AccountBadgeType[] = [
  "member",
  "representative",
  "moderator",
  "editor",
  "admin",
  "super_admin",
];

function resolveAccountBadge(
  value?: string | null,
): AccountBadgeType {
  if (
    value &&
    validAccountBadges.includes(
      value as AccountBadgeType,
    )
  ) {
    return value as AccountBadgeType;
  }

  return "member";
}

function formatCommentDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "I";
}

function getContentHref(
  comment: CommunityComment,
) {
  if (
    comment.content_type === "article" &&
    comment.article_slug
  ) {
    return `/blog/${comment.article_slug}`;
  }

  /*
   * Untuk Gallery kita arahkan ke halaman Gallery utama dulu.
   * Nanti bisa dibuat langsung ke album jika kita ingin
   * memastikan route detail Gallery yang digunakan.
   */
  return "/gallery";
}

export default async function CommunityPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_public_community_comments",
  );

  if (error) {
    console.error(
      "Unable to load community comments:",
      error,
    );
  }

  const comments = Array.isArray(data)
    ? (data as CommunityComment[])
    : [];

  const articleCount = comments.filter(
    (comment) =>
      comment.content_type === "article",
  ).length;

  const galleryCount = comments.filter(
    (comment) =>
      comment.content_type === "gallery",
  ).length;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#faf8ff]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-[520px] h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        {/* Hero */}
        <section className="relative border-b border-violet-100 bg-white/70">
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              ICONIA Community
            </p>

            <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Community Conversations
                </h1>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  Stories continue beyond the article or
                  gallery. Explore thoughts, memories, and
                  conversations shared by ICONIA across the
                  7ICONS digital home.
                </p>
              </div>

              <Link
                href="/guidelines"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-white px-5 text-sm font-semibold !text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md"
              >
                Community Guidelines
              </Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="relative mx-auto max-w-[1100px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Conversations
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {comments.length}
              </p>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Article Comments
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {articleCount}
              </p>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Gallery Comments
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {galleryCount}
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
              <p className="text-sm font-semibold text-red-700">
                Community comments are temporarily unavailable.
              </p>
            </div>
          )}

          {/* Feed Header */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Recent Activity
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">
                Latest conversations
              </h2>
            </div>

            <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold text-violet-700">
              Approved comments only
            </span>
          </div>

          {/* Comment Feed */}
          <div className="mt-7 space-y-5">
            {!error && comments.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-violet-200 bg-white px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-7 w-7"
                  >
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No conversations yet
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Approved comments from Articles and Gallery
                  albums will appear here.
                </p>
              </div>
            ) : (
              comments.map((comment) => {
                const badge = resolveAccountBadge(
                  comment.account_badge,
                );

                const contentHref =
                  getContentHref(comment);

                return (
                  <article
                    key={comment.id}
                    className="overflow-hidden rounded-[1.75rem] border border-violet-100 bg-white shadow-lg shadow-violet-950/5 transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="p-6 sm:p-7">
                      {/* Author */}
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          {comment.avatar_url ? (
                            <img
                              src={comment.avatar_url}
                              alt={comment.author_name}
                              className="h-11 w-11 shrink-0 rounded-full border border-violet-100 object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-500 text-sm font-bold text-white">
                              {getInitial(
                                comment.author_name,
                              )}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-sm font-bold text-slate-900">
                                {comment.author_name}
                              </p>

                              <AccountBadge
                                badge={badge}
                              />
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                              {comment.username && (
                                <>
                                  <span>
                                    @{comment.username}
                                  </span>

                                  <span>•</span>
                                </>
                              )}

                              <span>
                                {formatCommentDate(
                                  comment.created_at,
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={
                            comment.content_type ===
                            "article"
                              ? "rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-700"
                              : "rounded-full bg-fuchsia-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-fuchsia-700"
                          }
                        >
                          {comment.content_type ===
                          "article"
                            ? "Article"
                            : "Gallery"}
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700 sm:text-[15px]">
                        {comment.body}
                      </p>
                    </div>

                    {/* Content Source */}
                    <div className="border-t border-violet-100 bg-[#faf8ff] px-6 py-4 sm:px-7">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            Conversation from
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                            {comment.content_title}
                          </p>
                        </div>

                        <Link
                          href={contentHref}
                          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold !text-violet-700 transition hover:text-violet-900"
                        >
                          {comment.content_type ===
                          "article"
                            ? "Read Article"
                            : "View Gallery"}

                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Community Note */}
          <div className="mt-10 rounded-[2rem] bg-gradient-to-r from-violet-700 to-purple-500 p-7 text-white shadow-xl shadow-violet-500/20 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">
              Join the conversation
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Your voice is part of the story.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-violet-100">
              Open an Article or Gallery album and share your
              thoughts with ICONIA. New comments are reviewed
              before they become visible to the community.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold !text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Explore Articles
              </Link>

              <Link
                href="/gallery"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-white/15"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}