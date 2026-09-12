import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description:
    "Community guidelines for the 7ICONS & ICONIA digital home.",
};

const guidelines = [
  {
    number: "01",
    title: "Respect Every Member",
    description:
      "Treat every ICONIA member with respect. Personal attacks, harassment, bullying, discrimination, or deliberately hostile behavior are not welcome in this community.",
  },
  {
    number: "02",
    title: "Keep Conversations Relevant",
    description:
      "Comments should stay reasonably connected to the article, gallery, event, or discussion where they are posted. Healthy conversations are encouraged, but repeated off-topic disruption may be moderated.",
  },
  {
    number: "03",
    title: "No Spam or Repetitive Content",
    description:
      "Avoid posting the same message repeatedly, excessive promotional content, misleading links, or messages intended only to flood a discussion.",
  },
  {
    number: "04",
    title: "Do Not Impersonate Others",
    description:
      "Do not pretend to be a 7ICONS member, staff member, ICONIA Representative, moderator, administrator, or another community member.",
  },
  {
    number: "05",
    title: "Protect Personal Information",
    description:
      "Do not publish private or sensitive information belonging to yourself or someone else, including phone numbers, private addresses, account credentials, or other personal data that should not be public.",
  },
  {
    number: "06",
    title: "Keep Content Safe",
    description:
      "Content involving threats, illegal activity, malicious links, explicit abuse, or material that could endanger other people may be removed immediately.",
  },
];

const moderationActions = [
  "A comment may be hidden or removed.",
  "Repeated violations may lead to temporary account suspension.",
  "Serious or repeated abuse may result in an account being banned.",
  "Moderation decisions may consider context, severity, and previous behavior.",
];

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#faf8ff]">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-[520px] h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        {/* Hero */}
        <section className="relative border-b border-violet-100 bg-white/70">
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              ICONIA Community
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Community Guidelines
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              A welcoming community starts with the way we treat one another.
              These guidelines help keep conversations around 7ICONS &amp;
              ICONIA respectful, safe, and meaningful for everyone.
            </p>
          </div>
        </section>

        {/* Guidelines */}
        <section className="relative mx-auto max-w-[1100px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {guidelines.map((item) => (
              <article
                key={item.number}
                className="rounded-[1.75rem] border border-violet-100 bg-white p-7 shadow-lg shadow-violet-950/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-sm font-bold text-violet-700">
                    {item.number}
                  </span>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-slate-950">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Moderation */}
          <div className="mt-12 rounded-[2rem] border border-violet-100 bg-white p-7 shadow-xl shadow-violet-950/5 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
              Moderation
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950">
              How moderation works
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              Comments and community activity may be reviewed by authorized
              moderators or administrators. Moderation exists to protect the
              community and keep discussions constructive.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {moderationActions.map((action) => (
                <div
                  key={action}
                  className="flex gap-3 rounded-2xl bg-[#faf8ff] px-5 py-4"
                >
                  <span className="mt-0.5 text-violet-600">●</span>

                  <p className="text-sm leading-6 text-slate-600">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder */}
          <div className="mt-8 rounded-[2rem] bg-gradient-to-r from-violet-700 to-purple-500 p-7 text-white shadow-xl shadow-violet-500/20 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">
              Remember
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Every voice can help shape the community.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-violet-100">
              Different opinions are welcome. Respectful disagreement is part
              of a healthy community. The goal is not for everyone to think the
              same way, but to make sure everyone can participate without being
              attacked or intimidated.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
            <Link
                href="/community"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold !text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
>
  View Community Comments
</Link>

              <Link
                href="/"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}