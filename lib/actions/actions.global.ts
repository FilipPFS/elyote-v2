"use server";

import { cookies } from "next/headers";
import { apiClient } from "../axios";
import { getTranslations } from "next-intl/server";
import axios from "axios";
import { PdfType } from "@/types";

type ErrorResponse = {
  success: false;
  error: string;
};

export type ApiResponse = {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
};

export async function handleError(error: unknown): Promise<ErrorResponse> {
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

type SignInType = {
  success: boolean;
  customerData?: Record<string, string>;
  printerOptions?: string[];
  error?: string;
};

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

      return {
        success: true,
        customerData: {
          customer_social_reason: "SARL du parc",
          customer_capital: "48956.32",
          customer_address: "25 rue du paradis",
          customer_zipcode: "77120",
          customer_city: "Coulommiers",
          customer_rcs_city: "Meaux",
          customer_rcs_number: "405 236 598",
        },
        printerOptions: [
          "balisage_affiche_prix",
          "balisage_fiche_technique",
          "etiquette_colis",
          "etiquette_prix",
          "ticket",
          "ticket_service",
          "document",
          "bordereau_transport",
        ],
      };
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

export const generatePdf = async ({
  pdfType,
  content,
  type,
  template_id,
  resolution_dpi,
  template_name,
  template_title,
}: PdfType) => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("Token not available.");
      return null;
    }

    const postData = {
      data:
        pdfType === "SAV"
          ? {
              content,
            }
          : content,
      type,
      template_id,
      resolution_dpi,
      template_name,
      template_title,
    };

    const customer_id = 126;

    const res = await apiClient.post(
      `/api/generate_pdf/${customer_id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return res.data;
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
