"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createQuest } from "@/app/actions/createQuest";
import { useTransition } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function QuestForm() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      startTransition(async () => {
        await createQuest(formData);
        setOpen(false);
        toast({
          title: "クエスト作成完了",
          description: "クエストが正常に作成されました",
        });
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "クエストの作成に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg fixed bottom-6 right-6"
          variant="default"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">新規クエストを作成</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-zen">新規クエスト作成</DialogTitle>
          <DialogDescription className="font-noto">
            新しいクエストを作成して、みんなに挑戦してもらいましょう
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
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
            <Label htmlFor="achievement" className="font-zen">
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
          <Button type="submit" className="w-full font-zen" disabled={isPending}>
            {isPending ? "作成中..." : "クエストを作成"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
