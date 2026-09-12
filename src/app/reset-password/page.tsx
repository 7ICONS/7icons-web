import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

import { resetPassword } from "./actions";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function RecoveryHeader() {
  return (
    <header className="border-b border-violet-100 bg-white">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="7ICONS Home"
          className="inline-flex items-center"
        >
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
        </Link>

        <div className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
            Account Recovery
          </p>
        </div>
      </div>
    </header>
  );
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { error } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <RecoveryHeader />

        <main className="relative overflow-hidden bg-[#faf8ff]">
          <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

          <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/25 blur-3xl" />

          <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[760px] items-center px-5 py-16 sm:px-8">
            <div className="w-full rounded-[2rem] border border-violet-100 bg-white px-6 py-12 text-center shadow-2xl shadow-violet-950/5 sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />

                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                Password Recovery
              </p>

              <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
                Reset link unavailable
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
                Your password reset link may be invalid,
                expired, or already used. Request a new
                recovery email to continue.
              </p>

              <Link
                href="/forgot-password"
                className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Request New Reset Link
              </Link>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="text-sm font-semibold !text-violet-700 transition hover:text-violet-900"
                >
                  ← Back to Sign In
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <RecoveryHeader />

      <main className="relative overflow-hidden bg-[#faf8ff]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/25 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] items-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-950/5 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left Panel */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Secure Your Account
                </p>

                <h1 className="mt-5 max-w-md font-serif text-4xl font-semibold leading-tight">
                  Choose a new password for your account.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
                  Create a password you&apos;ll remember
                  while keeping your 7ICONS Digital Home
                  account secure.
                </p>
              </div>

              <div className="relative mt-16">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <p className="font-serif text-xl font-semibold leading-8">
                    “Welcome back to your story.”
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    One more step and your account is ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-16 lg:py-16">
              <div className="mb-8 lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                  7ICONS Digital Home
                </p>
              </div>

              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                  Password Recovery
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Create a new password
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Enter and confirm your new password below.
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
                action={resetPassword}
                className="mt-9 space-y-5"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    New Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Enter your new password"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Use at least 8 characters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Confirm New Password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Repeat your new password"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Update Password
                </button>
              </form>

              <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] px-5 py-5">
                <p className="text-sm font-semibold text-slate-800">
                  After updating your password
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You&apos;ll be signed out of this website
                  and asked to sign in again using your new
                  password.
                </p>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs leading-6 text-slate-400">
                  Secure password recovery session
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}