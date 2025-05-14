"use server";

import { revalidatePath } from "next/cache";
import { apiClient, multipartApiClient } from "../axios";
import { getToken } from "./actions.global";
import axios from "axios";
import { SavFormData } from "@/components/SavFormAdd";

export const getSavs = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return;
    }

    const res = await apiClient.get("/api/sav/read/127", {
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

export const getSavsByQuery = async (query: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/sav/127/search?keywords=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    } else {
      console.log("Unexpected status", res.status);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadFile = async (attachments: File[]) => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const formDataPayload = new FormData();
    attachments.forEach((file: File) => {
      formDataPayload.append("file", file);
    });

    formDataPayload.append(
      "json",
      JSON.stringify({
        bucket: "dev-simplycopy",
        directory_name: "print_online",
      })
    );

    const res = await multipartApiClient.post(
      `/api/upload_file`,
      formDataPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      return res.data;
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

export const addNewSav = async (formData: SavFormData) => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    // const fileLinks = await uploadFile(formData.attachment);
    // const fileToSendLinks = [fileLinks.url];

    const data = {
      ...formData,
      attachment: "a:0:{}",
      deadline: Number(formData.deadline),
      status: "0",
      customer_id: "127",
      code_sav: "45BZEHG6",
      user_id: "17",
    };

    const payload = {
      data,
      bucket: "default",
      directory_name: "sav/",
    };

    const res = await apiClient.post(`/api/sav/create/127`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      revalidatePath("/sav/liste");

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
