import GalleryContent from "@/components/gallery/GalleryContent";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Gallery | 7ICONS",
  description:
    "Explore photos, memories, performances, and moments from the journey of 7ICONS and ICONIA.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-b from-[#f3edff] via-[#faf8ff] to-white">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-[1200px] px-5 py-16 text-center sm:px-8 md:py-24 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              7ICONS Gallery
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              Moments Worth
              <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Remembering
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Explore photos, performances, behind-the-scenes moments,
              and memories that capture the journey of 7ICONS together
              with ICONIA.
            </p>
          </div>
        </section>

        <GalleryContent />
      </main>

      <Footer />
    </>
  );
}