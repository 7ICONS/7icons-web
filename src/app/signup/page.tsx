import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function SignUpPage() {
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
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Join the Community
                </p>

                <h1 className="mt-5 max-w-md font-serif text-4xl font-semibold leading-tight">
                  Become part of the 7ICONS & ICONIA digital home.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
                  Create an account to prepare for community features,
                  personal activity, discussions, and future ways to stay
                  connected with the journey.
                </p>
              </div>

              <div className="relative mt-16">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <p className="font-serif text-xl font-semibold leading-8">
                    “Every voice has a place in the story.”
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Welcome to the digital home of 7ICONS & ICONIA.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================
                SIGN UP FORM
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
                  Create Your Account
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Join the community
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Create your account and become part of the digital home
                  of 7ICONS and ICONIA.
                </p>
              </div>

              {/* Form */}
              <form className="mt-9 space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

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
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat your password"
                    className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-violet-200 accent-violet-700"
                  />

                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-semibold text-violet-700 transition hover:text-violet-900"
                    >
                      Terms of Use
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-semibold text-violet-700 transition hover:text-violet-900"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>

                {/* Create Account */}
                <button
                  type="button"
                  className="w-full rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Create Account
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

              {/* Google */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-violet-100 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs font-bold">
                  G
                </span>

                Continue with Google
              </button>

              {/* Login */}
              <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-violet-700 transition hover:text-violet-900"
                >
                  Sign in
                </Link>
              </p>

              {/* UI Notice */}
              <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] px-5 py-4">
                <p className="text-center text-xs leading-6 text-slate-500">
                  Account registration is not active yet. This page
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