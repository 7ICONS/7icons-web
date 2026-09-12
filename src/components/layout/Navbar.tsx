"use client";

import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

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
    label: "Gallery",
    href: "/gallery",
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
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const [profile, setProfile] = useState<Profile | null>(null);

  const [authLoading, setAuthLoading] = useState(true);

  const [logoutLoading, setLogoutLoading] = useState(false);

  /*
   * =========================================================
   * LOAD AUTH USER
   * =========================================================
   */
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      setUser(currentUser);
      setAuthLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      setUser(session?.user ?? null);
      setAuthLoading(false);

      if (!session?.user) {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, [supabase]);

  /*
   * =========================================================
   * LOAD PROFILE
   * =========================================================
   */
  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      if (!user) {
        setProfile(null);

        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
            username,
            full_name,
            avatar_url
          `,
        )
        .eq("id", user.id)
        .single();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error("Navbar profile error:", error);

        setProfile(null);

        return;
      }

      setProfile(data);
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [supabase, user]);

  /*
   * =========================================================
   * ACTIVE NAVIGATION
   * =========================================================
   */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /*
   * =========================================================
   * USER DISPLAY DATA
   * =========================================================
   */
  const displayName =
    profile?.username ||
    profile?.full_name ||
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Account";

  const avatarUrl =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    null;

  const initial =
    displayName.trim().charAt(0).toUpperCase() || "I";

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */
  const handleLogout = async () => {
    setLogoutLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);

      alert("Unable to sign out. Please try again.");

      setLogoutLoading(false);

      return;
    }

    setUser(null);
    setProfile(null);
    setMobileMenuOpen(false);
    setLogoutLoading(false);

    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* =========================
            LOGO
        ========================= */}
        <Link
          href="/"
          className="relative flex h-16 w-48 shrink-0 items-center overflow-hidden"
          aria-label="7ICONS Home"
        >
          <Image
            src="/brand/7icons-logo-v2.png"
            alt="7ICONS"
            width={240}
            height={80}
            priority
            className="h-14 w-auto scale-110 object-contain"
          />
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}
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

        {/* =========================
            DESKTOP ACTIONS
        ========================= */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* Search */}
          <Link
            href="/search"
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
          </Link>

          <div className="h-7 w-px bg-gray-200" />

          {/* =========================
              AUTH LOADING
          ========================= */}
          {authLoading ? (
            <div className="h-10 w-36 animate-pulse rounded-xl bg-violet-50" />
          ) : user ? (
            /* =========================
                LOGGED IN
            ========================= */
            <div className="flex items-center gap-3">
              {/* Profile Button */}
              <Link
                href="/profile"
                className="flex items-center gap-2.5 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 transition hover:border-violet-200 hover:bg-violet-100"
              >
                {/* Avatar */}
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-purple-500 text-sm font-bold text-white">
                    {initial}
                  </div>
                )}

                {/* Username */}
                <div className="max-w-32">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {displayName}
                  </p>
                </div>
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="rounded-xl border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {logoutLoading
                  ? "Signing out..."
                  : "Logout"}
              </button>
            </div>
          ) : (
            /* =========================
                LOGGED OUT
            ========================= */
            <>
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
            </>
          )}
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen((current) => !current)
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-900 transition hover:bg-violet-50 hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 lg:hidden"
        >
          {mobileMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
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
              className="h-6 w-6"
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

      {/* =========================
          MOBILE MENU
      ========================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pb-6 pt-3 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {/* Navigation */}
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
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

            {/* Search */}
            <Link
              href="/search"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="mt-4 flex items-center gap-3 rounded-xl border border-violet-100 px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-violet-50 hover:text-violet-600"
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

              Search
            </Link>

            {/* =========================
                MOBILE AUTH
            ========================= */}
            {authLoading ? (
              <div className="mt-5 h-12 w-full animate-pulse rounded-xl bg-violet-50" />
            ) : user ? (
              /* Logged In */
              <div className="mt-5 space-y-3">
                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 transition hover:border-violet-200 hover:bg-violet-100"
                >
                  {/* Avatar */}
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-purple-500 font-bold text-white">
                      {initial}
                    </div>
                  )}

                  {/* Identity */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {displayName}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="flex w-full items-center justify-center rounded-xl border border-violet-200 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {logoutLoading
                    ? "Signing out..."
                    : "Logout"}
                </button>
              </div>
            ) : (
              /* Logged Out */
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex items-center justify-center rounded-xl border border-violet-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/15"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}