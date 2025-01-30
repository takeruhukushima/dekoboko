"use server";

import { AppVercelDekobokoEvent, AppVercelDekobokoPost } from "@/generated/api";
import { getSessionAgent } from "@/lib/auth/session.server";
import { Agent } from "@atproto/api";
import { redirect } from "next/navigation";
import { TID } from "@atproto/common";

export async function post(formData: FormData) {
  const content = formData.get("text") as string;
  const agent: Agent | null = await getSessionAgent();

  if (!agent) {
    redirect("/login");
  }

  if (!content) {
    throw new Error("テキストが入力されていません。");
  }

  const record: AppVercelDekobokoPost.Record = {
    text: content,
    createdAt: new Date().toString(),
    authorDid: agent.assertDid,
  };

  const rkey = TID.nextStr();

  await agent.com.atproto.repo.putRecord({
    collection: "app.vercel.dekoboko.post",
    repo: agent.assertDid,
    rkey: rkey,
    record: record,
  });
}
export async function postEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const achievement = formData.get("achievement") as string;

  const agent: Agent | null = await getSessionAgent();

  if (!agent) {
    redirect("/login");
  }

  if (!title || !description || !achievement) {
    throw new Error("必要な情報が入力されていません");
  }

  const record: AppVercelDekobokoEvent.Record = {
    title,
    description,
    achievement,
    createdAt: new Date().toString(),
    authorDid: agent.assertDid,
  };

  const rkey = TID.nextStr();

  if (
    AppVercelDekobokoEvent.isRecord(record) &&
    AppVercelDekobokoEvent.validateRecord(record)
  ) {
    await agent.com.atproto.repo.putRecord({
      collection: "app.vercel.dekoboko.event",
      repo: agent.assertDid,
      rkey: rkey,
      record: record,
    });
  }
}
