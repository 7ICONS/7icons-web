"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Members",
    href: "/members",
  },
  {
    label: "Fan Representatives",
    href: "/fan-representatives",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex h-16 w-48 shrink-0 items-center overflow-hidden"
          aria-label="7ICONS Home"
        >
          <Image
            src="/brand/7icons-logo-v2.png"
            alt="7ICONS"
            width={240}
            height={64}
            priority
            className="h-14 w-auto scale-110 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-7 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-violet-600"
                    : "text-slate-800 hover:text-violet-600"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute inset-x-0 bottom-4 mx-auto h-0.5 w-full rounded-full bg-violet-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-violet-50 hover:text-violet-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>

          <div className="h-7 w-px bg-gray-200" />

          <Link
  href="/login"
  className="text-sm font-medium text-slate-900 transition hover:text-violet-700"
>
  Login
</Link>

<Link
  href="/signup"
  className="rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
>
  Sign Up
</Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-900 transition hover:bg-violet-50 hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 lg:hidden"
        >
          {mobileMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M6 6 18 18" />
              <path d="M18 6 6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pb-6 pt-3 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-gray-100 px-3 py-4 text-base font-medium transition ${
                    active
                      ? "bg-violet-50 text-violet-600"
                      : "text-slate-800 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-5 grid grid-cols-2 gap-3">
             <div className="mt-5 grid grid-cols-2 gap-3">
  <Link
    href="/login"
    className="flex items-center justify-center rounded-xl border border-violet-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/15"
  >
    Sign Up
  </Link>
</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}