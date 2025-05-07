"use server";

import { apiClient } from "../axios";
import { getToken } from "./actions.global";

export const getSavs = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return;
    }

    const res = await apiClient.get("/api/sav/read/127", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};
