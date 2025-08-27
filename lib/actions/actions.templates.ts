"use server";

import { revalidatePath } from "next/cache";
import { ApiResponse, getToken, handleError } from "./actions.global";
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

export const getMailTemplates = async (): Promise<{
  mail: TemplateType[];
}> => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return { mail: [] }; // 👈 fallback
    }

    const resMail = await apiClient.get(`/api/communication_templates/mail`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/communication_template/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

export const updateTemplate = async (
  formData: TemplateFormData,
  id: string
): Promise<ApiResponse> => {
  try {
    const token = await getToken();

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

    const editData = {
      subject: result.data.subject,
      content: result.data.content,
    };

    const res = await apiClient.post(
      `/api/communication_template/update/${id}`,
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

    if (!token) {
      console.log("Unauthorized.");
      return { success: false, error: "Vous n'êtes pas autorisé." };
    }

    const res = await apiClient.post(
      `/api/communication_template/delete`,
      { id },
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
