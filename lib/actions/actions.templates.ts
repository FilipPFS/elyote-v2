"use server";

import { revalidatePath } from "next/cache";
import {
  ApiResponse,
  getStoreCode,
  getToken,
  handleError,
} from "./actions.global";
import { apiClient } from "../axios";
import { templateFormSchemaValidation } from "../validation";
import { TemplateType } from "@/types";

export type TemplateFormData = {
  type: string;
  subject: string;
  content: string;
};

export const getTemplates = async (): Promise<{
  mail: TemplateType[];
  sms: TemplateType[];
}> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Unauthorized.");
      return { mail: [], sms: [] };
    }

    let mail: TemplateType[] = [];
    let sms: TemplateType[] = [];

    // GET SMS
    try {
      const resSms = await apiClient.get(
        `/api/communication_templates/type/sms?customer_id=${storeCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      sms = resSms.data;
    } catch (e) {
      // no sms templates or server error → fallback to []
      console.log(e);

      sms = [];
    }

    // GET MAIL
    try {
      const resMail = await apiClient.get(
        `/api/communication_templates/type/mail?customer_id=${storeCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      mail = resMail.data;
    } catch (e) {
      // no mail templates → fallback to []
      console.log(e);

      mail = [];
    }

    return { mail, sms };
  } catch (error) {
    handleError(error);
    return { mail: [], sms: [] };
  }
};

export const getMailTemplates = async (): Promise<{
  mail: TemplateType[];
}> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Unauthorized.");
      return { mail: [] }; // 👈 fallback
    }

    const resMail = await apiClient.get(
      `/api/communication_templates/type/mail?customer_id=${storeCode}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (resMail.status === 200) {
      return {
        mail: resMail.data as TemplateType[],
      };
    } else {
      return { mail: [] }; // 👈 fallback on failure
    }
  } catch (error) {
    handleError(error);
    return { mail: [] }; // 👈 fallback on error
  }
};

export const getSmsTemplates = async (): Promise<{
  sms: TemplateType[];
}> => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return { sms: [] }; // 👈 fallback
    }

    const resSms = await apiClient.get(`/api/communication_templates/sms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (resSms.status === 200) {
      return {
        sms: resSms.data as TemplateType[],
      };
    } else {
      return { sms: [] }; // 👈 fallback on failure
    }
  } catch (error) {
    handleError(error);
    return { sms: [] }; // 👈 fallback on error
  }
};

export const getTemplateById = async (id: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(
      `/api/communication_templates/${id}?customer_id=${storeCode}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const createTemplate = async (
  formData: TemplateFormData
): Promise<ApiResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Unauthorized.");
      return { success: false, error: "Vous n'êtes pas autorisé." };
    }

    const result = templateFormSchemaValidation.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const res = await apiClient.post(
      `/api/communication_templates?customer_id=${storeCode}`,
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

export const updateTemplate = async (
  formData: TemplateFormData,
  id: string
): Promise<ApiResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Unauthorized.");
      return { success: false, error: "Vous n'êtes pas autorisé." };
    }

    const result = templateFormSchemaValidation.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const editData = {
      subject: result.data.subject,
      content: result.data.content,
    };

    const res = await apiClient.patch(
      `/api/v1/communication_templates/${id}?customer_id=${storeCode}`,
      editData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
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

export const deleteTemplate = async (id: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Unauthorized.");
      return { success: false, error: "Vous n'êtes pas autorisé." };
    }

    const res = await apiClient.delete(
      `/api/v1/communication_templates/${id}?customer_id=${storeCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
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
