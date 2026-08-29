const values = [
  {
    icon: "💜",
    title: "Appreciation",
    description:
      "Created with appreciation for 7ICONS, their journey, and the community that continues to support them.",
  },
  {
    icon: "📚",
    title: "Preservation",
    description:
      "Stories, memories, milestones, and community moments deserve a place where they can remain accessible over time.",
  },
  {
    icon: "🤝",
    title: "Community",
    description:
      "ICONIA is made up of people from different places and backgrounds, connected through shared support and memories.",
  },
  {
    icon: "✦",
    title: "Continuity",
    description:
      "The journey is not only about looking back. New stories, activities, and memories can continue to become part of this digital home.",
  },
];

export default function OurValues() {
  return (
    <section className="relative overflow-hidden bg-[#faf8ff] py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Our Values
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            What Guides This{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Digital Home
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            A few simple principles shape how this website preserves
            stories, celebrates the journey, and connects the ICONIA
            community.
          </p>
        </div>

        {/* Value Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article
              key={value.title}
              className="group rounded-3xl border border-violet-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-50 text-2xl shadow-sm">
                {value.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {value.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-violet-100 bg-white/70 px-6 py-7 text-center backdrop-blur-sm sm:px-8">
          <p className="font-serif text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
            Preserve what matters. Celebrate what was shared. Keep the
            journey connected.
          </p>
        </div>
      </div>
    </section>
  );
}