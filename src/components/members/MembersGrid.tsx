import Link from "next/link";

import type { Member } from "@/lib/members";

type MembersGridProps = {
  members: Member[];
};

type MemberCardProps = {
  member: Member;
  former?: boolean;
};

function MemberCard({
  member,
  former = false,
}: MemberCardProps) {
  return (
    <article className="group">
      <Link
        href={`/members/${member.slug}`}
        className="block"
      >
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${
            former
              ? "border border-violet-100 bg-violet-50"
              : "bg-violet-100"
          }`}
        >
          {member.image_url ? (
            <div
              role="img"
              aria-label={member.name}
              className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.04]"
              style={{
                backgroundImage: `url("${member.image_url}")`,
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-100 via-purple-50 to-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-12 w-12 text-violet-300"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            </div>
          )}

          {former && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700 shadow-sm backdrop-blur-md">
              Former Member
            </span>
          )}

          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              former
                ? "from-violet-950/20"
                : "from-violet-950/25"
            } via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100`}
          />

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
  );
}

export default function MembersGrid({
  members,
}: MembersGridProps) {
  const currentMembers = members.filter(
    (member) =>
      member.member_status === "current",
  );

  const formerMembers = members.filter(
    (member) =>
      member.member_status === "former",
  );

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
            Get to know the members, explore their
            personalities, and discover the stories
            and memorable moments behind 7ICONS.
          </p>
        </div>

        {/* Current Members Grid */}
        {currentMembers.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {currentMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-violet-100 bg-violet-50/30 px-6 py-12 text-center">
            <p className="text-sm text-slate-500">
              No current member profiles are available.
            </p>
          </div>
        )}

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
              Remember the former members who have also
              been part of the stories, memories, and
              journey of 7ICONS.
            </p>
          </div>

          {/* Former Members Grid */}
          {formerMembers.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 md:grid-cols-3 lg:mx-auto lg:max-w-3xl">
              {formerMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  former
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-violet-100 bg-violet-50/30 px-6 py-12 text-center">
              <p className="text-sm text-slate-500">
                No former member profiles are available.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Note */}
        <div className="mt-14 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">
            Explore individual profiles to discover more
            about each member and their journey with
            7ICONS.
          </p>
        </div>
      </div>
    </section>
  );
}