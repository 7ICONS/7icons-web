import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MembersGrid from "@/components/members/MembersGrid";
import MembersHero from "@/components/members/MembersHero";
import { getPublishedMembers } from "@/lib/members";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const members = await getPublishedMembers();

  return (
    <>
      <Navbar />

      <main>
        <MembersHero />
        <MembersGrid members={members} />
      </main>

      <Footer />
    </>
  );
}