"use client";

import { useEffect } from "react";
import { checkAndRefreshToken } from "@/lib/actions/actions.auth";

export default function TokenRefresher() {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const runRefresh = async () => {
      try {
        // Call the server action directly 👇
        await checkAndRefreshToken();
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    };

    // Run once on mount
    runRefresh();

    // Repeat every 5 minutes
    interval = setInterval(runRefresh, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
