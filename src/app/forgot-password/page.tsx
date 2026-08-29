import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#faf8ff]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/25 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] items-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-950/5 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left Brand Panel */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Account Recovery
                </p>

                <h1 className="mt-5 max-w-md font-serif text-4xl font-semibold leading-tight">
                  Find your way back to the 7ICONS digital home.
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
                  Enter the email connected to your account and we&apos;ll
                  prepare a way for you to reset your password.
                </p>
              </div>

              <div className="relative mt-16">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <p className="font-serif text-xl font-semibold leading-8">
                    “Your journey is still here.”
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Reconnect with your account whenever you&apos;re ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Recovery Form */}
            <div className="px-6 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-16 lg:py-16">
              {/* Mobile Label */}
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
                  Forgot your password?
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Enter your account email and we&apos;ll send instructions
                  for resetting your password.
                </p>
              </div>

              <form className="mt-9">
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

                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Send Reset Instructions
                </button>
              </form>

              {/* Information */}
              <div className="mt-8 rounded-2xl border border-violet-100 bg-[#faf8ff] px-5 py-5">
                <p className="text-sm font-semibold text-slate-800">
                  What happens next?
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  When account recovery becomes active, a secure reset
                  link will be sent to the email associated with your
                  account.
                </p>
              </div>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                >
                  ← Back to Sign In
                </Link>
              </div>

              {/* UI Notice */}
              <div className="mt-8 rounded-2xl border border-violet-100 bg-white px-5 py-4">
                <p className="text-center text-xs leading-6 text-slate-500">
                  Password recovery is not active yet. This page
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