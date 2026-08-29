import AboutHero from "@/components/about/AboutHero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import OurStory from "@/components/about/OurStory";
import WebsitePurpose from "@/components/about/WebsitePurpose";
import SevenIconsAndIconia from "@/components/about/SevenIconsAndIconia";
import OurValues from "@/components/about/OurValues";
import WebsiteJourney from "@/components/about/WebsiteJourney";
import AboutClosing from "@/components/about/AboutClosing";

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