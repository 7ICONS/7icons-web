import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import CommunityCTA from "@/components/fan-representatives/CommunityCTA";
import FanRepresentativesHero from "@/components/fan-representatives/FanRepresentativesHero";
import OurRole from "@/components/fan-representatives/OurRole";
import RepresentativesGrid from "@/components/fan-representatives/RepresentativesGrid";

import { getPublishedFanRepresentatives } from "@/lib/fan-representatives";

export const dynamic = "force-dynamic";

export default async function FanRepresentativesPage() {
  const representatives =
    await getPublishedFanRepresentatives();

  return (
    <>
      <Navbar />

      <main>
        <FanRepresentativesHero />

        <RepresentativesGrid
          representatives={
            representatives
          }
        />

        <OurRole />

        <CommunityCTA />
      </main>

      <Footer />
    </>
  );
}