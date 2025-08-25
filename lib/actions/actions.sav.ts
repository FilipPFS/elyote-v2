"use server";

import { revalidatePath } from "next/cache";
import {
  apiClient,
  contentDetectApiClient,
  multipartApiClient,
} from "../axios";
import { getToken } from "./actions.global";
import axios from "axios";
import { SavFormData } from "@/components/SavFormAdd";
import { PostResponse } from "./actions.credentials";
import {
  savFilesValidation,
  savUpdateFormSchemaValidation,
} from "../validation";
import { CustomSavStatus, SavData } from "@/types";

export interface SavEvolutionResponse {
  success?: boolean;
  error?: string;
}

export const getSavs = async ({
  limit = 8,
  page,
}: {
  limit: number;
  page: number;
}) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return;
    }

    const offset = (page - 1) * limit;

    // Count all SAV docs
    const savDocs = await apiClient.get(`/api/sav/read/127/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // SAV docs based on query
    const res = await apiClient.get(
      `/api/sav/read/127/?offset=${offset}&number_per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return {
        data: res.data as { sav: SavData[] },
        pagesNumber: Math.ceil(savDocs.data.sav.length / limit),
      };
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const getSavById = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/sav/read-one/127/${id}`, {
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
        bucket: "default",
        directory_name: "sav/",
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

export const addNewSav = async (formData: SavFormData, attachment: File[]) => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const postData = {
      data: {
        // id: 72,
        ...formData,
        deadline: Number(formData.deadline),
        status: "0",
        customer_id: "127",
        code_sav: "45BZEHG6",
        user_id: "17",
      },
      bucket: "default",
      directory_name: "sav/",
    };

    const formDataToSend = new FormData();

    formDataToSend.append("json", JSON.stringify(postData));

    console.log("attachment", attachment);

    attachment.forEach((file: File) => {
      formDataToSend.append("files[]", file);
    });

    console.log("formSend", formDataToSend);

    const res = await contentDetectApiClient.post(
      `/api/sav/create/127`,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const updateSav = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();
    const id = formData.get("id") as string;

    if (!token)
      return {
        success: false,
        error: "Vous devez être authentifié.",
      };

    const savFromDb: SavData = await getSavById(id);

    if (!savFromDb) {
      return {
        success: false,
        error: "Cet SAV n'existe pas.",
      };
    }

    const files = formData.getAll("attachment");
    const firstRes = savFilesValidation.safeParse({ files });

    if (!firstRes.success) {
      console.log(firstRes.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: firstRes.error.formErrors.fieldErrors,
      };
    }

    const data = Object.fromEntries(formData);

    console.log("formData", formData);

    const result = savUpdateFormSchemaValidation.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      data: {
        id: Number(savFromDb.id),
        customer_id: savFromDb.customer_id,
        user_id: savFromDb.user_id,
        code_sav: savFromDb.code_sav,
        ...result.data,
      },
      bucket: "default",
      directory_name: "sav/",
    };

    console.log("postData", postData);

    const formDataToSend = new FormData();
    formDataToSend.append("json", JSON.stringify(postData));

    if (firstRes.data.files) {
      firstRes.data.files
        .filter((file: File) => file.size > 0 && file.name !== "undefined")
        .forEach((file: File) => {
          formDataToSend.append("files[]", file);
        });
    }

    console.log("formSend", formDataToSend);

    const res = await contentDetectApiClient.post(
      `/api/sav/update/127/${id}`,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "api-key": process.env.API_ELYOTE_KEY!,
        },
      }
    );

    if (res.status === 200) {
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

export const getSavEvolutionById = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/sav_evolution/read/127/${id}`, {
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
    console.log(error);
    return null;
  }
};

export const getSavSuppliers = async () => {
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
      const suppliers = [
        ...new Set(res.data.sav.map((item: SavData) => item.supplier)),
      ];

      console.log(suppliers);

      return suppliers as string[];
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const updateSavStatus = async (
  state: SavEvolutionResponse,
  formData: FormData
): Promise<SavEvolutionResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return {
        success: false,
        error: "Vous n'êtes pas autorisé.",
      };
    }

    const id = formData.get("id");

    if (!id) return { success: false, error: "SAV est introuvable." };

    const postData = {
      details: formData.get("details"),
      status: formData.get("status"),
      sav_id: id,
      customer_id: "127",
      user_id: "15",
    };

    const res = await apiClient.post(
      `/api/sav_evolution/create/127`,
      { data: postData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath(`sav/liste/${id}`);
      return { success: true };
    } else {
      console.log("Unexpected status:", res.status);
      return {
        success: false,
        error: "Erreur survenue.",
      };
    }
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      error: String(error),
    };
  }
};

export const getSavsByFilter = async ({
  supplier,
  status,
}: {
  supplier: string;
  status: string;
}) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/sav/filter/127?supplier=${supplier}&status=${status}`,
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

export const getCustomStatuses = async (allowAll: boolean) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/sav_status/read/126`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      if (allowAll) {
        return res.data.records;
      } else {
        const records = res.data.records.filter(
          (item: CustomSavStatus) => item.soft_delete !== "0"
        );

        return records;
      }
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};

export const addNewCustomStatus = async ({
  statut,
  colorFont,
  colorBackground,
}: {
  statut: string;
  colorFont: string;
  colorBackground: string;
}): Promise<PostResponse> => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const postData = {
      statut,
      color_background: colorBackground,
      color_font: colorFont,
      customer_id: 126,
    };

    console.log("to post", postData);

    const res = await apiClient.post(`/api/sav_status/create/126`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      revalidatePath("/profile/reglages/sav");

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

export const updateCustomStatus = async ({
  statut,
  id,
  colorFont,
  colorBackground,
}: {
  statut: string;
  id: number;
  colorFont: string;
  colorBackground: string;
}): Promise<PostResponse> => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const postData = {
      statut,
      id,
      color_font: colorFont,
      color_background: colorBackground,
    };

    const res = await apiClient.post(`/api/sav_status/update/126`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      revalidatePath("/profile/reglages/sav");

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

export const deleteCustomStatus = async (id: number): Promise<PostResponse> => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const res = await apiClient.post(
      `/api/sav_status/delete/126`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/profile/reglages/sav");

      return {
        success: true,
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
