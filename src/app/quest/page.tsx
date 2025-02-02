"use server";
import { QuestForm } from "@/components/quest/form";
import { Agent } from "@atproto/api";
import { getSessionAgent } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import QuestCard from "@/components/quest/card";

export default async function Quest() {
  const agent: Agent | null = await getSessionAgent();

  if (agent) {
    const quests = await prisma.quest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-zen font-bold">クエスト一覧</h1>
        </div>

        <QuestForm />

        <div className="space-y-8">
          {quests.map(async (quest) => {
            const author = await agent.getProfile({
              actor: quest.did,
            });

            return (
              <QuestCard quest={quest} author={author.data} key={quest.rkey} />
            );
          })}
        </div>
      </div>
    );
  }
}
