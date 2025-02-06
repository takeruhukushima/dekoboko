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

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return response;
  }

  const sessionCookie = request.cookies.get("sid");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/:path*"],
};
