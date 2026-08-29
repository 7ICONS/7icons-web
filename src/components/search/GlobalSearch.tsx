"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { blogArticles } from "@/data/blogArticles";
import { fanRepresentatives } from "@/data/fanRepresentatives";
import { members } from "@/data/members";
import { scheduleEvents } from "@/data/schedule";

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string;
};

export default function GlobalSearch() {
  const [query, setQuery] = useState("");

  const searchableItems = useMemo<SearchItem[]>(() => {
    const articles: SearchItem[] = blogArticles.map((article) => ({
      id: `article-${article.id}`,
      title: article.title,
      description: article.excerpt,
      category: "Article",
      href: `/blog/${article.slug}`,
      keywords: [
        article.title,
        article.excerpt,
        article.category,
        article.filterCategory,
        article.date,
      ].join(" "),
    }));

    const memberItems: SearchItem[] = members.map((member) => ({
      id: `member-${member.id}`,
      title: member.name,
      description: `${member.role} • ${member.status}`,
      category:
        member.status === "Former Member"
          ? "Former Member"
          : "Member",
      href: `/members/${member.slug}`,
      keywords: [
        member.name,
        member.role,
        member.status,
        member.shortBio,
      ].join(" "),
    }));

    const representatives: SearchItem[] =
      fanRepresentatives.map((representative) => ({
        id: `representative-${representative.id}`,
        title: representative.name,
        description: `${representative.city} • ${representative.region}`,
        category: "Fan Representative",
        href: `/fan-representatives/${representative.slug}`,
        keywords: [
          representative.name,
          representative.city,
          representative.region,
          representative.role,
          representative.shortBio,
        ].join(" "),
      }));

    const events: SearchItem[] = scheduleEvents.map((event) => ({
      id: `event-${event.id}`,
      title: event.title,
      description: `${event.date} • ${event.time} • ${event.location}`,
      category: "Schedule",
      href: `/schedule/${event.slug}`,
      keywords: [
        event.title,
        event.type,
        event.date,
        event.time,
        event.location,
        event.description ?? "",
      ].join(" "),
    }));

    return [
      ...articles,
      ...memberItems,
      ...representatives,
      ...events,
    ];
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return searchableItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query, searchableItems]);

  const hasQuery = query.trim().length > 0;

  return (
    <section className="relative overflow-hidden bg-[#faf8ff] py-16 sm:py-20 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-[900px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Global Search
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Search the{" "}
            <span className="bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Digital Home
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Find stories, members, fan representatives, schedules,
            and moments across the 7ICONS & ICONIA digital home.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mx-auto mt-10 max-w-2xl">
          <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, members, regions, schedules..."
            autoFocus
            className="w-full rounded-2xl border border-violet-100 bg-white py-4 pl-14 pr-5 text-sm text-slate-900 shadow-xl shadow-violet-950/5 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        {/* Quick Suggestions */}
        {!hasQuery && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Journey",
              "Members",
              "Jakarta",
              "Performance",
              "ICONIA",
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-violet-50 hover:text-violet-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="mt-12">
          {hasQuery && (
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {results.length}
                </span>{" "}
                {results.length === 1 ? "result" : "results"}
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm font-semibold text-violet-700 transition hover:text-violet-900"
              >
                Clear Search
              </button>
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <div className="space-y-3">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="group block rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-600">
                        {result.category}
                      </span>

                      <h2 className="mt-3 text-lg font-semibold text-slate-950 transition group-hover:text-violet-700 sm:text-xl">
                        {result.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {result.description}
                      </p>
                    </div>

                    <span className="mt-2 shrink-0 text-lg text-violet-500 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty Result */}
          {hasQuery && results.length === 0 && (
            <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                🔎
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-950">
                No results found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                We couldn&apos;t find anything matching
                &quot;{query}&quot;. Try another name, region,
                category, or keyword.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Initial State */}
          {!hasQuery && (
            <div className="rounded-3xl border border-violet-100 bg-white/70 px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                ✦
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-950">
                What are you looking for?
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Search across articles, members, representatives,
                regions, and upcoming or previous schedules.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}