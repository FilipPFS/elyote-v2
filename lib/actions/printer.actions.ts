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

const printerToken = process.env.PRINTER_TOKEN;

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

export const getPrinterByModule = async (id: string) => {
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
        `/api/printer/default/${printerToken}/${option}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      results[label] = res.status === 200 ? { ...res.data, option } : null;
    } catch (err) {
      console.log("No data for", option);
      console.log(err);
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

export const updateDefaultPrinter = async (formData: PrinterFormUpdateData) => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const dataToSend = {
      data: formData,
      id_client: 666,
      client_type: "BV",
      employee_id: "common",
      token: printerToken,
      module: formData.module,
    };

    const res = await apiClient.post(
      `/api/printer/default/update`,
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("status", res.status);

    if (res.status === 200) {
      revalidatePath("/profile/reglages/imprimante");

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
