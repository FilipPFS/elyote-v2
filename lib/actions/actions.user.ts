"use server";

import { User, UserEditFormData, UserFormCreate } from "@/types";
import { apiClient } from "../axios";
import { getStoreCode, getToken } from "./actions.global";
import { profileSchema, userCreateSchema } from "../validation";
import { ApiResponse } from "./actions.credentials";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY;
const SECRET = new TextEncoder().encode(SECRET_KEY);

export const getUserDataById = async (id: string, customerId: string) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Token expiré.");
      return;
    }

    const res = await apiClient.get(`/api/user/read-one/${customerId}/${id}`, {
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

export const updateUserProfile = async ({
  id,
  customerId,
  formData,
}: {
  id: string;
  customerId: string;
  formData: UserEditFormData;
}): Promise<ApiResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    const user: User = await getUserDataById(id, customerId);

    if (!user) {
      return {
        success: false,
        error: "Impossible de modifier l'utilisateur.",
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
      username: user.username,
      role: user.role,
    };

    const res = await apiClient.post(
      `/api/user/update/${customerId}/${id}`,
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
