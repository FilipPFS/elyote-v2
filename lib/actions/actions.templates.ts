"use server";

import { revalidatePath } from "next/cache";
import { ApiResponse, getToken, handleError } from "./actions.global";
import { apiClient } from "../axios";
import { templateFormSchemaValidation } from "../validation";
import { TemplateType } from "@/types";

export const getTemplates = async (): Promise<{
  mail: TemplateType[];
  sms: TemplateType[];
}> => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return { mail: [], sms: [] }; // 👈 fallback
    }

    const resSms = await apiClient.get(`/api/communication_templates/sms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const resMail = await apiClient.get(`/api/communication_templates/mail`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (resSms.status === 200 && resMail.status === 200) {
      return {
        mail: resMail.data as TemplateType[],
        sms: resSms.data as TemplateType[],
      };
    } else {
      return { mail: [], sms: [] }; // 👈 fallback on failure
    }
  } catch (error) {
    handleError(error);
    return { mail: [], sms: [] }; // 👈 fallback on error
  }
};

export const createTemplate = async (
  state: ApiResponse,
  formData: FormData
): Promise<ApiResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return { success: false, error: "Vous n'êtes pas autorisé." };
    }

    const postData = Object.fromEntries(formData);

    const result = templateFormSchemaValidation.safeParse(postData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const res = await apiClient.post(
      `/api/communication_template/create`,
      result.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      revalidatePath("/template");

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
    return handleError(error);
  }
};
