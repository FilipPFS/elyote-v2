import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function getToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  return token || null;
}

const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);

export default async function middleware(req: NextRequest) {
  const publicPaths = ["/sign-in", "/sign-up"];
  const pathname = req.nextUrl.pathname;

  const isPublicPath = publicPaths.some(
    (path) => pathname.startsWith(path) || pathname === path
  );

  const token = await getToken(req);

  if (isPublicPath) {
    if (token) {
      try {
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
          throw new Error("SECRET_KEY is not defined");
        }

        await jwtVerify(token, SECRET);

        const homePageUrl = new URL("/", req.url);
        return NextResponse.redirect(homePageUrl);
      } catch (error: any) {
        console.error("Token verification failed:", error.message);
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined");
    }

    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
