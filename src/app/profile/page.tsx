import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import AccountBadge, {
  type AccountBadgeType,
} from "@/components/account/AccountBadge";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Profile",
};

type ProfilePageProps = {
  searchParams: Promise<{
    success?: string;
  }>;
};

type PublicAccountBadgeRow = {
  user_id: string;
  badge: string;
};

type RecentActivityRow = {
  comment_id: string;
  parent_id: string | null;
  body: string;
  comment_status: string;
  activity_type: "comment" | "reply";
  target_type: "article" | "gallery";
  target_id: string;
  target_title: string;
  article_slug: string | null;
  created_at: string;
};

type BookmarkRow = {
  bookmark_id: string;
  comment_id: string;
  parent_id: string | null;
  body: string;
  author_name: string;
  author_username: string | null;
  author_avatar_url: string | null;
  target_type: "article" | "gallery";
  target_id: string;
  target_title: string;
  article_slug: string | null;
  bookmarked_at: string;
  comment_created_at: string;
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

function formatDate(
  dateString: string,
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(
    new Date(dateString),
  );
}

function getStatusClasses(
  status: string,
) {
  switch (status) {
    case "approved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "hidden":
      return "border-slate-200 bg-slate-100 text-slate-600";

    case "rejected":
    case "spam":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-violet-200 bg-violet-50 text-violet-700";
  }
}

function formatStatus(
  status: string,
) {
  return status
    .replace(
      /_/g,
      " ",
    )
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}

function getTargetHref({
  targetType,
  targetId,
  articleSlug,
  commentId,
  includeCommentAnchor = true,
}: {
  targetType: "article" | "gallery";
  targetId: string;
  articleSlug: string | null;
  commentId: string;
  includeCommentAnchor?: boolean;
}) {
  /*
   * =========================================================
   * ARTICLE
   * =========================================================
   *
   * Article memiliki route detail sendiri
   * melalui slug.
   */
  if (
    targetType === "article" &&
    articleSlug
  ) {
    const anchor =
      includeCommentAnchor
        ? `#comment-${commentId}`
        : "";

    return `/blog/${articleSlug}${anchor}`;
  }

  /*
   * =========================================================
   * GALLERY
   * =========================================================
   *
   * Public Gallery hanya menggunakan
   * satu route /gallery.
   *
   * Album dan komentar dibuka melalui
   * query parameters.
   */
  const albumQuery =
    `album=${encodeURIComponent(
      targetId,
    )}`;

  if (
    includeCommentAnchor
  ) {
    return `/gallery?${albumQuery}&comment=${encodeURIComponent(
      commentId,
    )}`;
  }

  return `/gallery?${albumQuery}`;
}

function ActivityIcon({
  type,
}: {
  type: "comment" | "reply";
}) {
  if (type === "reply") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="m9 17-5-5 5-5" />

        <path d="M4 12h10a6 6 0 0 1 6 6v1" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z" />
    </svg>
  );
}

function BookmarkAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string | null;
}) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-purple-500 text-xs font-bold text-white">
      {name
        .charAt(0)
        .toUpperCase()}
    </div>
  );
}

