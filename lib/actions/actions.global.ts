"use server";

import { cookies } from "next/headers";
import { apiClient } from "../axios";
import { getTranslations } from "next-intl/server";

type SignInType = { success: boolean; error?: string };

export const signIn = async (
  prevState: SignInType,
  formData: FormData
): Promise<SignInType> => {
  try {
    const t = await getTranslations("global.signInForm");
    const data = {
      username: process.env.API_ELYOTE_USERNAME,
      user_id: formData.get("user_id"),
      password: process.env.API_ELYOTE_PASSWORD,
    };

    if (data.user_id !== "666") {
      return { success: false, error: t("credentials.invalid") };
    }

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

export async function signOut() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.delete("token");

    if (token) {
      return {
        succes: true,
      };
    }
  } catch (error) {
    console.error("Error retrieving token from cookies:", error);
    return null;
  }
}
