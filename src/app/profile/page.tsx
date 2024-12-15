import React from "react";
import MemberInfoForm from "./profile-settings";
import { notFound } from "next/navigation";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";

export default async function Page() {
  const wixClient = await getWixServerClient();
  const member = await getLoggedInMember(wixClient);

  if (!member) notFound();
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <MemberInfoForm member={member} />
    </main>
  );
}
