import Link from "next/link";

export default function AboutClosing() {
  return (
    <section className="bg-[#faf8ff] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-[#f3edff] via-white to-[#efe6ff] px-6 py-12 text-center shadow-sm sm:px-10 sm:py-14 md:px-14 md:py-16">
          {/* Decorations */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />

          <div className="relative">
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              The Story Continues
            </p>

            {/* Title */}
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Keep Exploring the{" "}
              <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover the stories, members, schedules, and community
              moments that continue to shape the digital home of
              7ICONS and ICONIA.
            </p>

            {/* Quote */}
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/80 bg-white/60 px-5 py-5 backdrop-blur-sm">
              <p className="font-serif text-lg font-semibold leading-7 text-slate-900">
                Every chapter remembered today becomes part of the
                story carried into tomorrow.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore Stories
              </Link>

              <Link
                href="/members"
                className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
              >
                Meet the Members
              </Link>

              <Link
                href="/fan-representatives"
                className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
              >
                Meet ICONIA →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}