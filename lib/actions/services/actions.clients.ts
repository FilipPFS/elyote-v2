"use server";

import {
  clientSchema,
  serviceCardCreateSchema,
  serviceContactValidationSchema,
} from "@/lib/validation";
import { apiClient } from "../../axios";
import { ApiResponse, PostResponse } from "../actions.credentials";
import { getStoreCode, getToken } from "../actions.global";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { buildParams } from "@/lib/utils";

export type ServiceCardType = {
  id: number;
  type: string;
  customer_id: string;
};

type ServiceCardResponse = {
  records: ServiceCardType[];
};

export type GroupedServiceCards = {
  all: ServiceCardType[];
  personal: ServiceCardType[];
};

export type ClientFormStateData = {
  societe?: string;
  nom: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  code_contact?: string | number;
  commentaire?: string;
};

export type ClientFormState = {
  success?: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  data?: ClientFormStateData;
};

export const getServiceClientsFromQuery = async ({
  limit = 8,
  page,
  query,
  filterBy,
}: {
  limit: number;
  page: number;
  query?: string;
  filterBy?: string;
}) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) return;

    const offset = (page - 1) * limit;

    // 🔹 DATA request
    const dataParams = buildParams({
      storeCode,
      offset,
      limit,
      query,
      filterBy,
    });

    const res = await apiClient.get(`/api/service_area?${dataParams}`, {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: (status) => status >= 200 && status < 500,
    });

    if (res.status === 200) {
      return {
        data: res.data.records,
        pagesNumber: Math.ceil(res.data.total / limit),
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

export const getServiceClientById = async (id: number) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/v1/services/${id}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const getServiceClientHistoryById = async (id: number) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(
      `/api/v1/service_history/${id}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return res.data.records;
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

export const getServiceCardTypes =
  async (): Promise<GroupedServiceCards | null> => {
    try {
      const token = await getToken();
      const storeCode = await getStoreCode();

      if (!token || !storeCode) {
        console.log("Token ou storeCode manquant");
        return null;
      }

      const res = await apiClient.get<ServiceCardResponse>(
        `/api/v1/service_cards_type?customer_id=${storeCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status !== 200) {
        console.log("Unexpected status:", res.status);
        return null;
      }

      const { records } = res.data;

      const grouped = records.reduce<GroupedServiceCards>(
        (acc, card) => {
          if (card.customer_id === "all") {
            acc.all.push(card);
          } else if (card.customer_id === storeCode) {
            acc.personal.push(card);
          }
          return acc;
        },
        {
          all: [],
          personal: [],
        }
      );

      return grouped;
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      return null;
    }
  };

export const addNewServiceCardType = async (
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const type = formData.get("type");

    if (!type) {
      return {
        success: false,
        error: "Le type est obligatoire.",
      };
    }

    const res = await apiClient.post(
      `/api/v1/service_cards_type?customer_id=${storeCode}`,
      { type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RES STATUS", res.status);

    if (res.status === 201) {
      revalidatePath("/cartes-copies/reglages");

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

export const updateServiceCardType = async (
  id: number,
  state: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const type = formData.get("type");

    if (!type) {
      return {
        success: false,
        error: "Le type est obligatoire.",
      };
    }

    console.log("TYPE", type);

    const res = await apiClient.patch(
      `/api/v1/service_cards_type/${id}?customer_id=${storeCode}`,
      { type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RES STATUS", res.status);

    if (res.status === 200) {
      revalidatePath("/cartes-copies/reglages");

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

export const addNewClient = async (
  state: ClientFormState,
  formData: FormData
): Promise<ClientFormState> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const data = Object.fromEntries(formData) as ClientFormStateData;
    const result = clientSchema.safeParse(data);

    if (!result.success) {
      console.log("DATA", data);

      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
        data: data,
      };
    }

    const postData = {
      ...result.data,
    };

    const res = await apiClient.post(
      `/api/v1/service_area?customer_id=${storeCode}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RES STATUS", res.status);

    if (res.status === 201 || res.status === 200) {
      revalidatePath("/cartes-copies/liste");

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

export const updateClient = async (
  id: string,
  state: ClientFormState,
  formData: FormData
): Promise<ClientFormState> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode)
      return {
        success: false,
        error: "Une erreur est survenue. Ressayez plus tard.",
      };

    const data = Object.fromEntries(formData) as ClientFormStateData;
    const result = clientSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...result.data,
      code_contact: result.data.code_contact?.trim()
        ? Number(result.data.code_contact.trim())
        : null,
    };

    console.log("POSTDATA", postData);

    const res = await apiClient.patch(
      `/api/v1/service_area/${id}?customer_id=${storeCode}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RES STATUS", res.status);

    if (res.status === 201 || res.status === 200) {
      revalidatePath("/cartes-copies/liste");

      if (res.data.updated) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
          error: "Aucun changement détécté.",
        };
      }
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

export const addCard = async (
  id: string,
  prevState: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    // 1️⃣ Données simples
    const storeCode = await getStoreCode();
    const token = await getToken();

    if (!storeCode || !token) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }
    const data = {
      quantite: Number(formData.get("quantite")),
      type: Number(formData.get("type")),
      accompagnement: formData.get("accompagnement"),
    };

    const result = serviceCardCreateSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const res = await apiClient.post(
      `/api/v1/service_cards/${id}?customer_id=${storeCode}`,
      result.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath(`/cartes-copies/liste/${id}`);
      return { success: true };
    } else {
      return {
        success: false,
        error: `Erreur survenue avec statut: ${res.status}`,
      };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Erreur serveur" };
  }
};

export const addContact = async (
  id: string,
  prevState: PostResponse,
  formData: FormData
): Promise<PostResponse> => {
  try {
    // 1️⃣ Données simples
    const storeCode = await getStoreCode();
    const token = await getToken();

    if (!storeCode || !token) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }
    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
    };

    if (!data.nom || !data.prenom) {
      return {
        success: false,
        error: "Prénom & nom sont obligatoires.",
      };
    }

    const res = await apiClient.post(
      `/api/v1/service_contact/${id}?customer_id=${storeCode}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath(`/cartes-copies/liste/${id}`);
      return { success: true };
    } else {
      return {
        success: false,
        error: `Erreur survenue avec statut: ${res.status}`,
      };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Erreur serveur" };
  }
};

export async function deductCardsAction(
  id: string,
  prevState: ApiResponse,
  formData: FormData
): Promise<ApiResponse> {
  try {
    // 1️⃣ Données simples
    const storeCode = await getStoreCode();
    const token = await getToken();

    if (!storeCode || !token) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    const data = {
      operateur: formData.get("operateur"),
      contactId: formData.get("contactId"),
      codeConfirmed: formData.get("codeConfirmed"),
    };

    console.log(data);

    const result = serviceContactValidationSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    // 2️⃣ Récupération des quantités
    const quantiteEntries = [...formData.entries()].filter(([key]) =>
      key.startsWith("quantite[")
    );

    const deductions = quantiteEntries
      .map(([key, value]) => {
        const cardId = Number(key.match(/\d+/)?.[0]);
        const quantite = Number(value);

        return {
          cardId,
          quantite,
        };
      })
      .filter((d) => d.cardId && d.quantite > 0);

    // 🔐 Sécurité clé
    if (!deductions.length) {
      return { error: "Aucune carte à déduire" };
    }

    for (const item of deductions) {
      await apiClient.patch(
        `/api/v1/service_cards/${item.cardId}?customer_id=${storeCode}`,
        {
          solde: item.quantite,
          contact_id: result.data.contactId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    revalidatePath(`/cartes-copies/liste/${id}`);

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Erreur serveur" };
  }
}

export const deleteContact = async (
  clientId: number,
  contactId: number
): Promise<PostResponse> => {
  try {
    // 1️⃣ Données simples
    const storeCode = await getStoreCode();
    const token = await getToken();

    if (!storeCode || !token) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    await apiClient.delete(
      `/api/v1/service_contact/${clientId}/${contactId}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath(`/cartes-copies/liste/${clientId}`);

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Erreur serveur" };
  }
};
