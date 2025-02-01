import "./globals.css"
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google"
import { Navigation } from "../components/navigation"
import type React from "react"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
})

const zenKakuGothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-zen-kaku-gothic",
})

export const metadata = {
  title: "dekoboko",
  description: "不特定多数のユーザーがクエストを投稿し、他のユーザーが参加できるSNS型アプリ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${zenKakuGothic.variable}`}>
      <body className="bg-white text-black font-noto">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