export default async function ProfilePage({
  searchParams,
}: ProfilePageProps) {
  const { success } =
    await searchParams;

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [
    {
      data: profile,
    },
    {
      data: badgeRows,
      error: badgeError,
    },
    {
      data: activityRows,
      error: activityError,
    },
    {
      data: bookmarkRows,
      error: bookmarkError,
    },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
          username,
          full_name,
          avatar_url,
          bio,
          background_url,
          background_path,
          background_position_x,
          background_position_y,
          created_at,
          updated_at
        `,
      )
      .eq(
        "id",
        user.id,
      )
      .single(),

    supabase.rpc(
      "get_public_account_badges",
      {
        target_user_ids: [
          user.id,
        ],
      },
    ),

    supabase.rpc(
      "get_my_comment_activity",
      {
        p_limit: 6,
      },
    ),

    supabase.rpc(
      "get_my_comment_bookmarks",
      {
        p_limit: 6,
      },
    ),
  ]);

  if (badgeError) {
    console.error(
      "Unable to load account badge:",
      badgeError,
    );
  }

  if (activityError) {
    console.error(
      "Unable to load profile activity:",
      activityError,
    );
  }

  if (bookmarkError) {
    console.error(
      "Unable to load profile bookmarks:",
      bookmarkError,
    );
  }

  const recentActivity =
    Array.isArray(
      activityRows,
    )
      ? (activityRows as RecentActivityRow[])
      : [];

  const bookmarks =
    Array.isArray(
      bookmarkRows,
    )
      ? (bookmarkRows as BookmarkRow[])
      : [];

  const publicBadges =
    Array.isArray(
      badgeRows,
    )
      ? (badgeRows as PublicAccountBadgeRow[])
      : [];

  const badgeRow =
    publicBadges.find(
      (item) =>
        item.user_id ===
        user.id,
    );

  const accountBadge =
    resolveAccountBadge(
      badgeRow?.badge,
    );

  const displayName =
    profile?.full_name ||
    profile?.username ||
    user.email?.split(
      "@",
    )[0] ||
    "ICONIA Member";

  const username =
    profile?.username ||
    user.user_metadata
      ?.username ||
    "member";

  const initial =
    displayName
      .charAt(0)
      .toUpperCase();

  const memberSince =
    profile?.created_at
      ? new Intl.DateTimeFormat(
          "en-US",
          {
            month: "long",
            year: "numeric",
          },
        ).format(
          new Date(
            profile.created_at,
          ),
        )
      : "Unknown";

  const backgroundPositionX =
    profile?.background_position_x ??
    50;

  const backgroundPositionY =
    profile?.background_position_y ??
    50;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#faf8ff]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-72 h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        <section className="relative mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          {/* Heading */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                ICONIA Account
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Your Profile
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Your personal space
                inside the digital
                home of 7ICONS &
                ICONIA.
              </p>
            </div>

            <Link
              href="/profile/edit"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Edit Profile
            </Link>
          </div>

          {/* Success */}
          {success && (
            <div
              className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm font-medium text-emerald-700">
                {success}
              </p>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* =========================
                PROFILE CARD
            ========================= */}
            <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-xl shadow-violet-950/5">
              {/* Cover / Profile Background */}
              <div className="relative h-36 overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500">
                {profile?.background_url && (
                  <img
                    src={
                      profile.background_url
                    }
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
                    }}
                  />
                )}
              </div>

              <div className="px-7 pb-8">
                {/* Avatar */}
                <div className="-mt-14 relative z-10">
                  {profile?.avatar_url ? (
                    <img
                      src={
                        profile.avatar_url
                      }
                      alt={
                        displayName
                      }
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-700 to-purple-500 text-4xl font-bold text-white shadow-lg">
                      {
                        initial
                      }
                    </div>
                  )}
                </div>

                {/* Identity */}
                <div className="mt-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950">
                      {
                        displayName
                      }
                    </h2>

                    <AccountBadge
                      badge={
                        accountBadge
                      }
                    />
                  </div>

                  <p className="mt-1 text-sm font-semibold text-violet-600">
                    @{username}
                  </p>
                </div>

                {/* Bio */}
                <div className="mt-6 border-t border-violet-100 pt-6">
                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {profile?.bio ||
                      "No bio yet. Add something about yourself from Edit Profile."}
                  </p>
                </div>

                {/* =========================
                    RECENT ACTIVITY
                ========================= */}
                <div className="mt-7 border-t border-violet-100 pt-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                        Community
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        Recent Activity
                      </h3>
                    </div>

                    {recentActivity.length >
                      0 && (
                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                        {
                          recentActivity.length
                        }
                      </span>
                    )}
                  </div>

                  {recentActivity.length ===
                  0 ? (
                    <div className="mt-4 rounded-2xl border border-dashed border-violet-200 bg-violet-50/30 px-4 py-5 text-center">
                      <p className="text-sm font-medium text-slate-600">
                        No activity
                        yet.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Your comments
                        and replies
                        will appear
                        here.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {recentActivity.map(
                        (
                          activity,
                        ) => {
                          const href =
                            getTargetHref(
                              {
                                targetType:
                                  activity.target_type,

                                targetId:
                                  activity.target_id,

                                articleSlug:
                                  activity.article_slug,

                                commentId:
                                  activity.comment_id,

                                includeCommentAnchor:
                                  activity.comment_status ===
                                  "approved",
                              },
                            );

                          return (
                            <Link
                              key={
                                activity.comment_id
                              }
                              href={
                                href
                              }
                              className="group block rounded-2xl border border-violet-100 bg-[#faf8ff] p-4 transition hover:border-violet-200 hover:bg-violet-50"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                                  <ActivityIcon
                                    type={
                                      activity.activity_type
                                    }
                                  />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                                      {activity.activity_type ===
                                      "reply"
                                        ? "Reply"
                                        : "Comment"}
                                    </span>

                                    <span className="text-xs text-slate-300">
                                      •
                                    </span>

                                    <span className="text-xs font-medium capitalize text-slate-400">
                                      {
                                        activity.target_type
                                      }
                                    </span>
                                  </div>

                                  <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-800 transition group-hover:text-violet-700">
                                    {
                                      activity.target_title
                                    }
                                  </p>

                                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                                    {
                                      activity.body
                                    }
                                  </p>

                                  <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span
                                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getStatusClasses(
                                        activity.comment_status,
                                      )}`}
                                    >
                                      {formatStatus(
                                        activity.comment_status,
                                      )}
                                    </span>

                                    <span className="text-[11px] text-slate-400">
                                      {formatDate(
                                        activity.created_at,
                                      )}
                                    </span>
                                  </div>
                                </div>

                                <span className="mt-1 text-sm text-violet-400 transition group-hover:translate-x-0.5 group-hover:text-violet-600">
                                  →
                                </span>
                              </div>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>

                {/* =========================
                    BOOKMARKS
                ========================= */}
                <div className="mt-7 border-t border-violet-100 pt-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-500">
                        Saved
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        Bookmarks
                      </h3>
                    </div>

                    {bookmarks.length >
                      0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                        <BookmarkIcon />

                        {
                          bookmarks.length
                        }
                      </span>
                    )}
                  </div>

                  {bookmarks.length ===
                  0 ? (
                    <div className="mt-4 rounded-2xl border border-dashed border-amber-200 bg-amber-50/30 px-4 py-5 text-center">
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm">
                        <BookmarkIcon />
                      </div>

                      <p className="mt-3 text-sm font-medium text-slate-600">
                        No bookmarks
                        yet.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Comments you
                        save with the
                        star button
                        will appear
                        here.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {bookmarks.map(
                        (
                          bookmark,
                        ) => {
                          const href =
                            getTargetHref(
                              {
                                targetType:
                                  bookmark.target_type,

                                targetId:
                                  bookmark.target_id,

                                articleSlug:
                                  bookmark.article_slug,

                                commentId:
                                  bookmark.comment_id,
                              },
                            );

                          return (
                            <Link
                              key={
                                bookmark.bookmark_id
                              }
                              href={
                                href
                              }
                              className="group block rounded-2xl border border-amber-100 bg-amber-50/30 p-4 transition hover:border-amber-200 hover:bg-amber-50"
                            >
                              <div className="flex items-start gap-3">
                                <BookmarkAvatar
                                  name={
                                    bookmark.author_name
                                  }
                                  avatarUrl={
                                    bookmark.author_avatar_url
                                  }
                                />

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p className="truncate text-xs font-bold text-slate-700">
                                      {
                                        bookmark.author_name
                                      }
                                    </p>

                                    {bookmark.author_username && (
                                      <span className="truncate text-[11px] text-violet-500">
                                        @
                                        {
                                          bookmark.author_username
                                        }
                                      </span>
                                    )}

                                    <span className="ml-auto shrink-0 text-amber-500">
                                      <BookmarkIcon />
                                    </span>
                                  </div>

                                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
                                    {
                                      bookmark.body
                                    }
                                  </p>

                                  <div className="mt-3 border-t border-amber-100 pt-3">
                                    <p className="line-clamp-1 text-xs font-semibold text-slate-700 transition group-hover:text-violet-700">
                                      {
                                        bookmark.target_title
                                      }
                                    </p>

                                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold capitalize text-violet-600">
                                        {
                                          bookmark.target_type
                                        }
                                      </span>

                                      <span className="text-[11px] text-slate-400">
                                        Saved{" "}
                                        {formatDate(
                                          bookmark.bookmarked_at,
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div className="mt-7 rounded-2xl bg-[#faf8ff] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Member Since
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {
                      memberSince
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* =========================
                ACCOUNT INFORMATION
            ========================= */}
            <div className="rounded-[2rem] border border-violet-100 bg-white p-7 shadow-xl shadow-violet-950/5 sm:p-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                  Account
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950">
                  Account
                  Information
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Basic information
                  connected to your
                  7ICONS Digital Home
                  account.
                </p>
              </div>

              <div className="mt-8 divide-y divide-violet-100">
                {/* Full Name */}
                <div className="py-5 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-2 font-medium text-slate-900">
                    {profile?.full_name ||
                      "Not set"}
                  </p>
                </div>

                {/* Username */}
                <div className="py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Username
                  </p>

                  <p className="mt-2 font-medium text-slate-900">
                    @{username}
                  </p>
                </div>

                {/* Account Badge */}
                <div className="py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Account Badge
                  </p>

                  <div className="mt-2">
                    <AccountBadge
                      badge={
                        accountBadge
                      }
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Email Address
                  </p>

                  <p className="mt-2 break-all font-medium text-slate-900">
                    {
                      user.email
                    }
                  </p>
                </div>

                {/* Email Status */}
                <div className="py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Email Status
                  </p>

                  <div className="mt-2">
                    {user.email_confirmed_at ? (
                      <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        Verification
                        Required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Controls */}
              <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] p-5">
                <p className="font-semibold text-slate-900">
                  Personalize your
                  profile
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Update your full
                  name, username, bio,
                  profile picture, and
                  profile background.
                </p>

                <Link
                  href="/profile/edit"
                  className="mt-4 inline-flex text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                >
                  Edit Profile →
                </Link>
              </div>

              <div className="mt-7">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}