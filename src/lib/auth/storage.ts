// From https://github.com/marukun712/stellar/blob/master/app/lib/auth/storage.ts

import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";

import { prisma } from "../db/prisma";

export class StateStore implements NodeSavedStateStore {
  async get(key: string): Promise<NodeSavedState | undefined> {
    const authState = await prisma.authState.findUnique({
      where: { key },
    });
    if (!authState) return;
    return JSON.parse(authState.state) as NodeSavedState;
  }

  async set(key: string, state: NodeSavedState) {
    const data = { key, state: JSON.stringify(state) };
    await prisma.authState.upsert({
      where: { key },
      create: data,
      update: data,
    });
  }

  async del(key: string) {
    await prisma.authState.delete({
      where: { key },
    });
  }
}

export class SessionStore implements NodeSavedSessionStore {
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const authSession = await prisma.authSession.findUnique({
      where: { key },
    });
    if (!authSession) return;
    return JSON.parse(authSession.session) as NodeSavedSession;
  }

  async set(key: string, session: NodeSavedSession) {
    const data = { key, session: JSON.stringify(session) };
    await prisma.authSession.upsert({
      where: { key },
      create: data,
      update: data,
    });
  }

  async del(key: string) {
    await prisma.authSession.delete({
      where: { key },
    });
  }
}