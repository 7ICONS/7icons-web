import Link from "next/link";

export default function CommunityCTA() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-[#f5efff] via-[#fbf9ff] to-[#efe6ff] px-6 py-12 text-center shadow-sm sm:px-10 sm:py-14 md:px-14 md:py-16">
          {/* Decorations */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-violet-300/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl" />

          <div className="relative">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-white/80 text-3xl shadow-sm backdrop-blur-sm">
              💜
            </div>

            {/* Label */}
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              One Community
            </p>

            {/* Title */}
            <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Together, We Are{" "}
              <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
                ICONIA
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Different cities, different stories, and different
              communities — connected by one shared journey and one
              lasting support for 7ICONS.
            </p>

            {/* Small Quote */}
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/80 bg-white/60 px-5 py-4 backdrop-blur-sm">
              <p className="text-sm font-medium leading-6 text-slate-600">
                Every region adds another story to the growing ICONIA
                community across Indonesia.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/members"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Meet the Members
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
              >
                Explore Stories →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}