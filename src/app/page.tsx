"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ThumbsUp, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { PostForm } from "@/components/PostForm"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface Post {
  id: string
  author: string
  timestamp: string
  content: string
  likes: number
  comments: number
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
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    let filteredPosts = postsData;
    if (filterType === "convex") {
      filteredPosts = postsData.filter((post) => post.type === "convex");
    } else if (filterType === "concave") {
      filteredPosts = postsData.filter((post) => post.type === "concave");
    } else {
      filteredPosts = postsData; // Show all posts when filterType is "all" or any other value
    }
    setPosts(filteredPosts);
  }, [filterType]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">dekoboko</h1>
              <p className="text-xl text-gray-600">気になる話題を投稿してみましょう</p>
            </div>
            <div className="flex justify-center"> {/* Center the ToggleGroup */}
              <ToggleGroup
                type="single"
                defaultValue="all"
                value={filterType}
                onValueChange={setFilterType}
              >
                <ToggleGroupItem value="all" aria-label="All">ALL</ToggleGroupItem>
                <ToggleGroupItem value="convex" aria-label="凸">凸</ToggleGroupItem>
                <ToggleGroupItem value="concave" aria-label="凹">凹</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="rounded-full ml-2"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          {isFormOpen && (
            <div className="mt-4">
              <PostForm />
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-sm text-gray-500">by {post.author}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm">
                    {post.type === "convex" ? "凸" : "凹"}
                  </span>
                </div>

                <CardContent>
                  <p className="mb-4 text-gray-700">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-black"
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-black"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {post.comments}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-gray-500">
        © 2023 dekoboko. All rights reserved.
      </footer>
    </div>
  );
}
