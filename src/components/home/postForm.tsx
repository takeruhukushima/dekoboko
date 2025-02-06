import { post } from "@/app/actions/post";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostForm({ profile }: { profile: ProfileView }) {
  return (
    <Card className="border-2">
      <form action={post}>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>avatar</AvatarFallback>
            </Avatar>
            <div className="font-semibold">新規投稿</div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            name="text"
            placeholder="いまどうしてる？"
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">投稿する</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
