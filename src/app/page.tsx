import FeaturedArticles from "@/components/home/FeaturedArticles";
import Hero from "@/components/home/Hero";
import IconiaAcrossIndonesia from "@/components/home/IconiaAcrossIndonesia";
import MeetMembers from "@/components/home/MeetMembers";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedArticles />
        <MeetMembers />
        <IconiaAcrossIndonesia />
      </main>

      <Footer />
    </>
  );
}