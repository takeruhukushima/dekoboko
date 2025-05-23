import { getSessionAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";
import { prisma } from "@/lib/db/prisma";
import PostForm from "@/components/home/postForm";
import Timeline from "@/components/timeline/timeline";
import { redirect } from "next/navigation";

export default async function Home() {
  const agent: Agent | null = await getSessionAgent();

  if (!agent) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  }).then(posts => posts.map(post => {
    const record = JSON.parse(post.record);
    return {
      ...post,
      type: record.type as "totu" | "boko"
    };
  }));

  const profile = await agent.getProfile({ actor: agent.assertDid });

  return (
    <div className="relative min-h-screen">
      <div className="w-full max-w-2xl mx-auto p-4 pb-24">
        <Timeline initialPosts={posts} profile={profile.data} />
      </div>
      <div className="fixed bottom-20 right-6">
        <PostForm profile={profile.data} />
      </div>
    </div>
  );
}
