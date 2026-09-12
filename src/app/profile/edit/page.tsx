import Link from "next/link";
import { redirect } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AvatarUploader from "@/components/profile/AvatarUploader";
import ProfileBackgroundUploader from "@/components/profile/ProfileBackgroundUploader";
import { createClient } from "@/lib/supabase/server";

import { updateProfile } from "./actions";

type EditProfilePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditProfilePage({
  searchParams,
}: EditProfilePageProps) {
  const { error } =
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

  const {
    data: profile,
  } =
    await supabase
      .from("profiles")
      .select(
        `
          username,
          full_name,
          bio,
          avatar_url,
          avatar_path,
          background_url,
          background_path
        `,
      )
      .eq("id", user.id)
      .single();

  const fullName =
    profile?.full_name ||
    user.user_metadata
      ?.full_name ||
    "";

  const username =
    profile?.username ||
    user.user_metadata
      ?.username ||
    "";

  const bio =
    profile?.bio || "";

  const displayName =
    fullName ||
    username ||
    user.email?.split(
      "@",
    )[0] ||
    "ICONIA Member";

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#faf8ff]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-72 h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        <section className="relative mx-auto max-w-[900px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          {/* Heading */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              ICONIA Account
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Edit Profile
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Personalize how you
              appear inside the
              digital home of
              7ICONS & ICONIA.
            </p>
          </div>

          <div className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-xl shadow-violet-950/5 sm:p-9 lg:p-10">
            {/* Error */}
            {error && (
              <div
                className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                role="alert"
                aria-live="polite"
              >
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* =========================
                AVATAR
            ========================= */}
            <div className="mb-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Profile Picture
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
                Your Avatar
              </h2>

              <div className="mt-5">
                <AvatarUploader
                  currentAvatarUrl={
                    profile?.avatar_url ??
                    null
                  }
                  currentAvatarPath={
                    profile?.avatar_path ??
                    null
                  }
                  displayName={
                    displayName
                  }
                />
              </div>
            </div>

            <div className="mb-9 h-px bg-violet-100" />

            {/* =========================
                PROFILE BACKGROUND
            ========================= */}
            <div className="mb-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Profile Cover
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
                Your Background
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Personalize the
                cover displayed at
                the top of your
                ICONIA profile.
              </p>

              <div className="mt-5">
                <ProfileBackgroundUploader
                  currentBackgroundUrl={
                    profile?.background_url ??
                    null
                  }
                  currentBackgroundPath={
                    profile?.background_path ??
                    null
                  }
                />
              </div>
            </div>

            <div className="mb-9 h-px bg-violet-100" />

            {/* =========================
                PROFILE DATA
            ========================= */}
            <form
              action={
                updateProfile
              }
              className="space-y-7"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-slate-800"
                >
                  Full Name
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  This name will
                  appear on your
                  ICONIA profile.
                </p>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  maxLength={80}
                  defaultValue={
                    fullName
                  }
                  autoComplete="name"
                  className="mt-3 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-800"
                >
                  Username
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  3–30 characters.
                  Letters, numbers,
                  and underscores
                  only.
                </p>

                <div className="relative mt-3">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                    @
                  </span>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    minLength={3}
                    maxLength={30}
                    defaultValue={
                      username
                    }
                    autoComplete="username"
                    className="w-full rounded-xl border border-violet-100 bg-white py-3.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="text-sm font-semibold text-slate-800"
                >
                  Bio
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Tell other ICONIA
                  members a little
                  about yourself.
                  Maximum 300
                  characters.
                </p>

                <textarea
                  id="bio"
                  name="bio"
                  rows={6}
                  maxLength={300}
                  defaultValue={
                    bio
                  }
                  placeholder="Write something about yourself..."
                  className="mt-3 w-full resize-none rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Email Address
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Email editing is
                  handled separately
                  for account
                  security.
                </p>

                <div className="mt-3 rounded-xl border border-violet-100 bg-[#faf8ff] px-4 py-3.5">
                  <p className="break-all text-sm font-medium text-slate-600">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-violet-100 pt-7 sm:flex-row sm:justify-end">
                <Link
                  href="/profile"
                  className="flex items-center justify-center rounded-xl border border-violet-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}