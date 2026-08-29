const roles = [
  {
    icon: "👥",
    title: "Connect ICONIA",
    description:
      "Help connect ICONIA in each region so local communities can stay close, active, and connected.",
  },
  {
    icon: "📣",
    title: "Share Updates",
    description:
      "Share important updates, activities, and information related to 7ICONS with local ICONIA communities.",
  },
  {
    icon: "💜",
    title: "Support Community",
    description:
      "Support positive fan activities, community initiatives, and memorable moments shared between ICONIA.",
  },
  {
    icon: "📍",
    title: "Represent Regions",
    description:
      "Become a local bridge between ICONIA communities and the wider 7ICONS fan network across Indonesia.",
  },
];

export default function OurRole() {
  return (
    <section className="relative overflow-hidden bg-[#faf8ff] py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Our Role
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Connecting the{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Community
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Fan Representatives help strengthen the connection between
            ICONIA communities across different regions and the continuing
            journey of 7ICONS.
          </p>
        </div>

        {/* Role Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <article
              key={role.title}
              className="group rounded-3xl border border-violet-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
            >
              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-50 text-2xl shadow-sm">
                {role.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                {role.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {role.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-violet-100 bg-white/70 px-6 py-5 text-center backdrop-blur-sm">
          <p className="text-sm leading-7 text-slate-600">
            Fan Representatives are part of a growing community network
            created to keep ICONIA connected, informed, and represented
            across Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
}