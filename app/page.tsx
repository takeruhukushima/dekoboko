import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, ThumbsUp } from "lucide-react"

const posts = [
  {
    id: 1,
    type: "convex",
    title: "新しい技術について",
    content: "最近学んだ技術についての投稿です...",
    author: "User1",
    tags: ["技術", "学習"],
    likes: 15,
    comments: 5
  },
  {
    id: 2,
    type: "concave",
    title: "困っていること",
    content: "この問題について誰か助けてください...",
    author: "User2",
    tags: ["質問", "助けて"],
    likes: 8,
    comments: 12
  }
]

export default function Home() {
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