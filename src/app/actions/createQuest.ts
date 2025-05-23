"use server";

import { AppVercelDekobokoQuest } from "@/generated/api";
import { getSessionAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";
import { redirect } from "next/navigation";
import { TID } from "@atproto/common";

export async function createQuest(formData: FormData) {
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

  const record: AppVercelDekobokoQuest.Record = {
    title,
    description,
    achievement,
    createdAt: new Date().toString(),
  };

  //バリデーション
  if (
    !AppVercelDekobokoQuest.isRecord(record) &&
    !AppVercelDekobokoQuest.validateRecord(record)
  ) {
    return;
  }

  const rkey = TID.nextStr();

  await agent.com.atproto.repo.putRecord({
    collection: "app.vercel.dekoboko.quest",
    repo: agent.assertDid,
    rkey: rkey,
    record: record,
  });

  redirect("/quest");
}
