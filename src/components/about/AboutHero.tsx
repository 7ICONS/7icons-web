export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 text-center sm:px-8 md:py-20 lg:px-10 lg:py-24">
        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          About This Digital Home
        </p>

        {/* Title */}
        <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
          Built for{" "}
          <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
            ICONIA
          </span>
          , by ICONIA.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg md:leading-8">
          A digital home created to preserve stories, memories,
          members, community moments, and the continuing journey of
          7ICONS together with ICONIA.
        </p>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            7ICONS
          </span>

          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            ICONIA
          </span>

          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            Stories & Memories
          </span>

          <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm">
            Community Archive
          </span>
        </div>

        {/* Statement */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-violet-100 bg-white/60 px-6 py-6 shadow-sm backdrop-blur-sm">
          <p className="font-serif text-lg font-semibold leading-8 text-slate-800 sm:text-xl">
            “Every voice. One iconic story.”
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            A place where memories from yesterday, today, and the
            chapters ahead can remain connected.
          </p>
        </div>
      </div>
    </section>
  );
}