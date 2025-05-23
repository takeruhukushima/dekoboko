"use client";

import { Button } from "@/components/ui/button";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { post } from "@/app/actions/post";
import { useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function PostForm({ profile }: { profile: ProfileView }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      startTransition(async () => {
        await post(formData);
        setOpen(false);
        toast({
          title: "投稿完了",
          description: "投稿が正常に保存されました",
        });
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "投稿に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          variant="default"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">新規投稿を作成</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規投稿</DialogTitle>
          <DialogDescription>
            あなたの気持ちを凸凹で表現しましょう
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Label>投稿タイプ</Label>
            <RadioGroup
              name="type"
              className="flex space-x-4"
              defaultValue="totu"
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="totu" id="totu" />
                <Label htmlFor="totu">凸</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boko" id="boko" />
                <Label htmlFor="boko">凹</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>テキスト</Label>
            <Textarea
              name="text"
              placeholder="いまどんな気持ち？"
              required
              rows={4}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "投稿中..." : "投稿する"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
