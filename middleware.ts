import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

async function getToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  return token || null;
}

export default async function middleware(req: NextRequest) {
  const publicPaths = ["/sign-in", "/sign-up"];
  const locales = ["en", "fr"];

  const pathname = req.nextUrl.pathname;
  const normalizedPath = locales.reduce(
    (path, locale) =>
      path.replace(`/${locale}/`, "/").replace(`/${locale}`, "/"),
    pathname
  );

  const isPublicPath = publicPaths.some(
    (path) => normalizedPath.startsWith(path) || normalizedPath === path
  );

  if (!isPublicPath) {
    const token = await getToken(req);
    if (!token) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  const intlMiddleware = createMiddleware(routing);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
