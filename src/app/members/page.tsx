import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MembersGrid from "@/components/members/MembersGrid";
import MembersHero from "@/components/members/MembersHero";

export default function MembersPage() {
  return (
    <>
      <Navbar />

      <main>
        <MembersHero />
        <MembersGrid />
      </main>

      <Footer />
    </>
  );
}