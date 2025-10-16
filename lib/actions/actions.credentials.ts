"use server";
import { revalidatePath } from "next/cache";
import { getToken } from "./actions.global";
import axios from "axios";
import { apiClient } from "../axios";
import { createNewPasswordValidation } from "../validation";
import { getTranslations } from "next-intl/server";
import { PasswordData } from "@/types";

export interface PostResponse {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  message?: string;
}

export const addNewCredential = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const t = await getTranslations("credentials.form");
    const token = await getToken();
    const newPasswordValidation = createNewPasswordValidation(t);

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

    const res = await apiClient.post(
      `/api/password/create/127`,
      { data: postData },
      {
        headers: {
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

export const updateCredential = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const t = await getTranslations("credentials.form");
    const token = await getToken();
    const newPasswordValidation = createNewPasswordValidation(t);

    if (!token)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const id = Number(formData.get("id"));

    if (!id) {
      return {
        success: false,
        error: "Impossible de modifier l'objet.",
      };
    }

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
      id,
      customer_id: "127",
      client_type: "bv",
    };

    console.log("POSTDATA", postData);
    console.log(
      "LINK",
      `${process.env.base_url}/api/password/update/127/${id}`
    );

    const res = await apiClient.post(
      `/api/password/update/127/${id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/identifiants/liste");

      return {
        success: true,
        message: "Votre identifiant a été modifié avec succès.",
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

export const getCredentials = async ({
  limit = 8,
  page,
}: {
  limit: number;
  page: number;
}) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const offset = (page - 1) * limit;

    // Count all credentials docs
    const credentialsDocs = await apiClient.get(`/api/passwords/read/127`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await apiClient.get(
      `/api/passwords/read/127?offset=${offset}&number_per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return {
        data: res.data as { passwords: PasswordData[] },
        pagesNumber: Math.ceil(credentialsDocs.data.passwords.length / limit),
      };
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

export const getCredentialsFromQuery = async (query: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/password/127/search?keywords=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => status >= 200 && status < 500,
      }
    );

    if (res.status === 200) {
      return res.data;
    } else if (res.status === 404) {
      console.log("Query not found");
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const getSingleCredential = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return null; // Return null or handle as needed
    }

    const res = await apiClient.get(`/api/password/read-one/127/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => status >= 200 && status < 500,
    });

    console.log("status", res.status);

    if (res.status === 200) {
      return res.data;
    } else if (res.status === 404) {
      console.log("Password not found for ID:", id);
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const deleteSingleCredential = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.post(
      `/api/password/delete/127`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/identifiants/liste");
      return { success: true };
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
