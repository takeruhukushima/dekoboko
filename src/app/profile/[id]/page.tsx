"use server";

import ProfileCard from "@/components/profile/profile";
import { getSessionAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";
import { isDid } from "@atproto/oauth-client-node";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const agent: Agent | null = await getSessionAgent();

  const id = decodeURIComponent((await params).id);

  if (agent) {
    let actor;

    //paramsで与えられたidがdidであればそのまま、handleであればresolveしてから返す
    if (isDid(id)) {
      actor = id;
    } else {
      const res = await agent.resolveHandle({ handle: id });
      actor = res.data.did;
    }

    const res = await agent.getProfile({ actor: actor });

    const profile = res.data;

    return <ProfileCard profile={profile} />;
  }
}
