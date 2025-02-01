"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Plus } from "lucide-react"
import { QuestForm } from "@/components/QuestForm"

interface Quest {
  id: string
  title: string
  organizer: string
  date: string
  location: string
  participants: number
  maxParticipants: number
  type: "convex" | "concave"
  tags: string[]
  description: string
}

const questsData: Quest[] = [
  {
    id: "1",
    title: "地域清掃ボランティア",
    organizer: "エコフレンズ",
    date: "2024-02-15",
    location: "中央公園",
    participants: 15,
    maxParticipants: 30,
    type: "convex",
    tags: ["環境", "コミュニティ"],
    description: "地域の美化に貢献しましょう。ゴミ袋と手袋は用意します。",
  },
  {
    id: "2",
    title: "プログラミング勉強会",
    organizer: "テックラーニング",
    date: "2024-02-20",
    location: "オンライン",
    participants: 25,
    maxParticipants: 50,
    type: "concave",
    tags: ["教育", "テクノロジー"],
    description: "初心者向けのJavaScript講座です。基礎から学びましょう。",
  },
  {
    id: "3",
    title: "地域マルシェ",
    organizer: "まちづくり協会",
    date: "2024-03-01",
    location: "駅前広場",
    participants: 40,
    maxParticipants: 100,
    type: "convex",
    tags: ["イベント", "地域活性化"],
    description: "地元の農産物や手作り品を販売するマルシェを開催します。",
  },
]

export default function QuestPage() {
  const [quests, setQuests] = useState<Quest[]>(questsData)
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-zen font-bold">クエスト一覧</h1>
        <Button variant="outline" size="icon" onClick={() => setIsFormOpen(!isFormOpen)} className="rounded-full">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      {isFormOpen && (
        <div className="mb-12">
          <QuestForm />
        </div>
      )}
      <div className="space-y-8">
        {quests.map((quest) => (
          <Card key={quest.id} className="overflow-hidden border-none shadow-lg">
            <CardHeader className="bg-gray-50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-zen mb-2">{quest.title}</CardTitle>
                  <p className="text-sm text-gray-500">主催: {quest.organizer}</p>
                </div>
                <Badge variant="outline" className="text-sm font-zen">
                  {quest.type === "convex" ? "凸" : "凹"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">{quest.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{quest.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{quest.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {quest.participants} / {quest.maxParticipants}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {quest.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-zen">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-end">
              <Button variant="outline" size="sm" className="font-zen">
                参加する
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

