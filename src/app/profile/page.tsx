"use server";

import ProfileCard from "@/components/profile/profile";
import { getSessionAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";

export default async function ProfilePage() {
  const agent: Agent | null = await getSessionAgent();

  if (agent) {
    const res = await agent.getProfile({ actor: agent.assertDid });

    const profile = res.data;

    return <ProfileCard profile={profile} />;
  }
}
