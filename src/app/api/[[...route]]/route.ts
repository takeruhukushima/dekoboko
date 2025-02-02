import { createClient } from "../../../lib/auth/client";
import { Hono } from "hono";
import { getIronSession } from "iron-session";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const client = await createClient();
export type Session = { did: string };

app.get("/oauth/callback", async (c) => {
  const params = new URLSearchParams(c.req.url.split("?")[1]);
  try {
    const { session } = await client.callback(params);
    const clientSession = await getIronSession<Session>(c.req.raw, c.res, {
      cookieName: "sid",
      password: process.env.COOKIE_SECRET!,
    });
    clientSession.did = session.did;
    await clientSession.save();
  } catch (err) {
    console.error({ err }, "oauth callback failed");
    return c.json({ error: "ログインに失敗しました。" });
  }

  return c.redirect("/");
});

export const GET = handle(app);
