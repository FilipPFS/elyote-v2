"use server";

import { cookies } from "next/headers";
import { apiClient } from "../axios";
import axios from "axios";
import { Customer, PdfType, User, UserMenuSettings } from "@/types";
import { signInSchema } from "../validation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Modes } from "@/components/Interface/ToggleModes";

type ErrorResponse = {
  success: false;
  error: string;
};

export type ApiResponse = {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  customers?: number[];
  user?: User;
  customerList?: Customer[];
  id?: number;
  settings?: Modes;
  menu?: Record<string, boolean>;
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

// type SignInType = {
//   success: boolean;
//   customerData?: Record<string, string>;
//   printerOptions?: string[];
//   error?: string;
// };

export const signIn = async (
  prevState: ApiResponse,
  formData: FormData
): Promise<ApiResponse> => {
  try {
    const secret = process.env.SECRET_KEY!;

    const data = Object.fromEntries(formData);
    const result = signInSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const res = await apiClient.post("/api/auth/login", result.data);

    if (res.status === 200) {
      console.log("RES DATA", res.data);

      const accessToken = res.data.access_token;
      const refreshToken = res.data.refresh_token;

      const cookieStore = await cookies();
      cookieStore.set("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      });

      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      });

      const decoded = jwt.verify(accessToken, secret) as JwtPayload & {
        customers?: number[];
        role?: string;
      };

      const { customers } = decoded;
      const { role } = decoded;

      if (customers && customers.length > 0 && customers.length < 2) {
        cookieStore.set("store-code", String(customers[0]), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict",
          path: "/",
        });
      } else if (customers?.length === 0 && role === "superadmin") {
        cookieStore.set("store-code", "1", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict",
          path: "/",
        });
      }

      const interfaceSettings = res.data.user.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_interface"
      );

      const menuSettings = res.data.user.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_module"
      );

      return {
        success: true,
        customers: decoded.customers,
        customerList: res.data.customers,
        user: res.data.user,
        settings: interfaceSettings
          ? JSON.parse(interfaceSettings.value)
          : undefined,
        menu: menuSettings ? JSON.parse(menuSettings.value) : undefined,
        id: res.data.user.id,
      };
    } else {
      return { success: false, error: "Invalid response status" };
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? "Identifiants ou mot de passe incorects"
          : "Sign-in failed",
    };
  }
};

export const setRefreshToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const secret = process.env.SECRET_KEY!;

  if (!token || !secret) return { success: false };

  const res = await apiClient.post(
    "/api/auth/refresh-token",
    { refresh_token: refreshToken },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status !== 200) return { success: false, error: "Invalid status" };

  const accessToken = res.data.access_token;
  const newRefreshToken = res.data.refresh_token;

  cookieStore.set("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    sameSite: "strict",
    path: "/",
  });
  cookieStore.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    sameSite: "strict",
    path: "/",
  });

  const decoded = jwt.verify(accessToken, secret) as JwtPayload & {
    customers?: number[];
  };

  const { customers } = decoded;
  const previousStore = cookieStore.get("store-code")?.value;
  const isValidStore =
    customers && previousStore && customers.includes(Number(previousStore));

  // 🧱 CASE 1 — restore previous store-code if still valid
  if (isValidStore) {
    cookieStore.set("store-code", previousStore, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });
  }
  // 🧱 CASE 2 — if user has exactly one store, auto-set it
  else if (customers && customers.length === 1) {
    cookieStore.set("store-code", String(customers[0]), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });
  }
  // 🧱 CASE 3 — else: multiple stores & previous invalid → force re-selection later
  else {
    console.log("Multiple or invalid stores → user must reselect.");
  }

  return { success: true, customers };
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

export async function getStoreCode() {
  try {
    const cookieStore = await cookies();
    const storeCode = cookieStore.get("store-code");
    return storeCode?.value ?? null;
  } catch (error) {
    console.error("Error retrieving token from cookies:", error);
    return null;
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.delete("token");
    cookieStore.delete("store-code");
    cookieStore.delete("refreshToken");

    console.log("TOK", token);

    if (token) {
      return {
        success: true,
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

export const getCustomersFromToken = async () => {
  const token = await getToken();

  if (!token) return;

  const decoded = jwt.decode(token) as JwtPayload & {
    customers?: number[];
  };

  if (decoded.customers && decoded.customers.length > 0) {
    return decoded.customers;
  }
};

export const setCustomerCode = async (formData: FormData) => {
  const token = await getToken();

  if (!token) return;

  const secret = process.env.SECRET_KEY!;
  const decoded = jwt.verify(token, secret) as JwtPayload & {
    customers?: number[];
  };

  const { customers } = decoded;

  const code = Number(formData.get("code"));

  if (customers?.includes(code)) {
    const cookieStore = await cookies();

    cookieStore.set("store-code", String(code), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
      path: "/",
    });

    redirect("/");
  } else {
    throw new Error("Invalid store code");
  }
};
