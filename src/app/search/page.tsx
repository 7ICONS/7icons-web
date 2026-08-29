import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import GlobalSearch from "@/components/search/GlobalSearch";

export default function SearchPage() {
  return (
    <>
      <Navbar />

      <main>
        <GlobalSearch />
      </main>

      <Footer />
    </>
  );
}