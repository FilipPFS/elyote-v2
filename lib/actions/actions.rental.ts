"use server";

import { RentalFormData } from "@/components/RentalFormAdd";
import { apiClient } from "../axios";
import { getToken } from "./actions.global";
import { revalidatePath } from "next/cache";
import axios from "axios";

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
