import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import RepresentativeDetail from "@/components/fan-representatives/RepresentativeDetail";
import { fanRepresentatives } from "@/data/fanRepresentatives";

type RepresentativePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return fanRepresentatives
    .filter((representative) => representative.profile)
    .map((representative) => ({
      slug: representative.slug,
    }));
}

export async function generateMetadata({
  params,
}: RepresentativePageProps): Promise<Metadata> {
  const { slug } = await params;

  const representative = fanRepresentatives.find(
    (item) => item.slug === slug && item.profile,
  );

  if (!representative) {
    return {
      title: "Representative Not Found | 7ICONS",
    };
  }

  return {
    title: `${representative.name} | ICONIA Fan Representative`,
    description: representative.shortBio,
  };
}

export default async function RepresentativePage({
  params,
}: RepresentativePageProps) {
  const { slug } = await params;

  const representative = fanRepresentatives.find(
    (item) => item.slug === slug && item.profile,
  );

  if (!representative) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        <RepresentativeDetail representative={representative} />
      </main>

      <Footer />
    </>
  );
}