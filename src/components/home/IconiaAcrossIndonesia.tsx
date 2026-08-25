import Image from "next/image";
import Link from "next/link";

const highlights = [
  {
    value: "38",
    label: "Provinces",
  },
  {
    value: "Growing",
    label: "Representative Network",
  },
  {
    value: "1",
    label: "United Community",
  },
];

export default function IconiaAcrossIndonesia() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      {/* Background decoration */}
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-gradient-to-b from-violet-600 to-purple-400" />

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
              ICONIA Across Indonesia
            </p>
          </div>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            From Sabang to Merauke, ICONIA is Everywhere
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Discover fan representatives and communities connecting ICONIA
            from different regions across Indonesia.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Indonesia Map */}
          <div className="relative min-h-[270px] overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-[#faf8ff] via-[#f4efff] to-[#eee7ff] p-5 shadow-sm sm:min-h-[360px] sm:p-8 lg:min-h-[470px]">
            {/* Decorative glow */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/15 blur-3xl" />

            <div className="relative flex h-full min-h-[230px] items-center justify-center sm:min-h-[300px] lg:min-h-[410px]">
              <Image
                src="/community/indonesia-map.png"
                alt="ICONIA representatives across Indonesia"
                width={1200}
                height={700}
                sizes="(max-width: 1023px) 100vw, 65vw"
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="absolute bottom-5 left-5 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-md sm:bottom-7 sm:left-7">
              Nationwide ICONIA Community
            </div>
          </div>

          {/* Information Panel */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
                Fan Representatives
              </span>

              <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">
                One Community,
                <br />
                Many Stories.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                Meet the people representing ICONIA in different regions,
                discover their communities, and stay connected with stories
                from across Indonesia.
              </p>

              {/* Highlights */}
              <div className="mt-8 grid grid-cols-3 gap-3 lg:grid-cols-1 xl:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[#faf8ff] px-3 py-4 text-center"
                  >
                    <p className="text-xl font-bold text-violet-700 md:text-2xl">
                      {item.value}
                    </p>

                    <p className="mt-1 text-[11px] font-medium leading-4 text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/fan-representatives"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Representatives
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}