import { NextRequest, NextResponse } from "next/server";
import { auth } from "@merchant/auth/auth";
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>("/auth/get-session", {
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });
  if (!session) {
    return NextResponse.redirect(new URL("http://localhost:5173/auth/login"));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
