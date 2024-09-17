import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "lib/auth/verifyToken";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isAuthenticated = await verifyToken(token);

  const url = request.nextUrl.clone();

  if (!isAuthenticated && url.pathname.startsWith("/my-routine")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-routine/:path*"],
};
