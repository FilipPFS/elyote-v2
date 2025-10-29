"use server";

import { UserEditFormData, UserFormCreate } from "@/types";
import { apiClient } from "../axios";
import { getStoreCode, getToken } from "./actions.global";
import { profileSchema, userCreateSchema, userEditSchema } from "../validation";
import { ApiResponse } from "./actions.credentials";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

const SECRET_KEY = process.env.SECRET_KEY;
const SECRET = new TextEncoder().encode(SECRET_KEY);

interface UserApiResponse {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  data?: UserEditFormData;
}

export const getUserDataById = async (id: string) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/user/read-one/${storeCode}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return {
        user: res.data.user,
        customers: res.data.customers,
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

export const getAllUsers = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const storeCode = await getStoreCode();

    if (!storeCode) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/user/read/${storeCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data.records;
    } else {
      console.log("Unexpected status:", res.status);
      return null;
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const createUser = async ({
  formData,
}: {
  formData: UserFormCreate;
}): Promise<ApiResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    const result = userCreateSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...result.data,
    };

    console.log("POSTDATA", postData);

    const res = await apiClient.post(`/api/user/create`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "Une erreur s'est reproduit.",
      };
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Une erreur s'est reproduit.",
    };
  }
};

export const updateMyUserProfile = async ({
  formData,
}: {
  formData: UserEditFormData;
}): Promise<UserApiResponse> => {
  try {
    const token = await getToken();
    const id = await extractIdFromToken();
    const storeCode = await getStoreCode();

    if (!token || !id || !storeCode) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...result.data,
    };

    const res = await apiClient.post(
      `/api/user/update/${storeCode}/${id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RES", res);

    if (res.status === 200) {
      return {
        success: true,
        data: postData,
      };
    } else {
      return {
        success: false,
        error: "Une erreur s'est reproduit.",
      };
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Une erreur s'est reproduit.",
    };
  }
};

export const updateUserProfile = async ({
  formData,
  id,
}: {
  formData: UserEditFormData;
  id: string;
}): Promise<UserApiResponse> => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !id || !storeCode) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    const result = userEditSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      ...result.data,
    };

    const res = await apiClient.post(
      `/api/user/update/${storeCode}/${id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RES", res);

    if (res.status === 200) {
      revalidatePath(`/profile/manager/utilisateurs/${id}`);
      return {
        success: true,
        data: postData,
      };
    } else {
      return {
        success: false,
        error: "Une erreur s'est reproduit.",
      };
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Une erreur s'est reproduit.",
    };
  }
};

export const extractRoleFromToken = async () => {
  try {
    const token = await getToken();
    if (!token) return null;

    const { payload } = await jwtVerify(token, SECRET);
    const role = payload.role as string | undefined;

    return role ?? null;
  } catch (error) {
    console.error("❌ extractRole error:", error);
    return null;
  }
};

export const extractIdFromToken = async () => {
  try {
    const token = await getToken();
    if (!token) return null;

    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.user_id as number;

    return userId ?? null;
  } catch (error) {
    console.error("❌ extractRole error:", error);
    return null;
  }
};
