export default function FanRepresentativesHero() {
  return (
    <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 text-center sm:px-8 md:py-20 lg:px-10 lg:py-24">
        {/* Small Label */}
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          ICONIA Community
        </p>

        {/* Main Title */}
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
          Fan{" "}
          <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
            Representatives
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg md:leading-8">
          Connecting ICONIA across Indonesia through local communities,
          shared stories, activities, and the continuing journey with
          7ICONS.
        </p>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            Across Indonesia
          </span>

          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            ICONIA Community
          </span>

          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            Local Representatives
          </span>
        </div>

        {/* Bottom Message */}
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-violet-100 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-sm">
          <p className="text-sm leading-6 text-slate-600">
            Different cities, different stories, one community connected
            by the same love for 7ICONS.
          </p>
        </div>
      </div>
    </section>
  );
}