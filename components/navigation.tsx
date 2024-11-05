"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, MessageSquare, User } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            dekoboko
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className={pathname === '/' ? 'text-primary' : ''} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/messages">
                <MessageSquare className={pathname === '/messages' ? 'text-primary' : ''} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className={pathname === '/profile' ? 'text-primary' : ''} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}