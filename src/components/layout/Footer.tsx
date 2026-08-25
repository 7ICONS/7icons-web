import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  {
    label: "Articles",
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
    label: "Archive",
    href: "/archive",
  },
];

const communityLinks = [
  {
    label: "Comments",
    href: "/community",
  },
  {
    label: "Community Guidelines",
    href: "/guidelines",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "About",
    href: "/about",
  },
];

const accountLinks = [
  {
    label: "My Profile",
    href: "/profile",
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
  },
  {
    label: "My Comments",
    href: "/profile/comments",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#160b2d] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.25fr_0.75fr_0.85fr_0.75fr_1.5fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="7ICONS Home"
              className="inline-flex"
            >
              <div className="relative h-16 w-48 overflow-hidden">
                <Image
                  src="/brand/7icons-logo-v2.png"
                  alt="7ICONS"
                  fill
                  sizes="192px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-violet-100/70">
              A digital home for stories, memories, members, and communities
              surrounding 7ICONS &amp; ICONIA.
            </p>

            <p className="mt-5 text-sm font-medium text-violet-300">
              Every Voice. One Iconic Story.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-violet-100/70 transition hover:text-violet-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Community
            </h3>

            <ul className="mt-5 space-y-3">
              {communityLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-violet-100/70 transition hover:text-violet-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-violet-100/70 transition hover:text-violet-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Stay Connected
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-6 text-violet-100/70">
              Get the latest stories and updates from 7ICONS &amp; ICONIA.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-violet-100/40 transition focus:border-violet-400 focus:bg-white/15"
              />

              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/30"
              >
                Subscribe
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-violet-100/40">
              Newsletter subscription will be available in a future update.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-center text-xs text-violet-100/50 sm:px-8 md:flex-row md:items-center md:justify-between md:text-left lg:px-10">
          <p>© 2026 7ICONS. All rights reserved.</p>

          <p>
            Built for{" "}
            <span className="font-semibold text-violet-300">ICONIA</span>, by{" "}
            <span className="font-semibold text-violet-300">ICONIA</span>. 💜
          </p>
        </div>
      </div>
    </footer>
  );
}