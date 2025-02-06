"use server";
import { getSessionAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/db/prisma";
import PostForm from "@/components/home/postForm";
import PostCard from "@/components/timeline/post";

export default async function Home() {
  const agent: Agent | null = await getSessionAgent();

  if (agent) {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    const profile = await agent.getProfile({ actor: agent.assertDid });

    return (
      <div>
        <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
          <PostForm profile={profile.data} />

          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {posts.map(async (post) => {
                const author = await agent.getProfile({
                  actor: post.did,
                });

                return (
                  <PostCard post={post} author={author.data} key={post.rkey} />
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }
}
