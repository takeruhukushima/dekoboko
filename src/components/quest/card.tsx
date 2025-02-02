import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Quest } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function QuestCard({
  quest,
  author,
}: {
  quest: Quest;
  author: ProfileView;
}) {
  return (
    <Card key={quest.rkey} className="border-none shadow-lg">
      <CardHeader className="bg-gray-50 pb-4">
        <div>
          <div>
            <CardTitle className="text-2xl mb-2">{quest.title}</CardTitle>

            <div>
              <a
                href={`/profile/${author.did}`}
                className="flex items-center my-2"
              >
                <Avatar>
                  <AvatarImage src={author.avatar} />
                  <AvatarFallback>{author.displayName}</AvatarFallback>
                </Avatar>

                <p className="text-sm text-gray-500 mx-2">
                  主催: {author.displayName}
                </p>
              </a>
            </div>
            <div className="text-sm text-gray-500">
              {quest.createdAt.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-gray-700 mb-4">概要: {quest.description}</p>
        <p className="text-gray-700 mb-4">報酬: {quest.achievement}</p>
      </CardContent>
    </Card>
  );
}
