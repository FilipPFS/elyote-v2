"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const signIn = async (formData: FormData) => {
  try {
    const data = {
      username: formData.get("username"),
      user_id: formData.get("user_id"),
      password: formData.get("password"),
    };

    const res = await axios.post(`${process.env.base_url}/api/token`, data, {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.api_key,
      },
    });

    if (res.status === 200) {
      const accessToken = res.data.access_token;

      const cookieStore = await cookies();

      cookieStore.set("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      cookieStore.set("id_bv", String(data.user_id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
    }
  } catch (error) {
    console.log(error);
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
