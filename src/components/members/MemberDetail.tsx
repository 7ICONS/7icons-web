import Image from "next/image";
import Link from "next/link";

import type { MemberProfile } from "@/data/members";

type MemberDetailProps = {
  member: MemberProfile;
};

export default function MemberDetail({
  member,
}: MemberDetailProps) {
  if (!member.profile) {
    return null;
  }

  return (
    <article className="bg-white">
      {/* Profile Hero */}
      <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <Link
            href="/members"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
          >
            <span aria-hidden="true">←</span>
            Back to Members
          </Link>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[380px_1fr] lg:gap-16">
            {/* Portrait */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-3xl border border-violet-100 bg-violet-100 shadow-xl shadow-violet-950/5">
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 767px) 90vw, 380px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-transparent to-transparent" />

              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 shadow-sm backdrop-blur-md">
                {member.status}
              </span>
            </div>

            {/* Profile Header */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                {member.role}
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                {member.profile.displayName}
              </h1>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                {member.profile.position}
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {member.profile.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm text-slate-600">
                  7ICONS
                </span>

                <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm text-slate-600">
                  Member Profile
                </span>

                <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm text-slate-600">
                  ICONIA Archive
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="mx-auto max-w-[900px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
        <div className="space-y-12">
          {member.profile.sections.map((section, index) => (
            <section key={index}>
              {section.heading && (
                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                      Profile Story
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                    {section.heading}
                  </h2>
                </div>
              )}

              <div className="space-y-5">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-base leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Card */}
        <div className="mt-16 rounded-3xl border border-violet-100 bg-[#faf8ff] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
            Meet the Members
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-slate-950">
            Discover more 7ICONS member stories.
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Return to the Members page to explore current and former members
            who have been part of the 7ICONS journey.
          </p>

          <Link
            href="/members"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            ← Back to Members
          </Link>
        </div>
      </section>
    </article>
  );
}