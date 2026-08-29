import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#faf8ff]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/25 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] items-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-950/5 lg:grid-cols-[0.9fr_1.1fr]">
            {/* =========================
                LEFT BRAND PANEL
            ========================= */}

            <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              {/* Decorations */}
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  7ICONS Digital Home
                </p>

                <h1 className="mt-5 max-w-md font-serif text-4xl font-semibold leading-tight">
                  Welcome back to the home of 7ICONS & ICONIA.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
                  Sign in to continue exploring stories, memories,
                  members, community moments, and everything connected
                  to the 7ICONS journey.
                </p>
              </div>

              <div className="relative mt-16">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <p className="font-serif text-xl font-semibold leading-8">
                    “Every voice. One iconic story.”
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Built for ICONIA, by ICONIA.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================
                LOGIN FORM
            ========================= */}

            <div className="px-6 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-16 lg:py-16">
              {/* Mobile Branding */}
              <div className="mb-8 lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                  7ICONS Digital Home
                </p>
              </div>

              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                  Welcome Back
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Continue your journey through the digital home of
                  7ICONS and ICONIA.
                </p>
              </div>

              {/* Form */}
              <form className="mt-9 space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <Link
  href="/forgot-password"
  className="text-xs font-semibold text-violet-600 transition hover:text-violet-800"
>
  Forgot password?
</Link>
                  </div>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {/* Remember Me */}
                <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-violet-200 accent-violet-700"
                  />

                  Remember me
                </label>

                {/* Login Button */}
                <button
                  type="button"
                  className="w-full rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-violet-100" />

                <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Or
                </span>

                <div className="h-px flex-1 bg-violet-100" />
              </div>

              {/* Google Placeholder */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-violet-100 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs font-bold">
                  G
                </span>

                Continue with Google
              </button>

              {/* Signup */}
              <p className="mt-8 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-violet-700 transition hover:text-violet-900"
                >
                  Create an account
                </Link>
              </p>

              {/* UI Status */}
              <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] px-5 py-4">
                <p className="text-center text-xs leading-6 text-slate-500">
                  Account authentication is not active yet. This page
                  currently serves as the visual interface for the
                  upcoming account system.
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