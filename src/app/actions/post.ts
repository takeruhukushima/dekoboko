"use server";

import { AppVercelDekobokoPost } from "@/generated/api";
import { getSessionAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";
import { redirect } from "next/navigation";
import { TID } from "@atproto/common";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function post(formData: FormData) {
  try {
    const content = formData.get("text") as string;
    const type = formData.get("type") as "totu" | "boko";
    const agent: Agent | null = await getSessionAgent();

    if (!agent) {
      redirect("/login");
    }

    if (!content) {
      throw new Error("テキストが入力されていません。");
    }

    if (!type || !["totu", "boko"].includes(type)) {
      throw new Error("投稿タイプが正しく選択されていません。");
    }

    const record = {
      text: content,
      type: type,
      createdAt: new Date().toISOString(),
    };

    //バリデーション
    if (
      !AppVercelDekobokoPost.isRecord(record) &&
      !AppVercelDekobokoPost.validateRecord(record)
    ) {
      throw new Error("投稿の形式が正しくありません。");
    }

    const rkey = TID.nextStr();

    // ATProtoに投稿を保存
    await agent.com.atproto.repo.putRecord({
      collection: "app.vercel.dekoboko.post",
      repo: agent.assertDid,
      rkey: rkey,
      record: record,
    });

    // Prismaデータベースに投稿を保存
    await prisma.post.create({
      data: {
        rkey: rkey,
        text: content,
        type: type,
        createdAt: new Date(),
        did: agent.assertDid,
        record: JSON.stringify(record),
      },
    });

    // キャッシュを更新
    revalidatePath("/");
  } catch (error) {
    console.error("投稿エラー:", error);
    throw error;
  }
}
