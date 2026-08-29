import Image from "next/image";
import Link from "next/link";

import { fanRepresentatives } from "@/data/fanRepresentatives";

export default function RepresentativesGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-violet-200/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-24 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Across Indonesia
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Meet the{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Representatives
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Discover ICONIA representatives from different regions who
            help connect local communities and preserve stories from
            across Indonesia.
          </p>
        </div>

        {/* Representative Grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 md:grid-cols-3">
          {fanRepresentatives.map((representative) => (
            <article
              key={representative.id}
              className="group"
            >
              <Link
                href={`/fan-representatives/${representative.slug}`}
                className="block"
              >
                {/* Representative Portrait */}
<div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-violet-100 bg-violet-50 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-violet-950/10">
  <Image
    src={representative.image}
    alt={representative.name}
    fill
    sizes="(max-width: 767px) 50vw, 33vw"
    className="object-cover transition duration-500 group-hover:scale-[1.03]"
  />

  {/* Region Badge */}
  <div className="absolute left-4 top-4">
    <span className="rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700 shadow-sm backdrop-blur-md">
      {representative.region}
    </span>
  </div>

  {/* Hover Overlay */}
  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-violet-950/80 via-violet-900/40 to-transparent px-5 pb-5 pt-20 transition-transform duration-300 group-hover:translate-y-0">
    <span className="text-sm font-semibold text-white">
      View Profile →
    </span>
  </div>
</div>

                {/* Representative Information */}
                <div className="px-1 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-600 sm:text-xs">
                    {representative.city}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                    {representative.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    {representative.role}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* More Regions */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-[#f7f3ff] via-white to-[#f3edff] px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
            ✦
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Growing Community
          </p>

          <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            More Regions Coming Soon
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            ICONIA reaches far beyond these regions. More fan
            representatives and local communities can be added as this
            digital home continues to grow.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-violet-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600">
              More Cities
            </span>

            <span className="rounded-full border border-violet-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600">
              More Communities
            </span>

            <span className="rounded-full border border-violet-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600">
              One ICONIA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}