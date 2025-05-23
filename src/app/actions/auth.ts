"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/client";
import { sessionOptions, SessionData } from "@/lib/session";

declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}

const client = await createClient();

function validateAndFormatHandle(handle: string): string {
  console.log('Original handle:', JSON.stringify(handle));
  
  if (!handle) {
    throw new Error('ハンドルが指定されていません。');
  }
  
  // Remove any leading @, trim whitespace, and clean up the string
  let cleanHandle = handle
    .replace(/^[@\s]+/, '')  // Remove leading @ and whitespace
    .replace(/[\s@]+$/, '')  // Remove trailing @ and whitespace
    .trim()
    // Remove any non-printable characters and normalize
    .replace(/[\u200B-\u200D\uFEFF\u00A0\u1680\u180E\u2000-\u200F\u2028-\u202F\u205F\u3000\uFFEF]/g, '');
    
  console.log('Cleaned handle:', JSON.stringify(cleanHandle));
  
  // If empty after cleanup
  if (!cleanHandle) {
    throw new Error('有効なハンドルを入力してください。');
  }
  
  // Check if the handle is already in the correct format with domain
  const domainMatch = cleanHandle.match(/^([a-zA-Z0-9_-]+)(\.([a-zA-Z0-9.-]+))?$/);
  
  if (!domainMatch) {
    throw new Error('無効なハンドル形式です。例: username または username.bsky.social');
  }
  
  const username = domainMatch[1];
  const domain = domainMatch[3]; // The part after the first dot
  
  // Validate username format (only allow ASCII letters, numbers, hyphens, and underscores)
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    throw new Error('ハンドル名には半角英数字、ハイフン、アンダースコアのみ使用できます。');
  }
  
  // If there's a domain part
  if (domain) {
    // Validate domain parts
    const domainParts = domain.split('.').filter(Boolean);
    
    // Check each part of the domain
    for (const part of domainParts) {
      if (!/^[a-zA-Z0-9-]+$/.test(part)) {
        throw new Error('ドメイン名に使用できない文字が含まれています。半角英数字、ハイフンのみ使用できます。');
      }
      
      // Check if part starts or ends with hyphen
      if (part.startsWith('-') || part.endsWith('-')) {
        throw new Error('ドメインの各セクションはハイフンで始まったり終わったりすることはできません。');
      }
      
      // Check part length
      if (part.length > 63) {
        throw new Error('ドメインの各セクションは63文字以下である必要があります。');
      }
    }
    
    // Check total length
    if (domain.length > 253) {
      throw new Error('ドメイン名全体は253文字以下である必要があります。');
    }
    
    return `${username}.${domain}`;
  }
  
  // If no domain, use default bsky.social
  return `${username}.bsky.social`;
}

export async function authorize(formData: FormData) {
  const handle = formData.get("handle") as string;

  if (!handle) {
    throw new Error("ハンドルが指定されていません。");
  }

  try {
    const formattedHandle = validateAndFormatHandle(handle);
    const url = await client.authorize(formattedHandle, {
      scope: "atproto transition:generic",
    });
    redirect(url.toString());
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

// Workaround for Next.js 13+ cookies()
const getServerSession = async () => {
  const cookieStore = cookies();
  return getIronSession<SessionData>(cookieStore as any, sessionOptions);
};

export async function logout() {
  const session = await getServerSession();
  await session.destroy();
  redirect("/login");
}
