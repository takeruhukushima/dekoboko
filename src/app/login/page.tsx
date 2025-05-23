import { authorize } from "../actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";

declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}

// Workaround for Next.js 13+ cookies()
const getServerSession = async () => {
  const cookieStore = cookies();
  return getIronSession<SessionData>(cookieStore as any, sessionOptions);
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  // セッションをチェック
  const session = await getServerSession();

  if (session.isLoggedIn && session.did) {
    redirect("/");
  }

  // searchParamsを非同期で処理
  const params = await searchParams;
  const error = params.error as string | undefined;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>dekobokoにログイン</CardTitle>
          <CardDescription>
            ハンドルを入力してログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error === "auth_failed" && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
              ログインに失敗しました。もう一度お試しください。
            </div>
          )}
          <form action={authorize}>
            <div className="space-y-4">
              <Input
                type="text"
                name="handle"
                placeholder="ハンドルを入力"
                required
              />
              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
