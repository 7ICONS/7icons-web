import Image from "next/image";
import { redirect } from "next/navigation";

import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

import { completeUsernameOnboarding } from "./actions";

type UsernameOnboardingPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function UsernameOnboardingPage({
  searchParams,
}: UsernameOnboardingPageProps) {
  const { error } = await searchParams;

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } =
    await supabase
      .from("profiles")
      .select(
        `
          username,
          full_name
        `,
      )
      .eq("id", user.id)
      .maybeSingle();

  /*
   * Kalau username sudah ada, onboarding tidak perlu dibuka lagi.
   */
  if (profile?.username) {
    redirect("/");
  }

  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "ICONIA Member";

  return (
    <>
      <header className="border-b border-violet-100 bg-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="relative h-12 w-36 sm:w-40">
            <Image
              src="/brand/7icons-logo-v2.png"
              alt="7ICONS"
              fill
              priority
              sizes="160px"
              className="object-contain"
            />
          </div>

          <div className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
              Account Setup
            </p>
          </div>
        </div>
      </header>

      <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#faf8ff]">
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/25 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[760px] items-center px-5 py-16 sm:px-8">
          <div className="w-full rounded-[2rem] border border-violet-100 bg-white p-7 shadow-2xl shadow-violet-950/5 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-purple-500 text-xl font-bold text-white">
              {displayName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                Welcome to 7ICONS
              </p>

              <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
                Choose your ICONIA username
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
                Welcome, {displayName}. Choose a unique
                username that will identify you across the
                7ICONS community.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
              >
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            <form
              action={
                completeUsernameOnboarding
              }
              className="mt-8"
            >
              <label
                htmlFor="username"
                className="text-sm font-semibold text-slate-700"
              >
                Username
              </label>

              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-semibold text-slate-400">
                  @
                </span>

                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  maxLength={30}
                  autoComplete="username"
                  placeholder="your_username"
                  className="w-full rounded-xl border border-violet-100 bg-white py-3.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                3–30 characters. Lowercase letters,
                numbers, and underscores only.
              </p>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Complete Account Setup
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] px-5 py-5">
              <p className="text-sm font-semibold text-slate-800">
                Why do I need a username?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your username is used for your public
                profile and community activity. You can
                personalize the rest of your profile after
                completing account setup.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}