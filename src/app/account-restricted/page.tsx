import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

type AccountRestrictedPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AccountRestrictedPage({
  searchParams,
}: AccountRestrictedPageProps) {
  const { status } = await searchParams;

  const isBanned = status === "banned";

  return (
    <>
      <Navbar />

      <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#faf8ff]">
        {/* Background */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[900px] items-center px-5 py-16 sm:px-8">
          <div className="w-full overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-950/5">
            {/* Top Accent */}
            <div
              className={`h-2 ${
                isBanned
                  ? "bg-gradient-to-r from-red-600 to-rose-500"
                  : "bg-gradient-to-r from-amber-500 to-orange-400"
              }`}
            />

            <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
              {/* Icon */}
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl ${
                  isBanned
                    ? "bg-red-50 text-red-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {isBanned ? "×" : "!"}
              </div>

              <p
                className={`mt-7 text-xs font-semibold uppercase tracking-[0.2em] ${
                  isBanned
                    ? "text-red-600"
                    : "text-amber-600"
                }`}
              >
                Account Status
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {isBanned
                  ? "Account Banned"
                  : "Account Suspended"}
              </h1>

              {isBanned ? (
                <>
                  <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    This account has been banned from the 7ICONS Digital
                    Home. Your current session has been ended and account
                    features are no longer available.
                  </p>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                    If you believe this action was made in error, please
                    contact the 7ICONS Digital Home administration team.
                  </p>
                </>
              ) : (
                <>
                  <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    This account is temporarily suspended. You can still
                    browse the 7ICONS Digital Home, but account and
                    community editing features are temporarily
                    unavailable.
                  </p>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                    Access will return automatically after an
                    administrator reactivates your account.
                  </p>
                </>
              )}

              {/* Status Information */}
              <div
                className={`mx-auto mt-8 max-w-xl rounded-2xl border px-5 py-4 text-left ${
                  isBanned
                    ? "border-red-100 bg-red-50/60"
                    : "border-amber-100 bg-amber-50/60"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">
                  {isBanned
                    ? "Account access disabled"
                    : "Temporary restrictions"}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {isBanned
                    ? "Sign in and community account features are unavailable while this account is banned."
                    : "Profile editing, avatar changes, comments, and other community actions are unavailable while suspended."}
                </p>
              </div>

              {/* Navigation */}
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Back to Home
                </Link>

                {isBanned && (
                  <Link
                    href="/login"
                    className="rounded-xl border border-violet-200 bg-white px-6 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                  >
                    Return to Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}