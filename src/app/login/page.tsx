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

export default function LoginPage() {
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
