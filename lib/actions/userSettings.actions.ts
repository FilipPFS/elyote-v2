"use server";

import { Modes } from "@/components/Interface/ToggleModes";
import { apiClient } from "../axios";
import { getToken } from "./actions.global";

export const getUserSettings = async (id: number) => {
  try {
    const token = await getToken();

    console.log("TOKEN", token);

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/style/read-one/127/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      return JSON.parse(res.data.value);
    } else {
      return null;
    }
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const addUserSettings = async (id: number, settings: Modes) => {
  try {
    const token = await getToken();
    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    let res;
    try {
      res = await apiClient.get(`/api/style/read-one/127/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { status?: number } };
        if (axiosErr.response?.status === 404) {
          res = null; // user settings don't exist
        } else {
          throw err;
        }
      } else {
        throw err; // Not an Axios error
      }
    }

    const postData = {
      name: "style",
      type: "custom_interface",
      value: JSON.stringify(settings),
      id_user: id,
      client_type: "bv",
    };

    if (!res) {
      // create because settings don't exist
      const response = await apiClient.post(
        `/api/style/create/127/${id}`,
        { data: postData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response.status);

      if (response.status === 201) {
        return { success: true };
      }
    } else {
      // update existing
      const updateData = { ...postData, id: res.data.id };
      const response = await apiClient.post(
        `/api/style/update/127/${res.data.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response.status);

      if (response.status === 200) {
        console.log("success is true");

        return { success: true };
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUserSettings = async (userId: number) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const userSettings = await getUserSettings(userId);

    if (!userSettings) return null;

    const res = await apiClient.get(`/api/style/delete/${userSettings.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      return { success: true };
    } else {
      return null;
    }
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const getUserMenu = async (id: number) => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(`/api/module/read-one/127/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      console.log("MENU", JSON.parse(res.data.value));
      return JSON.parse(res.data.value);
    } else {
      return null;
    }
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const addUserMenu = async (id: number, settings: string[]) => {
  try {
    const token = await getToken();
    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    let res;
    try {
      res = await apiClient.get(`/api/module/read-one/127/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { status?: number } };
        if (axiosErr.response?.status === 404) {
          res = null; // user settings don't exist
        } else {
          throw err;
        }
      } else {
        throw err; // Not an Axios error
      }
    }

    const postData = {
      name: "module",
      type: "custom_module",
      value: JSON.stringify(settings),
      id_user: id,
      client_type: "bv",
    };

    console.log("RES DATA", res?.data);

    if (!res) {
      // create because settings don't exist
      const response = await apiClient.post(
        `/api/module/create/127/${id}`,
        { data: postData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response.status);

      if (response.status === 201) {
        return { success: true };
      }
    } else {
      // update existing
      const updateData = { ...postData, id: res.data.id };

      console.log("UPDATE DATA", updateData);

      const response = await apiClient.post(
        `/api/module/update/127/${res.data.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response.status);

      if (response.status === 200) {
        console.log("success is true");

        return { success: true };
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
