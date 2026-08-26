import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleDetail from "@/components/blog/ArticleDetail";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { blogArticles } from "@/data/blogArticles";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles
    .filter((article) => article.content)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = blogArticles.find(
    (item) => item.slug === slug && item.content,
  );

  if (!article) {
    return {
      title: "Article Not Found | 7ICONS",
    };
  }

  return {
    title: `${article.title} | 7ICONS`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = blogArticles.find(
    (item) => item.slug === slug && item.content,
  );

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        <ArticleDetail article={article} />
      </main>

      <Footer />
    </>
  );
}