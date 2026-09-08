import type { Metadata } from "next";

import { notFound } from "next/navigation";

import RepresentativeDetail from "@/components/fan-representatives/RepresentativeDetail";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { getPublishedFanRepresentativeBySlug } from "@/lib/fan-representatives";

export const dynamic = "force-dynamic";

type RepresentativePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: RepresentativePageProps): Promise<Metadata> {
  const { slug } = await params;

  const representative =
    await getPublishedFanRepresentativeBySlug(
      slug,
    );

  if (!representative) {
    return {
      title:
        "Representative Not Found | 7ICONS",
    };
  }

  return {
    title: `${representative.name} | ICONIA Fan Representative`,
    description:
      representative.shortBio,
  };
}

export default async function RepresentativePage({
  params,
}: RepresentativePageProps) {
  const { slug } = await params;

  const representative =
    await getPublishedFanRepresentativeBySlug(
      slug,
    );

  if (
    !representative ||
    !representative.profile
  ) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        <RepresentativeDetail
          representative={
            representative
          }
        />
      </main>

      <Footer />
    </>
  );
}