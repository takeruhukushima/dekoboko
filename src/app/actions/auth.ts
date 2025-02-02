"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/client";
import { Session } from "../api/[[...route]]/route";

const client = await createClient();

const sessionOptions = {
  cookieName: "sid",
  password: process.env.COOKIE_SECRET!,
};

export async function authorize(formData: FormData) {
  const handle = formData.get("handle") as string;

  if (!handle) {
    throw new Error("ハンドルが指定されていません。");
  }

  const url = await client.authorize(handle, {
    scope: "atproto transition:generic",
  });
  redirect(url.toString());
}

export async function logout() {
  const session = await getIronSession<Session>(
    await cookies(),
    sessionOptions
  );

  await session.destroy();
  redirect("/");
}
