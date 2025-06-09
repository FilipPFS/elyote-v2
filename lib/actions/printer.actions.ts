"use server";

import { cookies } from "next/headers";
import { apiClient } from "../axios";
import { getToken } from "./actions.global";
import { PrinterFormUpdateData, PrintSettings } from "@/types";
import { revalidatePath } from "next/cache";
import axios from "axios";

const optionLabels: Record<string, string> = {
  balisage_affiche_prix: "Balisage - Affiche Prix",
  balisage_fiche_technique: "Balisage - Fiche Technique",
  etiquette_colis: "Étiquette Colis - pour colisage",
  etiquette_prix: "Étiquette Prix",
  ticket: "Ticket (panier, rachat, etc.)",
  ticket_service: "Ticket - Espace service",
  document: "Document A4 (bon de livraison, résumé de commande, etc.)",
  bordereau_transport: "Bordereau transport (pdf, zpl)",
};

export async function loadPrinterOptions(): Promise<string[] | undefined> {
  const cookieStore = await cookies();
  const encoded = cookieStore.get("printer_options")?.value;

  if (!encoded) return undefined;

  try {
    const decoded = decodeURIComponent(encoded);
    return JSON.parse(decoded) as string[];
  } catch (err) {
    console.error("Failed to parse printer_options cookie:", err);
    return undefined;
  }
}

export const getPrinterByModule = async () => {
  const token = await getToken();

  if (!token) {
    console.log("Unauthorized");
    return null;
  }

  const printerToken = process.env.PRINTER_TOKEN;

  const printerOptions = await loadPrinterOptions();

  if (!printerOptions) return null;

  const results: Record<string, PrintSettings | null> = {};

  for (const option of printerOptions) {
    const label = optionLabels[option] ?? option;

    try {
      const res = await apiClient.get(
        `/api/printer/default/${printerToken}/${option}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      results[label] = res.status === 200 ? { ...res.data, option } : null;
    } catch {
      results[label] = { option };
    }
  }

  return results;
};

export const getPrintersList = async () => {
  const token = await getToken();

  if (!token) {
    console.log("Unauthorized");
    return null;
  }

  const printerToken = process.env.PRINTER_TOKEN;

  try {
    const res = await apiClient.get(`/api/printer/list/${printerToken}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200 && res.data.result === "success") {
      return res.data.computers;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

const handleApiError = (error: unknown): ApiResponse => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    console.error(`API error: ${message}`, {
      status: error.response?.status,
      data: error.response?.data,
    });
    return { success: false, error: message };
  }
  console.error("Unexpected error:", error);
  return { success: false, error: "An unexpected error occurred" };
};

export const getSinglePrinter = async (
  option: string
): Promise<ApiResponse | null> => {
  const token = await getToken();
  if (!token) {
    console.error("No token provided");
    return null;
  }

  const printerToken = process.env.PRINTER_TOKEN;
  if (!printerToken) {
    console.error("Printer token is not configured");
    return { success: false, error: "Printer token is missing" };
  }

  try {
    const res = await apiClient.get(
      `/api/printer/default/${encodeURIComponent(
        printerToken
      )}/${encodeURIComponent(option)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      success: res.status === 200,
      data: res.data, // Return actual data instead of just success
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateDefaultPrinter = async (
  formData: PrinterFormUpdateData
): Promise<ApiResponse> => {
  try {
    if (!formData.module) {
      return { success: false, error: "Module is required" };
    }

    const token = await getToken();
    if (!token) {
      return { success: false, error: "Authentication token is missing" };
    }

    const printerToken = process.env.PRINTER_TOKEN;
    if (!printerToken) {
      return { success: false, error: "Printer token is missing" };
    }

    const dataToSend = {
      data: formData,
      id_client: "666",
      client_type: "BV",
      employee_id: "common",
      token: printerToken,
      module: formData.module,
    };

    const printerInDb = await getSinglePrinter(formData.module);
    const isUpdate = printerInDb?.success;
    const endpoint = isUpdate
      ? "/api/printer/default/update"
      : "/api/printer/default/create";

    const res = await apiClient.post(endpoint, dataToSend, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      revalidatePath("/profile/reglages/imprimante");

      return { success: true, data: res.data };
    }

    return { success: false, error: "Failed to process request" };
  } catch (error) {
    return handleApiError(error);
  }
};
