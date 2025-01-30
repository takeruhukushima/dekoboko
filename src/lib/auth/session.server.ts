"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { Agent } from "@atproto/api";
import { createClient } from "@/lib/auth/client";
import { Session } from "@/app/api/[[...route]]/route";

const sessionOptions = {
  cookieName: "sid",
  password: process.env.COOKIE_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSessionAgent() {
  const session = await getIronSession<Session>(
    await cookies(),
    sessionOptions
  );

  if (!session.did) return null;

  const client = await createClient();

  try {
    const oauthSession = await client.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    await session.destroy();
    return null;
  }
}
