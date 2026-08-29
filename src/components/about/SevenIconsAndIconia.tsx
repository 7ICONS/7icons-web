export default function SevenIconsAndIconia() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-200/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            7ICONS & ICONIA
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Two Sides of One{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            One creates the moments. The other carries those moments,
            memories, and stories forward.
          </p>
        </div>

        {/* Two Main Panels */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* 7ICONS */}
          <article className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-[#f8f5ff] via-white to-[#eee7ff] p-7 shadow-sm sm:p-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                ✦
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                The Artists
              </p>

              <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-950">
                7ICONS
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                The performances, personalities, music, stories, and
                moments that become the heart of this continuing
                journey.
              </p>

              <div className="mt-8 space-y-3">
                <div className="rounded-2xl border border-violet-100 bg-white/80 px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    Performances
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Moments created on stage and shared with the
                    audience.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-white/80 px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    Stories
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Personalities, journeys, and memorable chapters
                    worth preserving.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* ICONIA */}
          <article className="relative overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-[#eee7ff] via-white to-[#faf8ff] p-7 shadow-sm sm:p-9">
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-purple-300/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                💜
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                The Community
              </p>

              <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-950">
                ICONIA
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                The community that supports, remembers, celebrates, and
                keeps the stories of 7ICONS connected across different
                places and generations.
              </p>

              <div className="mt-8 space-y-3">
                <div className="rounded-2xl border border-violet-100 bg-white/80 px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    Community
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Fans connected through shared appreciation,
                    memories, and support.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-white/80 px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    Memory
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Keeping meaningful moments alive as the journey
                    continues.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Connection */}
        <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-violet-100 bg-[#faf8ff] px-6 py-8 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            The Connection
          </p>

          <h3 className="mt-3 font-serif text-2xl font-semibold leading-9 text-slate-950 sm:text-3xl">
            7ICONS creates the memories.
            <br className="hidden sm:block" /> ICONIA helps keep them
            alive.
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            This digital home exists between those two sides —
            preserving the journey while helping the community stay
            connected to every chapter.
          </p>
        </div>
      </div>
    </section>
  );
}