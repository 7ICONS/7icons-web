import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5ff]">
      {/* Desktop Hero */}
      <div className="relative hidden h-[clamp(560px,33.333vw,640px)] md:block">
        <Image
          src="/hero/7icons-hero-desktop.png"
          alt="7ICONS and ICONIA"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0px"
          className="object-cover object-center"
        />

        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/45 via-38% to-transparent" />

        {/* Soft decorative glow */}
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-8 lg:px-10">
          <div className="max-w-[650px]">
            <p className="mb-3 text-lg font-medium tracking-wide text-slate-800 lg:text-xl">
              Official Digital Home of
            </p>

            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-violet-700 via-purple-600 to-violet-400 bg-clip-text text-transparent">
                7ICONS
              </span>

              <span className="text-slate-900"> &amp; </span>

              <span className="bg-gradient-to-r from-purple-600 to-violet-400 bg-clip-text text-transparent">
                ICONIA
              </span>
            </h1>

            <p className="mt-6 text-lg font-semibold text-violet-600 lg:text-xl">
              Stories, archives, members, and community — all in one place.
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 lg:text-lg">
              Discover the latest articles, explore member information,
              connect with fan representatives across Indonesia, and celebrate
              the journey of 7ICONS &amp; ICONIA together.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span aria-hidden="true">✦</span>
                Explore Articles
              </Link>

              <Link
                href="/members"
                className="inline-flex items-center justify-center rounded-xl border border-violet-400 bg-white/80 px-6 py-3.5 text-sm font-semibold text-violet-700 backdrop-blur-sm transition duration-200 hover:bg-violet-50"
              >
                Meet the Members
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero */}
      <div className="md:hidden">
        <div className="relative h-[240px] w-full overflow-hidden">
          <Image
            src="/hero/7icons-hero-desktop.png"
            alt="7ICONS and ICONIA"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 0px"
            className="object-cover object-[80%_center]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f5ff] via-transparent to-transparent" />
        </div>

        <div className="px-5 pb-14 pt-6 text-center">
          <p className="text-base font-medium text-slate-700">
            Official Digital Home of
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight">
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              7ICONS
            </span>

            <span className="text-slate-900"> &amp; </span>

            <span className="bg-gradient-to-r from-purple-600 to-violet-400 bg-clip-text text-transparent">
              ICONIA
            </span>
          </h1>

          <p className="mt-4 font-semibold leading-6 text-violet-600">
            Stories, archives, members, and community — all in one place.
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
            Discover stories, explore member information, and connect with
            ICONIA communities across Indonesia.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/blog"
              className="rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
            >
              ✦ Explore Articles
            </Link>

            <Link
              href="/members"
              className="rounded-xl border border-violet-400 bg-white px-6 py-3.5 text-sm font-semibold text-violet-700"
            >
              Meet the Members
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}