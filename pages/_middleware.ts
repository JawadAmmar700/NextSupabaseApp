import type { NextFetchEvent, NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getUser } from "../utils/get-user"

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl
  const { user, error } = await getUser(req)

  if (!user && pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }
  if (!user && pathname !== "/login") {
    return NextResponse.redirect("/login")
  }
  if (user && pathname === "/login") {
    return NextResponse.redirect("/")
  }
}
