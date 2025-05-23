import { SessionOptions } from "iron-session";

export interface SessionData {
  did?: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  cookieName: "session",
  password: process.env.COOKIE_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
