export default function OurStory() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-violet-200/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Our Story
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              A Place to Keep the{" "}
              <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
                Story Alive
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              This digital home was created from a simple idea: the
              journey of 7ICONS and ICONIA deserves a place where its
              stories, memories, and community moments can continue to
              live together.
            </p>
          </div>

          {/* Right Story Card */}
          <div className="rounded-[2rem] border border-violet-100 bg-[#faf8ff] p-6 shadow-sm sm:p-8 md:p-10">
            <div className="space-y-6 text-base leading-8 text-slate-700">
              <p>
                Over time, performances, articles, member stories,
                community activities, and small memorable moments can
                become scattered across many places.
              </p>

              <p>
                This website brings those pieces together into one
                digital space where ICONIA can explore the journey,
                revisit memories, discover stories, and stay connected
                with what comes next.
              </p>

              <p>
                It is not intended to replace the official platforms of
                7ICONS. Instead, it exists as a community-driven digital
                home built with appreciation for the group and the
                people who continue supporting their journey.
              </p>
            </div>

            {/* Highlight */}
            <div className="mt-8 rounded-2xl border border-violet-100 bg-white px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                The Idea
              </p>

              <p className="mt-3 font-serif text-lg font-semibold leading-7 text-slate-900 sm:text-xl">
                Preserve the memories. Connect the community. Continue
                the story.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}