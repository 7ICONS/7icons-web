"use client";

import { useState } from "react";

import ArticleGrid from "@/components/blog/ArticleGrid";
import BlogHero from "@/components/blog/BlogHero";
import type { Article } from "@/lib/articles";

type BlogContentProps = {
  articles: Article[];
};

export default function BlogContent({
  articles,
}: BlogContentProps) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  return (
    <>
      <BlogHero
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setActiveCategory}
      />

      <ArticleGrid
        articles={articles}
        searchQuery={searchQuery}
        activeCategory={activeCategory}
      />
    </>
  );
}