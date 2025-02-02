import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Post } from "@prisma/client";

export default function PostCard({
  post,
  author,
}: {
  post: Post;
  author: ProfileView;
}) {
  return (
    <Card key={post.rkey} className="border">
      <CardHeader>
        <a
          className="flex items-center space-x-4"
          href={`/profile/${author.did}`}
        >
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.displayName}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{author.displayName}</div>
            <div className="text-sm text-gray-500">
              {post.createdAt.toLocaleString()}
            </div>
          </div>
        </a>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{post.text}</p>
      </CardContent>
    </Card>
  );
}
