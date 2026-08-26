"use client";

import { useState } from "react";

import ArticleGrid from "@/components/blog/ArticleGrid";
import BlogHero from "@/components/blog/BlogHero";

export default function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <BlogHero
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setActiveCategory}
      />

      <ArticleGrid
        searchQuery={searchQuery}
        activeCategory={activeCategory}
      />
    </>
  );
}