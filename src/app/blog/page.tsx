import BlogContent from "@/components/blog/BlogContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getPublishedArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <Navbar />

      <main>
        <BlogContent articles={articles} />
      </main>

      <Footer />
    </>
  );
}