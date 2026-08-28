import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MemberDetail from "@/components/members/MemberDetail";
import { members } from "@/data/members";

type MemberPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return members
    .filter((member) => member.profile)
    .map((member) => ({
      slug: member.slug,
    }));
}

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;

  const member = members.find(
    (item) => item.slug === slug && item.profile,
  );

  if (!member) {
    return {
      title: "Member Not Found | 7ICONS",
    };
  }

  return {
    title: `${member.name} | 7ICONS`,
    description: member.shortBio,
  };
}

export default async function MemberPage({
  params,
}: MemberPageProps) {
  const { slug } = await params;

  const member = members.find(
    (item) => item.slug === slug && item.profile,
  );

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