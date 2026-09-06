import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MemberDetail from "@/components/members/MemberDetail";
import { getPublishedMemberBySlug } from "@/lib/members";

type MemberPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;

  const member =
    await getPublishedMemberBySlug(slug);

  if (!member) {
    return {
      title: "Member Not Found | 7ICONS",
    };
  }

  return {
    title: `${member.name} | 7ICONS`,
    description:
      member.short_bio ||
      member.profile_description,

    openGraph: {
      title: member.name,
      description:
        member.short_bio ||
        member.profile_description,

      images: member.image_url
        ? [
            {
              url: member.image_url,
              alt: member.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function MemberPage({
  params,
}: MemberPageProps) {
  const { slug } = await params;

  const member =
    await getPublishedMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        <MemberDetail member={member} />
      </main>

      <Footer />
    </>
  );
}