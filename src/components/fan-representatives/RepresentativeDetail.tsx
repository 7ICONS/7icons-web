import Image from "next/image";
import Link from "next/link";

import type { FanRepresentative } from "@/data/fanRepresentatives";

type RepresentativeDetailProps = {
  representative: FanRepresentative;
};

export default function RepresentativeDetail({
  representative,
}: RepresentativeDetailProps) {
  if (!representative.profile) {
    return null;
  }

  return (
    <article className="bg-white">
      {/* Profile Hero */}
      <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <Link
            href="/fan-representatives"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800"
          >
            <span aria-hidden="true">←</span>
            Back to Fan Representatives
          </Link>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[380px_1fr] lg:gap-16">
            {/* Portrait */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-3xl border border-violet-100 bg-violet-100 shadow-xl shadow-violet-950/5">
              <Image
                src={representative.image}
                alt={representative.name}
                fill
                priority
                sizes="(max-width: 767px) 90vw, 380px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/25 via-transparent to-transparent" />

              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 shadow-sm backdrop-blur-md">
                {representative.region}
              </span>
            </div>

            {/* Profile Header */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                {representative.role}
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                {representative.name}
              </h1>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                {representative.city} • {representative.region}
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {representative.profile.description}
              </p>

              {/* Social Contact */}
              {(representative.instagram ||
                representative.whatsapp) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {representative.instagram && (
                    representative.instagramUrl ? (
                      <a
                        href={representative.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                      >
                        <span
                          className="text-lg text-violet-600"
                          aria-hidden="true"
                        >
                          ◎
                        </span>

                        {representative.instagram}
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                        <span
                          className="text-lg text-violet-600"
                          aria-hidden="true"
                        >
                          ◎
                        </span>

                        {representative.instagram}
                      </div>
                    )
                  )}

                  {representative.whatsapp && (
                    <a
                      href={`https://wa.me/${representative.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <span aria-hidden="true">💬</span>
                      WhatsApp
                    </a>
                  )}
                </div>
              )}

              {/* Info Pills */}
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm text-slate-600">
                  ICONIA
                </span>

                <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm text-slate-600">
                  {representative.region}
                </span>

                <span className="rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm text-slate-600">
                  Representative since {representative.since}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Information */}
      <section className="border-b border-violet-100 bg-white">
        <div className="mx-auto grid max-w-[1000px] gap-4 px-5 py-10 sm:px-8 md:grid-cols-2 lg:px-10">
          <div className="rounded-3xl border border-violet-100 bg-[#faf8ff] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
              Community Mission
            </p>

            <p className="mt-3 text-base font-medium leading-7 text-slate-800">
              {representative.profile.mission}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-[#faf8ff] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
              Community Motto
            </p>

            <p className="mt-3 font-serif text-xl font-semibold leading-8 text-slate-900">
              “{representative.profile.motto}”
            </p>
          </div>
        </div>
      </section>

      {/* Profile Story */}
      <section className="mx-auto max-w-[900px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
        <div className="space-y-12">
          {representative.profile.sections.map((section, index) => (
            <section key={index}>
              {section.heading && (
                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                      Representative Story
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                    {section.heading}
                  </h2>
                </div>
              )}

              <div className="space-y-5">
                {section.paragraphs.map(
                  (paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-base leading-8 text-slate-700"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-violet-100 bg-[#faf8ff] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
            ICONIA Across Indonesia
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-slate-950">
            Discover more Fan Representatives.
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Explore representatives from other regions and discover
            more stories from the growing ICONIA community across
            Indonesia.
          </p>

          <Link
            href="/fan-representatives"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            ← Back to Representatives
          </Link>
        </div>
      </section>
    </article>
  );
}