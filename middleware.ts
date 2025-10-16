import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined");
}

const SECRET = new TextEncoder().encode(SECRET_KEY);

const publicPaths = ["/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPublicPath = publicPaths.some(
    (path) => pathname.startsWith(path) || pathname === path
  );

  const token = req.cookies.get("token")?.value;
  const storeCode = req.cookies.get("store-code")?.value;

  // 🧱 1️⃣ Public pages
  if (isPublicPath) {
    if (token) {
      try {
        await jwtVerify(token, SECRET);
        return NextResponse.redirect(new URL("/", req.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 🧱 2️⃣ Require token
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const customers = payload.customers as number[] | undefined;

    // If payload doesn’t contain customers → force re-login
    if (!customers || customers.length === 0) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const isOnStoresPage = pathname.startsWith("/stores");

    // 🧱 3️⃣ If no store cookie → redirect to /stores (except when already there)
    if (!storeCode && !isOnStoresPage) {
      return NextResponse.redirect(new URL("/stores", req.url));
    }

    // 🧱 4️⃣ If store cookie exists but is invalid → redirect to /stores
    if (storeCode) {
      const storeCodeNumber = Number(storeCode);
      const isValidStore = customers.includes(storeCodeNumber);

      if (!isValidStore && !isOnStoresPage) {
        console.warn(`⚠️ Invalid store code detected: ${storeCode}`);
        return NextResponse.redirect(new URL("/stores", req.url));
      }
    }

    // ✅ 5️⃣ Everything valid → allow request
    return NextResponse.next();
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
