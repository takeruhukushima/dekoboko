import { createClient } from "../../../lib/auth/client";
import { Hono } from "hono";
import { getIronSession } from "iron-session";
import { handle } from "hono/vercel";
import { sessionOptions, SessionData } from "@/lib/session";

const app = new Hono().basePath("/api");

const client = await createClient();

declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}

app.get("/oauth/callback", async (c) => {
  const params = new URLSearchParams(c.req.url.split("?")[1]);
  try {
    const { session: authSession } = await client.callback(params);
    
    // Get the existing session
    const clientSession = await getIronSession<SessionData>(c.req.raw, c.res, sessionOptions);
    
    // Update session data
    clientSession.did = authSession.did;
    clientSession.isLoggedIn = true;
    
    // Save the session
    await clientSession.save();
  } catch (err) {
    console.error({ err }, "oauth callback failed");
    return c.redirect("/login?error=auth_failed");
  }

  return c.redirect("/");
});

export const GET = handle(app);
