"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import PostCard from "@/components/timeline/post";
import TimelineFilter from "@/components/timeline/filter";
import { startOfDay, endOfDay, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { Post, PostType } from "@/types/post";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

// Helper to ensure consistent date parsing
const parseDate = (dateString: string | Date): Date => {
  return dateString instanceof Date ? dateString : parseISO(dateString);
};

interface TimelineProps {
  initialPosts: Post[];
  profile: ProfileView;
}

export default function Timeline({ initialPosts, profile }: TimelineProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterType, setFilterType] = useState<PostType | null>(null);
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  // Only run filters on the client side to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
    setPosts(initialPosts);
  }, [initialPosts]);

  const filterPosts = (postsToFilter: Post[], type: PostType | null, date: Date | undefined) => {
    if (!isMounted) return [];
    
    return postsToFilter.filter((post) => {
      if (type && post.type !== type) {
        return false;
      }
      
      if (date) {
        try {
          const postDate = parseDate(post.createdAt);
          const start = startOfDay(date);
          const end = endOfDay(date);
          return postDate >= start && postDate <= end;
        } catch (e) {
          console.error('Error parsing date:', e);
          return false;
        }
      }
      
      return true;
    });
  };

  const handleFilterChange = (type: PostType | null, date: Date | undefined) => {
    if (!isMounted) return;
    
    setFilterType(type);
    setFilterDate(date);
    setPosts(filterPosts(initialPosts, type, date));
  };

  // ポストを凸と凹で分割
  const totuPosts = posts.filter(post => post.type === 'totu');
  const bokoPosts = posts.filter(post => post.type === 'boko');

  return (
    <div className="space-y-4">
      <TimelineFilter onFilterChange={handleFilterChange} />
      
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 左側: 凹ポスト */}
          <div className="space-y-4">
            {bokoPosts.map((post) => (
              <PostCard 
                key={post.rkey}
                post={post}
                author={profile}
              />
            ))}
          </div>
          
          {/* 右側: 凸ポスト */}
          <div className="space-y-4">
            {totuPosts.map((post) => (
              <PostCard 
                key={post.rkey}
                post={post}
                author={profile}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
