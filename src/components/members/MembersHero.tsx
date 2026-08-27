export default function MembersHero() {
  return (
    <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#f8f5ff] to-white">
      {/* Decorative glow */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

      {/* Decorative sparkle */}
      <div className="absolute left-[16%] top-28 h-2 w-2 rotate-45 bg-violet-400/30" />
      <div className="absolute right-[18%] top-24 h-3 w-3 rotate-45 bg-purple-400/30" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Decoration */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-violet-300" />

            <span
              aria-hidden="true"
              className="text-xl text-violet-600"
            >
              ✦
            </span>

            <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet-300" />
          </div>

          {/* Label */}
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            7ICONS
          </p>

          {/* Title */}
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Meet the{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Members
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg">
            Discover the members of 7ICONS, explore their personalities,
            stories, memorable moments, and the journey they share with ICONIA.
          </p>
        </div>
      </div>
    </section>
  );
}