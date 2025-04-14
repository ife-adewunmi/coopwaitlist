import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only run middleware on admin routes except login
  if (!request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authToken = request.cookies.get("auth_token")?.value

  if (!authToken) {
    // Redirect to login if no auth token
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // We can't use the verifyMagicLinkToken function directly in middleware
  // because it's a server component function. Instead, we'll let the
  // page handle verification and just check for the presence of the token here.

  // Allow access to admin routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

