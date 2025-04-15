import { NextRequest, NextResponse } from "next/server";

async function getToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  return token || null;
}

export default async function middleware(req: NextRequest) {
  const publicPaths = ["/sign-in", "/sign-up"];
  const pathname = req.nextUrl.pathname;

  const isPublicPath = publicPaths.some(
    (path) => pathname.startsWith(path) || pathname === path
  );

  if (!isPublicPath) {
    const token = await getToken(req);
    if (!token) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
