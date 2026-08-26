import BlogContent from "@/components/blog/BlogContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main>
        <BlogContent />
      </main>

      <Footer />
    </>
  );
}