"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [user] = useState({
    name: "山田太郎",
    email: "taro@example.com",
    avatar: "/placeholder-avatar.jpg",
    bio: "テクノロジーと社会貢献に興味があります。新しいチャレンジを常に求めています！",
    level: 15,
    xp: 2500,
    completedProjects: 12,
    totalPoints: 3750,
    nftTitles: ["OSS貢献者", "地域イノベーター", "AIチャレンジャー"],
    skills: ["JavaScript", "React", "Node.js", "コミュニティマネジメント", "プロジェクト企画"],
  })

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-serif mb-2">{user.name}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <div className="flex justify-center space-x-2">
          <Badge variant="outline" className="font-serif">
            Lv. {user.level}
          </Badge>
          <Badge variant="outline" className="font-serif">
            XP: {user.xp}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="font-serif">自己紹介</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="font-serif">{user.bio}</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="font-serif">スキル</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="font-serif">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="font-serif">統計</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-serif text-lg mb-1">完了プロジェクト</h3>
                <p className="text-3xl font-bold">{user.completedProjects}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">総獲得ポイント</h3>
                <p className="text-3xl font-bold">{user.totalPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="font-serif">NFT称号</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {user.nftTitles.map((title, index) => (
                <Badge key={index} variant="outline" className="font-serif">
                  {title}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" className="font-serif">
          プロフィールを編集
        </Button>
      </div>
    </div>
  )
}

