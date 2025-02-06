"use server";

import { AppVercelDekobokoPost } from "@/generated/api";
import { getSessionAgent } from "@/lib/auth/session";
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
  };

  //バリデーション
  if (
    !AppVercelDekobokoPost.isRecord(record) &&
    !AppVercelDekobokoPost.validateRecord(record)
  ) {
    return;
  }

  const rkey = TID.nextStr();

  await agent.com.atproto.repo.putRecord({
    collection: "app.vercel.dekoboko.post",
    repo: agent.assertDid,
    rkey: rkey,
    record: record,
  });

  redirect("/");
}
