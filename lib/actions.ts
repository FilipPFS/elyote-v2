"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { newPasswordValidation } from "./validation";
import { revalidatePath } from "next/cache";

export interface PostResponse {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  message?: string;
}

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
        maxAge: 60 * 60,
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

export const addNewPassword = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const data = Object.fromEntries(formData);
    const result = newPasswordValidation.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...result.data,
      customer_id: "127",
      client_type: "bv",
    };

    const res = await axios.post(
      `${process.env.base_url}/api/password/create/127`,
      { data: postData },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.api_key,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath("/identifiants/liste");

      return {
        success: true,
        message: "Votre identifiant a été ajouté avec succès.",
      };
    } else {
      return {
        success: false,
        error: `Erreur survenue: ${res.status}`,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error occurred:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error: String(error.message),
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        error: String(error),
      };
    }
  }
};

export const getPasswords = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await axios.get(
      `${process.env.base_url}/api/passwords/read/127`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.api_key,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unknown error:", error);
    }
  }
};
