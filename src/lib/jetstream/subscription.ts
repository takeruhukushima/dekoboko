import {
  CommitCreateEvent,
  CommitUpdateEvent,
  Jetstream,
} from "@skyware/jetstream";
import { prisma } from "@/lib/db/prisma";
import WebSocket from "ws";
import {
  AppVercelDekobokoPost,
  AppVercelDekobokoQuest,
} from "@/generated/api/index";

export const jetstream = new Jetstream({
  ws: WebSocket,
  wantedCollections: ["app.vercel.dekoboko.post", "app.vercel.dekoboko.quest"],
});

jetstream.on("open", () => {
  console.log(`jetstream subscription started`);
});

jetstream.on("close", () => {
  console.log(`jetstream subscription closed`);
});

jetstream.on("error", (error) => {
  console.log(error);
});

async function updatePost(
  event:
    | CommitCreateEvent<"app.vercel.dekoboko.post">
    | CommitUpdateEvent<"app.vercel.dekoboko.post">
) {
  try {
    const record = event.commit.record;
    if (
      AppVercelDekobokoPost.isRecord(record) &&
      AppVercelDekobokoPost.validateRecord(record)
    ) {
      await prisma.post.upsert({
        where: {
          rkey: event.commit.rkey,
        },
        update: {
          text: record.text,
          record: JSON.stringify(record),
        },
        create: {
          rkey: event.commit.rkey,
          text: record.text,
          createdAt: new Date(),
          record: JSON.stringify(record),
          did: event.did,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateEvent(
  event:
    | CommitCreateEvent<"app.vercel.dekoboko.quest">
    | CommitUpdateEvent<"app.vercel.dekoboko.quest">
) {
  try {
    const record = event.commit.record;
    if (
      AppVercelDekobokoQuest.isRecord(record) &&
      AppVercelDekobokoQuest.validateRecord(record)
    ) {
      await prisma.quest.upsert({
        where: {
          rkey: event.commit.rkey,
        },
        update: {
          title: record.title,
          description: record.description,
          achievement: record.achievement,
          record: JSON.stringify(record),
        },
        create: {
          rkey: event.commit.rkey,
          title: record.title,
          description: record.description,
          achievement: record.achievement,
          createdAt: new Date(),
          record: JSON.stringify(record),
          did: event.did,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

jetstream.onCreate("app.vercel.dekoboko.post", async (event) => {
  console.log(`New Post: ${event.commit.rkey}`);
  await updatePost(event);
});

jetstream.onUpdate("app.vercel.dekoboko.post", async (event) => {
  console.log(`Updated Post: ${event.commit.rkey}`);
  await updatePost(event);
});

jetstream.onDelete("app.vercel.dekoboko.post", async (event) => {
  console.log(`Deleted Post: ${event.commit.rkey}`);
  try {
    await prisma.post.delete({
      where: { rkey: event.commit.rkey },
    });
  } catch (e) {
    console.log(e);
  }
});

jetstream.onCreate("app.vercel.dekoboko.quest", async (event) => {
  console.log(`New Quest: ${event.commit.rkey}`);
  await updateEvent(event);
});

jetstream.onUpdate("app.vercel.dekoboko.quest", async (event) => {
  console.log(`Updated Quest: ${event.commit.rkey}`);
  await updateEvent(event);
});

jetstream.onDelete("app.vercel.dekoboko.quest", async (event) => {
  console.log(`Deleted Quest: ${event.commit.rkey}`);
  try {
    await prisma.quest.delete({
      where: { rkey: event.commit.rkey },
    });
  } catch (e) {
    console.log(e);
  }
});
