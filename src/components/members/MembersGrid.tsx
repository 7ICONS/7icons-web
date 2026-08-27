import Image from "next/image";
import Link from "next/link";

const currentMembers = [
  {
    id: 1,
    name: "Member 01",
    role: "7ICONS Member",
    image: "/members/member-01.png",
    slug: "member-01",
  },
  {
    id: 2,
    name: "Member 02",
    role: "7ICONS Member",
    image: "/members/member-02.png",
    slug: "member-02",
  },
  {
    id: 3,
    name: "Member 03",
    role: "7ICONS Member",
    image: "/members/member-03.png",
    slug: "member-03",
  },
  {
    id: 4,
    name: "Member 04",
    role: "7ICONS Member",
    image: "/members/member-04.png",
    slug: "member-04",
  },
  {
    id: 5,
    name: "Member 05",
    role: "7ICONS Member",
    image: "/members/member-05.png",
    slug: "member-05",
  },
  {
    id: 6,
    name: "Member 06",
    role: "7ICONS Member",
    image: "/members/member-06.png",
    slug: "member-06",
  },
];

const formerMembers = [
  {
    id: 7,
    name: "Former Member 01",
    role: "Former 7ICONS Member",
    image: "/members/former-member-01.png",
    slug: "former-member-01",
  },
  {
    id: 8,
    name: "Former Member 02",
    role: "Former 7ICONS Member",
    image: "/members/former-member-02.png",
    slug: "former-member-02",
  },
  {
    id: 9,
    name: "Former Member 03",
    role: "Former 7ICONS Member",
    image: "/members/former-member-03.png",
    slug: "former-member-03",
  },
];

export default function MembersGrid() {
  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Current Members Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
              Current Members
            </p>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Discover Their Stories
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Get to know the members, explore their personalities, and discover
            the stories and memorable moments behind 7ICONS.
          </p>
        </div>

        {/* Current Members Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {currentMembers.map((member) => (
            <article key={member.id} className="group">
              <Link href={`/members/${member.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-violet-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-xl bg-white/90 px-3 py-2 text-center text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-md">
                      View Profile →
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <h3 className="text-base font-semibold text-slate-950 transition group-hover:text-violet-700 md:text-lg">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                    {member.role}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Former Members */}
        <div className="mt-20 border-t border-violet-100 pt-14">
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-gradient-to-b from-violet-500 to-purple-300" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                Former Members
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Part of the Journey
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Remember the former members who have also been part of the
              stories, memories, and journey of 7ICONS.
            </p>
          </div>

          {/* Former Members Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 md:grid-cols-3 lg:mx-auto lg:max-w-3xl">
            {formerMembers.map((member) => (
              <article key={member.id} className="group">
                <Link href={`/members/${member.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-violet-100 bg-violet-50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 767px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700 shadow-sm backdrop-blur-md">
                      Former Member
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                    <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-xl bg-white/90 px-3 py-2 text-center text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-md">
                        View Profile →
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <h3 className="text-base font-semibold text-slate-950 transition group-hover:text-violet-700 md:text-lg">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                      {member.role}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-14 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">
            Explore individual profiles to discover more about each member and
            their journey with 7ICONS.
          </p>
        </div>
      </div>
    </section>
  );
}