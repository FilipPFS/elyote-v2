"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../axios";
import { PostResponse } from "./actions.credentials";
import { getStoreCode, getToken } from "./actions.global";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import { createNewMaterialValidation } from "../validation";
import { RentalQuery } from "@/types";

export const addMaterial = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();
    const t = await getTranslations("material");
    const materialFormSchema = createNewMaterialValidation(t);

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const data = Object.fromEntries(formData);
    const result = materialFormSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const booleanData = {
      ...result.data,
      lend: result.data.lend === 1,
      rent: result.data.rent === 1,
    };

    const postData = {
      ...booleanData,
      state: data.state === "1",
      client_type: "bv",
    };

    console.log("post", postData);

    const res = await apiClient.post(
      `/api/materials?customer_id=${storeCode}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath("/parc-materiel/liste");

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

export const getMaterials = async () => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/materials?customer_id=${storeCode}`, {
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

export const getRentMaterials = async () => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();
    const t = await getTranslations("rentals.addPage.form.materials");

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return;
    }

    const types = [
      {
        value: "printer",
      },
      {
        value: "phone",
      },
      {
        value: "projector",
      },
      {
        value: "other",
      },
    ];

    const requests = types.map((type) =>
      apiClient.get(
        `/api/v1/materials/lend/condition?customer_id=${storeCode}&lend=1&state=1&type=${type.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    const responses = await Promise.all(requests);

    const data = types.reduce((acc, type, index) => {
      acc[t(type.value)] = responses[index].data.material;
      return acc;
    }, {} as Record<string, RentalQuery[]>);

    if (data) {
      return data;
    } else {
      console.log("Error occured.");
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const getMaterialById = async (id: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/materials/${id}?customer_id=${storeCode}`,
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

export const deleteSingleMaterial = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.post(
      `/api/material/delete/126`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/parc-materiel/liste");
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

export const updateMaterial = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();
    const t = await getTranslations("material");
    const materialFormSchema = createNewMaterialValidation(t);

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const id = Number(formData.get("id"));
    const data = Object.fromEntries(formData);
    const result = materialFormSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...data,
      lend: Number(data.lend),
      rent: Number(data.rent),
      state: Number(data.state),
    };

    console.log("postdata", postData);

    const res = await apiClient.patch(
      `/api/materials/${id}?customer_id=${storeCode}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/parc-materiel/liste");

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
