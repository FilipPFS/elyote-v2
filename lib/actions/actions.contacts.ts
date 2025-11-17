"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../axios";
import { PostResponse } from "./actions.credentials";
import { getStoreCode, getToken } from "./actions.global";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import { createNewContactValidation } from "../validation";

export const addNewContact = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const t = await getTranslations("contacts.form");
    const token = await getToken();
    const storeCode = await getStoreCode();
    const newContactValidation = createNewContactValidation(t);

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const data = Object.fromEntries(formData);
    const result = newContactValidation.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...result.data,
      customer_id: "126",
      client_type: "bv",
    };

    const res = await apiClient.post(
      `/api/v1/contacts?customer_id=${storeCode}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath("/repertoire/liste");

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

export const updateContact = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const t = await getTranslations("contacts.form");
    const token = await getToken();
    const storeCode = await getStoreCode();
    const newContactValidation = createNewContactValidation(t);

    if (!token || !storeCode)
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
    const result = newContactValidation.safeParse(data);

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
      customer_id: "126",
      client_type: "bv",
    };

    const res = await apiClient.patch(
      `/api/v1/contacts/${id}?customer_id=${storeCode}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/repertoire/liste");

      return {
        success: true,
        message: "Votre contact a été modifié avec succès.",
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

export const getContacts = async () => {
  try {
    const storeCode = await getStoreCode();
    const token = await getToken();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return null;
    }

    const res = await apiClient.get(
      `/api/v1/contacts?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const getContactsFromQuery = async (query: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/v1/contacts/search/${query}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => status >= 200 && status < 500,
      }
    );

    console.log("status", res.status);

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

export const getContactByFilter = async (category: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/contacts/filter/${category}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => status >= 200 && status < 500,
      }
    );

    console.log("status", res.status);

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

export const getContactById = async (id: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return null;
    }

    const res = await apiClient.get(
      `/api/v1/contacts/${id}?customer_id=${storeCode}`,
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

export const deleteSingleContact = async (id: string) => {
  try {
    const storeCode = await getStoreCode();
    const token = await getToken();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.delete(
      `/api/contacts/${id}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/repertoire/liste");
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
