import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Post } from "@prisma/client";

export default function PostCard({
  post,
  author,
}: {
  post: Post & { type: "totu" | "boko" };
  author: ProfileView;
}) {
  return (
    <Card key={post.rkey} className={`border-l-4 ${post.type === 'totu' ? 'border-l-blue-500' : 'border-l-red-500'}`}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <a
            className="flex items-center space-x-2"
            href={`/profile/${author.did}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{author.displayName || '匿名ユーザー'}</div>
            </div>
          </a>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleTimeString()}
            </span>
            <Badge 
              variant={post.type === "totu" ? "default" : "destructive"}
              className="rounded-full px-2 py-0.5 text-xs"
            >
              {post.type === "totu" ? "凸" : "凹"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <p className="text-gray-800">{post.text}</p>
      </CardContent>
    </Card>
  );
}
