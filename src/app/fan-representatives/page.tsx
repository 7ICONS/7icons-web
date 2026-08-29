import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FanRepresentativesHero from "@/components/fan-representatives/FanRepresentativesHero";
import RepresentativesGrid from "@/components/fan-representatives/RepresentativesGrid";
import OurRole from "@/components/fan-representatives/OurRole";
import CommunityCTA from "@/components/fan-representatives/CommunityCTA";

export default function FanRepresentativesPage() {
  return (
    <>
      <Navbar />

      <main>
        <FanRepresentativesHero />
        <RepresentativesGrid />
        <OurRole />
        <CommunityCTA />
      </main>

      <Footer />
    </>
  );
}