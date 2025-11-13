import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error("SECRET_KEY is not defined");
const SECRET = new TextEncoder().encode(SECRET_KEY);

const publicPaths = ["/sign-in", "/sign-up", "/forgot-password"];

const roleHierarchy = ["user", "manager", "director", "superadmin"] as const;
type Role = (typeof roleHierarchy)[number];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;
  const storeCode = req.cookies.get("store-code")?.value;

  // 1️⃣ Pages publiques
  const isPublicPath = publicPaths.some(
    (path) => pathname.startsWith(path) || pathname === path
  );

  if (isPublicPath) {
    if (token) {
      try {
        await jwtVerify(token, SECRET);

        // ✅ Only redirect if this isn't a form submission or fetch
        if (req.method === "GET") {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 2️⃣ Redirige si pas de token
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const customers = payload.customers as number[] | undefined;
    const role = payload.role as Role | undefined;

    if (!customers || customers.length === 0 || !role) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const isOnStoresPage = pathname.startsWith("/stores");

    // 3️⃣ Vérification du store
    if (!storeCode && !isOnStoresPage) {
      return NextResponse.redirect(new URL("/stores", req.url));
    }

    if (storeCode) {
      const storeCodeNumber = Number(storeCode);
      const isValidStore = customers.includes(storeCodeNumber);
      if (!isValidStore && !isOnStoresPage) {
        console.warn(`⚠️ Invalid store code detected: ${storeCode}`);
        return NextResponse.redirect(new URL("/stores", req.url));
      }
    }

    if (
      pathname === "/profile/manager" ||
      pathname.startsWith("/profile/manager/")
    ) {
      const userLevel = roleHierarchy.indexOf(role);
      const requiredLevel = roleHierarchy.indexOf("manager");

      if (userLevel < requiredLevel) {
        console.warn(`🚫 Access denied: ${role} tried to access ${pathname}`);
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }

    // ✅ Tout est bon → autorise la requête
    return NextResponse.next();
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

// 5️⃣ Configuration du middleware
export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
