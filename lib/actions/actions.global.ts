"use server";

import { cookies } from "next/headers";
import { apiClient } from "../axios";

type SignInType = { success: boolean; error?: string };

export const signIn = async (
  prevState: SignInType,
  formData: FormData
): Promise<SignInType> => {
  try {
    const data = {
      username: formData.get("username"),
      user_id: formData.get("user_id"),
      password: formData.get("password"),
    };

    const res = await apiClient.post("/api/token", data);

    if (res.status === 200) {
      const accessToken = res.data.access_token;

      const cookieStore = await cookies();
      cookieStore.set("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      });

      return { success: true };
    } else {
      return { success: false, error: "Invalid response status" };
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign-in failed",
    };
  }
};

export async function getToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return token?.value ?? null;
  } catch (error) {
    console.error("Error retrieving token from cookies:", error);
    return null;
  }
}
