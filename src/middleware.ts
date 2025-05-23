"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/xrpc",
  "/api/auth",
  "/api/oauth/callback",
  "/_next",
  "/favicon.ico",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公開ルートの場合はそのまま通す
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // セッションクッキーの確認
  const sessionCookie = request.cookies.get("session");
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // セッションが存在する場合は次へ
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
