"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState<"convex" | "concave">("convex")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, content, type, tags: tags.split(",").map((tag) => tag.trim()) })
    setTitle("")
    setContent("")
    setType("convex")
    setTags("")
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <CardTitle className="font-serif">新規投稿</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-serif">
              タイトル
            </Label>
            <Input
              id="title"
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="font-serif"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="font-serif">
              内容
            </Label>
            <Textarea
              id="content"
              placeholder="内容を入力"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="font-serif min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-serif">投稿タイプ</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as "convex" | "concave")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="convex" id="convex" />
                <Label htmlFor="convex" className="font-serif">
                  凸
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="concave" id="concave" />
                <Label htmlFor="concave" className="font-serif">
                  凹
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="font-serif">
              タグ
            </Label>
            <Input
              id="tags"
              placeholder="タグをカンマ区切りで入力"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="font-serif"
            />
          </div>
          <Button type="submit" className="w-full font-serif">
            投稿
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

