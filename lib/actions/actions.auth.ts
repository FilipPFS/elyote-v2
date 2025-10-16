"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setRefreshToken } from "./actions.global";

export async function checkAndRefreshToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found in cookies");
    return { success: false, reason: "no_token" };
  }

  const decoded = jwt.decode(token) as JwtPayload | null;

  if (!decoded?.exp) {
    console.warn("Invalid token structure");
    return { success: false, reason: "invalid_token" };
  }

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = decoded.exp - now;

  console.log("TIME UNTIL EXPIRY", timeUntilExpiry);

  if (timeUntilExpiry < 5 * 60) {
    console.log("🔄 Token expiring soon, refreshing...");
    const refreshed = await setRefreshToken();
    if (!refreshed?.success) {
      console.error("❌ Token refresh failed");
      cookieStore.delete("token");
      return { success: false, reason: "refresh_failed" };
    }
    return { success: true, refreshed: true };
  }

  return { success: true, refreshed: false };
}
