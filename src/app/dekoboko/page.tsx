"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react";
import { Agent } from "@atproto/api";
import { getSessionAgent } from "@/lib/auth/session.server";

interface Post {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  type: "convex" | "concave";
  tags: string[];
  title: string;
}

const postsData: Post[] = [
  {
    id: "1",
    title: "最初の投稿",
    author: "ユーザー1",
    timestamp: "2024-01-01T12:00:00Z",
    content: "これは最初の投稿です。凸凹アプリへようこそ！",
    likes: 10,
    comments: 3,
    type: "convex",
    tags: ["初心者向け", "挨拶"],
  },
  {
    id: "2",
    title: "二番目の投稿",
    author: "ユーザー2",
    timestamp: "2024-01-02T18:30:00Z",
    content: "二番目の投稿です。今日は天気が良いですね。",
    likes: 5,
    comments: 1,
    type: "concave",
    tags: ["日常", "天気"],
  },
  {
    id: "3",
    title: "三番目の投稿",
    author: "ユーザー3",
    timestamp: "2024-01-03T09:15:00Z",
    content: "三番目の投稿です。何か面白いことないかな。",
    likes: 12,
    comments: 5,
    type: "convex",
    tags: ["質問", "雑談"],
  },
];


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const agent: Agent | null = await getSessionAgent();

      if (agent) {
        // const response = await agent.com.atproto.repo.listRecords({
        //   collection: "app.vercel.dekoboko.post",
        //   repo: agent.assertDid,
        // }) as unknown as { records: Array<{ rkey: string; value: { authorDid: string; createdAt: string; text: string; likes?: number; comments?: number } }> };

        // if ('records' in response) {
        //   const formattedPosts = response.records.map((record) => ({
        //     id: record.rkey,
        //     author: record.value.authorDid,
        //     timestamp: record.value.createdAt,
        //     content: record.value.text,
        //     likes: record.value.likes || 0,
        //     comments: record.value.comments || 0,
        //   }));

        //   setPosts(formattedPosts);
        // } else {
        //   console.error("Unexpected response format", response);
        // }
        setPosts(postsData); //  API call を一旦mock dataに置き換え
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">タイムライン</h1>
        <Button>新規投稿</Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="convex">凸</TabsTrigger>
          <TabsTrigger value="concave">凹</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {posts.map(post => (
            <Card key={post.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-muted-foreground">by {post.author}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {post.type === "convex" ? "凸" : "凹"}
                </span>
              </div>

              <p className="mb-4">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="convex">
          {posts.filter(post => post.type === "convex").map(post => (
            <Card key={post.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-muted-foreground">by {post.author}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  凸
                </span>
              </div>

              <p className="mb-4">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="concave">
          {posts.filter(post => post.type === "concave").map(post => (
            <Card key={post.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-muted-foreground">by {post.author}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  凹
                </span>
              </div>

              <p className="mb-4">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
