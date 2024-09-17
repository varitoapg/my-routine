import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "lib/auth/verifyToken";

const protectedPaths = ["/my-routine"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isAuthenticated = await verifyToken(token);

  const url = request.nextUrl.clone();

  const shouldProtect = protectedPaths.some((path) =>
    url.pathname.startsWith(path),
  );

  if (!isAuthenticated && shouldProtect) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
