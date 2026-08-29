const milestones = [
  {
    year: "2026",
    title: "The Digital Home Begins",
    description:
      "The 7ICONS digital home was created as a place to bring stories, memories, members, and community moments together.",
  },
  {
    year: "2026",
    title: "Stories & Blog",
    description:
      "A dedicated space was introduced for articles, memorable moments, behind-the-scenes stories, and community updates.",
  },
  {
    year: "2026",
    title: "Members Archive",
    description:
      "Member profiles became part of the website, preserving stories from current and former members in one connected archive.",
  },
  {
    year: "2026",
    title: "Schedule System",
    description:
      "A dynamic schedule was added to help ICONIA follow upcoming performances, fan meetings, livestreams, appearances, and previous events.",
  },
  {
    year: "2026",
    title: "Fan Representatives",
    description:
      "Regional representatives were introduced to connect local ICONIA communities and preserve stories from different parts of Indonesia.",
  },
  {
    year: "Next",
    title: "The Journey Continues",
    description:
      "More stories, features, memories, and community chapters can continue to become part of this growing digital home.",
  },
];

export default function WebsiteJourney() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-violet-200/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1000px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Website Journey
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Growing One Chapter at a{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Time
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            This digital home continues to grow as new stories,
            features, memories, and community chapters become part of
            the journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Main vertical line */}
          <div className="absolute bottom-0 left-[27px] top-0 w-px bg-violet-100 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-10">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${milestone.year}-${milestone.title}`}
                  className="relative sm:grid sm:grid-cols-2 sm:gap-14"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[20px] top-7 z-10 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-violet-600 shadow-sm sm:left-1/2 sm:-translate-x-1/2" />

                  {/* Card */}
                  <div
                    className={[
                      "ml-14 sm:ml-0",
                      isLeft
                        ? "sm:col-start-1 sm:pr-6"
                        : "sm:col-start-2 sm:pl-6",
                    ].join(" ")}
                  >
                    <article className="rounded-3xl border border-violet-100 bg-[#faf8ff] p-6 shadow-sm transition duration-300 hover:border-violet-200 hover:bg-white hover:shadow-lg hover:shadow-violet-950/5">
                      <span className="inline-flex rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-600">
                        {milestone.year}
                      </span>

                      <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                        {milestone.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {milestone.description}
                      </p>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-violet-100 bg-gradient-to-br from-[#f5efff] via-white to-[#f3edff] px-6 py-8 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Still Growing
          </p>

          <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-950 sm:text-3xl">
            This is only one chapter.
          </h3>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            As the journey continues, this digital home can continue
            growing alongside 7ICONS, ICONIA, and the stories still to
            come.
          </p>
        </div>
      </div>
    </section>
  );
}