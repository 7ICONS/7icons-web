import Link from "next/link";

import { redirect } from "next/navigation";

import AccountBadge, {
  type AccountBadgeType,
} from "@/components/account/AccountBadge";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

type ProfilePageProps = {
  searchParams: Promise<{
    success?: string;
  }>;
};

type PublicAccountBadgeRow = {
  user_id: string;
  badge: string;
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

export default async function ProfilePage({
  searchParams,
}: ProfilePageProps) {
  const { success } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [
    { data: profile },
    { data: badgeRows, error: badgeError },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
          username,
          full_name,
          avatar_url,
          bio,
          created_at,
          updated_at
        `,
      )
      .eq("id", user.id)
      .single(),

    supabase.rpc(
      "get_public_account_badges",
      {
        target_user_ids: [user.id],
      },
    ),
  ]);

  if (badgeError) {
    console.error(
      "Unable to load account badge:",
      badgeError,
    );
  }

  const publicBadges =
    Array.isArray(badgeRows)
      ? (badgeRows as PublicAccountBadgeRow[])
      : [];

  const badgeRow = publicBadges.find(
    (item) => item.user_id === user.id,
  );

  const accountBadge =
    resolveAccountBadge(
      badgeRow?.badge,
    );

  const displayName =
    profile?.full_name ||
    profile?.username ||
    user.email?.split("@")[0] ||
    "ICONIA Member";

  const username =
    profile?.username ||
    user.user_metadata?.username ||
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
                Your personal space inside the digital home
                of 7ICONS & ICONIA.
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
              {/* Cover */}
              <div className="h-36 bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500" />

              <div className="px-7 pb-8">
                {/* Avatar */}
                <div className="-mt-14">
                  {profile?.avatar_url ? (
                    <img
                      src={
                        profile.avatar_url
                      }
                      alt={displayName}
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-700 to-purple-500 text-4xl font-bold text-white shadow-lg">
                      {initial}
                    </div>
                  )}
                </div>

                {/* Identity */}
                <div className="mt-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950">
                      {displayName}
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

                {/* Member Since */}
                <div className="mt-6 rounded-2xl bg-[#faf8ff] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Member Since
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {memberSince}
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
                  Account Information
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Basic information connected to your
                  7ICONS Digital Home account.
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
                    {user.email}
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
                  Personalize your profile
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Update your full name, username, and bio.
                  Profile picture support will be added next.
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