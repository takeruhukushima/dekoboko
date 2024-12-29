'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/hooks/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ThumbsUp, Eye, Search, Plus, User, Compass } from 'lucide-react'

// Types
type Post = {
  id: string
  type: 'dekoboko' | 'hekomu'
  content: string
  likes: number
  interests: number
  author: {
    name: string
    image: string
  }
}

type Project = {
  id: number
  title: string
  description: string
  participants: number
}

type UserProfile = {
  name: string
  level: number
  avatar_url: string
  titles: string[]
  skills: string[]
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [activeTab, setActiveTab] = useState('home')
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [loadingProjects, setLoadingProjects] = useState(false)

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoadingPosts(true)
    const { data, error } = await supabase.from('posts').select(`
      id, type, content, likes, comments AS interests,
      author: author_id ( name, avatar_url )
    `)

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      const formattedPosts = (data || []).map(post => ({
        ...post,
        author: {
          name: post.author?.name || 'Unknown User',
          image: post.author?.avatar_url || '/placeholder.svg'
        }
      }))
      setPosts(formattedPosts)
    }
    setLoadingPosts(false)
  }

  // Fetch projects from Supabase
  const fetchProjects = async () => {
    setLoadingProjects(true)
    const { data, error } = await supabase.from('projects').select('*')

    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      setProjects(data || [])
    }
    setLoadingProjects(false)
  }

  // Fetch user profile
  const fetchUserProfile = async () => {
    const { data: user, error } = await supabase.from('users').select(`
      name, level, avatar_url,
      titles: user_titles(title),
      skills: user_skills(skill_name)
    `).single()

    if (error) {
      console.error('Error fetching user profile:', error)
    } else {
      setUserProfile({
        name: user.name,
        level: user.level,
        avatar_url: user.avatar_url || '/placeholder.svg',
        titles: user.titles.map((t: any) => t.title),
        skills: user.skills.map((s: any) => s.skill_name),
      })
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchProjects()
    fetchUserProfile()
  }, [])

  // Home component
  const Home = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/placeholder.svg" alt="ユーザー" />
          <AvatarFallback>ユ</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">ようこそ、ユーザーさん</h2>
          <p className="text-muted-foreground">あなたの冒険を始めましょう</p>
        </div>
      </div>
      <Input placeholder="新しい投稿を作成..." className="mb-4" />
      {loadingPosts ? (
        <p>投稿を読み込んでいます...</p>
      ) : (
        <AnimatePresence>
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card text-card-foreground rounded-lg p-6 shadow-lg mb-4 transition-all hover:shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <span className="text-sm text-muted-foreground">{post.type === 'dekoboko' ? '凸' : '凹'}</span>
                </div>
              </div>
              <p className="mb-4">{post.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )

  // Profile component
  const Profile = () => (
    <div className="space-y-6">
      {userProfile ? (
        <>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userProfile.avatar_url} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-muted-foreground">冒険者レベル: {userProfile.level}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">称号</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.titles.map((title, idx) => (
                  <span key={idx} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                    {title}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">スキル</h3>
              <ul className="list-disc list-inside">
                {userProfile.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>プロフィールを読み込んでいます...</p>
      )}
    </div>
  )

  // Bouken component
  const Bouken = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">冒険プロジェクト</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新しいプロジェクト
        </Button>
      </div>
      {loadingProjects ? (
        <p>プロジェクトを読み込んでいます...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card text-card-foreground rounded-lg p-6 shadow-lg transition-all hover:shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">参加者: {project.participants}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home">
              <User className="mr-2 h-4 w-4" />
              ホーム
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="bouken">
              <Compass className="mr-2 h-4 w-4" />
              冒険
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <Home />
          </TabsContent>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="bouken">
            <Bouken />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
