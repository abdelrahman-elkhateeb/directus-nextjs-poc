import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const publicRoutes = new Set(["/login", "/signup"])

export function proxy(request: NextRequest) {
  if (publicRoutes.has(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get("access_token")?.value

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
