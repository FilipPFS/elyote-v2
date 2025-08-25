"use server";

import axios from "axios";
import { apiClient } from "../axios";
import { getToken } from "./actions.global";
import { PackageData } from "@/types";
import { revalidatePath } from "next/cache";

export const getStorageZone = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/storage_zone/read/666`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
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

export const getParcels = async ({
  limit = 8,
  page,
  status,
  type,
}: {
  limit: number;
  page: number;
  status: string;
  type: string;
}) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const offset = (page - 1) * limit;

    const response = await apiClient.get(
      `/api/parcel/read/126${status ? `&statut=${status}` : ""}${
        type ? `&type=${type}` : ""
      }`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const res = await apiClient.get(
      `/api/parcel/read/126?offset=${offset}&number_per_page=${limit}${
        status ? `&statut=${status}` : ""
      }${type ? `&type=${type}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const resJsonStartIndex = res.data.indexOf("{");

    // if (resJsonStartIndex === -1) {
    //   throw new Error("Invalid response: JSON not found");
    // }

    // const resJsonString = res.data.slice(resJsonStartIndex);

    // const parsedRes = JSON.parse(resJsonString);

    if (res.status === 200) {
      return {
        data: res.data.records,
        pagesNumber: Math.ceil(response.data.records.length / limit),
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

export const getParcelById = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/parcel/read_one/126/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      return res.data;
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

export const createParcel = async ({
  itemQuantity,
  emplacement,
  parentId,
}: {
  itemQuantity: number;
  emplacement: string;
  parentId: number;
}) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return { success: false };
    }

    const dataToSend = {
      parent_type: "manuel",
      parent_id: parentId > 0 ? parentId : 1,
      statut: 0,
      items_qty: itemQuantity,
      emplacement,
      entrepot_id: emplacement,
    };

    console.log("DATA SEND", dataToSend);

    const res = await apiClient.post(`/api/parcel/create/126`, dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      revalidatePath("/cmd/colis");
      return {
        success: true,
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return {
        success: false,
      };
    } else {
      console.error("Unknown error:", error);
      return { success: false };
    }
  }
};

export const updateParcel = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return { success: false };
    }

    const parcel: PackageData = await getParcelById(id);

    const dataToSend = {
      parent_type: parcel.parent_type,
      parent_id: 1,
      statut: 1,
      items_qty: parcel.items_qty,
      emplacement: "Livré",
      entrepot_id: parcel.entrepot_id,
    };

    const res = await apiClient.post(
      `/api/parcel/update/126/${id}`,
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return {
        success: true,
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return {
        success: false,
      };
    } else {
      console.error("Unknown error:", error);
      return { success: false };
    }
  }
};

export const updateParcelEmplacement = async ({
  emplacement,
  id,
}: {
  emplacement: string;
  id: string;
}) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return { success: false };
    }

    const parcel: PackageData = await getParcelById(id);

    const dataToSend = {
      parent_type: parcel.parent_type,
      parent_id: 1,
      statut: 0,
      items_qty: parcel.items_qty,
      emplacement: emplacement,
      entrepot_id: emplacement,
    };

    console.log("data", dataToSend);

    const res = await apiClient.post(
      `/api/parcel/update/126/${id}`,
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      revalidatePath("/cmd/colis");
      return {
        success: true,
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return {
        success: false,
      };
    } else {
      console.error("Unknown error:", error);
      return { success: false };
    }
  }
};

export const deleteParcelById = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const dataToSend = {
      id: Number(id),
    };

    const res = await apiClient.post(
      `/api/parcel/delete/126/${id}`,
      dataToSend,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status === 200) {
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
