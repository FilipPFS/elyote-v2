"use server";

import { RentalFormData } from "@/components/RentalFormAdd";
import { apiClient } from "../axios";
import { getToken } from "./actions.global";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { RentalData } from "@/types";
import { PostResponse } from "./actions.credentials";
import { createRentalUpdateFormValidation } from "../validation";
import { getTranslations } from "next-intl/server";

export const getRentals = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get("/api/rentals/read/126", {
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

export const getRentalById = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/rental/read-one/126/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: (status) => status >= 200 && status < 500,
    });
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

export const addNewRental = async (formData: RentalFormData) => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const postData = {
      ...formData,
      deposit: 0,
      status: 1,
      customer_id: "126",
      client_type: "bv",
    };

    console.log("to post", postData);

    const res = await apiClient.post(
      `/api/rental/create/126`,
      { data: postData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath("/locations/liste");

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

export const changeStatusOfRental = async (id: string) => {
  try {
    const token = await getToken();

    if (!token || !id)
      return {
        success: false,
        error: "Vous devez être authentifié.",
      };

    const rentalFromDb: RentalData = await getRentalById(id);

    if (!rentalFromDb) {
      return {
        success: false,
        error: "Cette location n'existe pas.",
      };
    }

    const newRentalFromDb = { ...rentalFromDb, status: 0 };

    const res = await apiClient.post(
      `/api/rental/update/126/${id}`,
      newRentalFromDb,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("status", res.status);

    if (res.status === 200) {
      revalidatePath(`/locations/liste/${id}`);
      revalidatePath("/locations/liste");

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "Erreur arrivé. Ressayez.",
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

export const updateRental = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();
    const id = formData.get("id") as string;
    const t = await getTranslations("rentals");
    const rentalUpdatedFormSchema = createRentalUpdateFormValidation(t);

    if (!token)
      return {
        success: false,
        error: "Vous devez être authentifié.",
      };

    const rentalFromDb: RentalData = await getRentalById(id);

    if (!rentalFromDb) {
      return {
        success: false,
        error: "Cette location n'existe pas.",
      };
    }

    const data = Object.fromEntries(formData);
    const result = rentalUpdatedFormSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const updatedRentalFromDb = {
      ...rentalFromDb,
      ...result.data,
    };

    const res = await apiClient.post(
      `/api/rental/update/126/${id}`,
      updatedRentalFromDb,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("status", res.status);

    if (res.status === 200) {
      revalidatePath("/locations/liste");

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "Erreur arrivé. Ressayez.",
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
