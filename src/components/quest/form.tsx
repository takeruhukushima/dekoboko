"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createQuest } from "@/app/actions/createQuest";

export function QuestForm() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <CardTitle className="font-zen text-2xl">新規クエスト作成</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 bg-white text-black">
        <form action={createQuest} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-zen">
              クエスト名
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="クエスト名を入力"
              required
              className="font-noto"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="font-zen">
              説明
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="クエストの説明を入力"
              required
              className="font-noto min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="font-zen">
              報酬
            </Label>
            <Textarea
              id="achievement"
              name="achievement"
              placeholder="報酬を入力"
              required
              className="font-noto min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full font-zen">
            クエストを作成
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
