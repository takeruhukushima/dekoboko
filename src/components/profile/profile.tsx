import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileCard({ profile }: { profile: ProfileView }) {
  return (
    <div
      className="container mx-auto px-4 py-12 max-w-4xl"
      style={{ backgroundColor: "white" }}
    >
      <div className="text-center mb-12">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={profile.avatar} alt={profile.displayName} />
          <AvatarFallback>{profile.displayName}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl mb-2">{profile.displayName}</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden bg-white">
          <CardHeader className="bg-white">
            <CardTitle>自己紹介</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-black">
            <p>{profile.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
