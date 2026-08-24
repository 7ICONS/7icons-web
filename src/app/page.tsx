import FeaturedArticles from "@/components/home/FeaturedArticles";
import Hero from "@/components/home/Hero";
import MeetMembers from "@/components/home/MeetMembers";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedArticles />
        <MeetMembers />
      </main>
    </>
  );
}