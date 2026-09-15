import type { Metadata } from "next";

import AboutClosing from "@/components/about/AboutClosing";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import SevenIconsAndIconia from "@/components/about/SevenIconsAndIconia";
import WebsiteJourney from "@/components/about/WebsiteJourney";
import WebsitePurpose from "@/components/about/WebsitePurpose";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <AboutHero />
        <OurStory />
        <WebsitePurpose />
        <SevenIconsAndIconia />
        <OurValues />
        <WebsiteJourney />
        <AboutClosing />
      </main>

      <Footer />
    </>
  );
}