import Image from "next/image";
import Link from "next/link";

const members = [
  {
    id: 1,
    name: "Member 01",
    role: "7ICONS Member",
    image: "/members/member-01.png",
    href: "/members/member-01",
  },
  {
    id: 2,
    name: "Member 02",
    role: "7ICONS Member",
    image: "/members/member-02.png",
    href: "/members/member-02",
  },
  {
    id: 3,
    name: "Member 03",
    role: "7ICONS Member",
    image: "/members/member-03.png",
    href: "/members/member-03",
  },
  {
    id: 4,
    name: "Member 04",
    role: "7ICONS Member",
    image: "/members/member-04.png",
    href: "/members/member-04",
  },
  {
    id: 5,
    name: "Member 05",
    role: "7ICONS Member",
    image: "/members/member-05.png",
    href: "/members/member-05",
  },
  {
    id: 6,
    name: "Member 06",
    role: "7ICONS Member",
    image: "/members/member-06.png",
    href: "/members/member-06",
  },
];

export default function MeetMembers() {
  return (
    <section className="bg-[#faf8ff] py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                7ICONS
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Meet the Members
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Get to know the members, their stories, personalities, and
              journey with 7ICONS.
            </p>
          </div>

          <Link
            href="/members"
            className="hidden items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800 md:inline-flex"
          >
            View All Members
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
          {members.map((member) => (
            <Link
              key={member.id}
              href={member.href}
              className="group"
            >
              <article>
                {/* Portrait */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-violet-100 shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 16vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                  />

                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/25 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-40" />

                  {/* Hover indicator */}
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-violet-700 opacity-0 shadow-sm backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span aria-hidden="true">→</span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="pt-4 text-center">
                  <h3 className="text-base font-semibold text-slate-950 transition group-hover:text-violet-700 md:text-lg">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    {member.role}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-9 md:hidden">
          <Link
            href="/members"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300 bg-white px-5 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            View All Members
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}