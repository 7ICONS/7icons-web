"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    document.title = "Loading... | 7ICONS";
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf8ff] px-5">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/25 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        {/* Logo */}
        <div className="relative h-20 w-56 animate-pulse sm:h-24 sm:w-64">
          <Image
            src="/brand/7icons-logo-v2.png"
            alt="7ICONS"
            fill
            priority
            sizes="256px"
            className="object-contain"
          />
        </div>

        {/* Loading Dots */}
        <div className="mt-7 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-700 [animation-delay:-0.3s]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-400" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          ICONIA Digital Home
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Loading your next chapter...
        </p>
      </div>
    </main>
  );
}