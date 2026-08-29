const features = [
  {
    icon: "🏠",
    title: "Homepage",
    description:
      "The main digital gateway for discovering the latest stories, members, schedules, and community highlights.",
  },
  {
    icon: "✦",
    title: "Stories & Blog",
    description:
      "A space for articles, memorable moments, behind-the-scenes stories, and community updates.",
  },
  {
    icon: "👥",
    title: "Members",
    description:
      "Explore member profiles, personalities, stories, and the people who have been part of the 7ICONS journey.",
  },
  {
    icon: "📅",
    title: "Schedule",
    description:
      "Follow upcoming performances, fan meetings, livestreams, appearances, and previous events.",
  },
  {
    icon: "💜",
    title: "Fan Representatives",
    description:
      "Discover representatives helping connect ICONIA communities across different regions in Indonesia.",
  },
  {
    icon: "📚",
    title: "Digital Archive",
    description:
      "Preserve stories, milestones, memories, and community moments so they remain accessible over time.",
  },
];

export default function WebsitePurpose() {
  return (
    <section className="relative overflow-hidden bg-[#faf8ff] py-16 sm:py-20 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            What This Website Is
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            One Digital Home for the{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Every section of this website has a role in preserving the
            history, stories, activities, and community surrounding
            7ICONS and ICONIA.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5 sm:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-50 text-2xl shadow-sm">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-violet-100 bg-white/70 px-6 py-6 text-center backdrop-blur-sm sm:px-8">
          <p className="font-serif text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
            More than a collection of pages — a growing archive of one
            continuing story.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The website can continue evolving as new stories, events,
            memories, and community chapters are added.
          </p>
        </div>
      </div>
    </section>
  );
}