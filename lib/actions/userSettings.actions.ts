"use server";

import { Modes } from "@/components/Interface/ToggleModes";
import { apiClient } from "../axios";
import { getStoreCode, getToken } from "./actions.global";
import { MenuKeys, UserMenuSettings } from "@/types";

export const getUserSettings = async () => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(
      `/api/v1/users_settings?customer_id=${storeCode}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status === 200) {
      const style: UserMenuSettings = res.data.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_interface"
      );

      if (style) {
        return JSON.parse(style.value);
      }
    } else {
      return null;
    }
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const addUserSettings = async (settings: Modes) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();
    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    let res;
    try {
      res = await apiClient.get(
        `/api/v1/users_settings?customer_id=${storeCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      client_type: "bv",
    };

    if (res) {
      const style = res.data.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_interface"
      );

      if (!style) {
        res = null;
      }
    }

    if (!res) {
      // create because settings don't exist
      const response = await apiClient.post(
        `/api/v1/users_settings?customer_id=${storeCode}`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response.status);

      if (response.status === 201) {
        return { success: true };
      }
    } else {
      // update existing
      const style = res.data.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_interface"
      );

      console.log("STYLE ID", style.id);

      const response = await apiClient.patch(
        `/api/v1/users_settings/${style.id}?customer_id=${storeCode}`,
        postData,
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

export const deleteUserSettings = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.log("Unauthorized.");
      return null;
    }

    const userSettings = await getUserSettings();

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

export const getUserMenu = async () => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();

    if (!token || !storeCode) {
      console.log("Unauthorized.");
      return null;
    }

    const res = await apiClient.get(
      `/api/v1/users_settings?customer_id=${storeCode}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status === 200) {
      const menu: UserMenuSettings = res.data.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_module"
      );

      if (menu) {
        return JSON.parse(menu.value);
      }
    } else {
      return null;
    }
  } catch (error) {
    // handleError(error);
    console.log(error);
    return null;
  }
};

export const addUserMenu = async (menuSettings: Record<MenuKeys, boolean>) => {
  try {
    const token = await getToken();
    const storeCode = await getStoreCode();
    if (!token || !storeCode) {
      console.log("Unauthorized.");
      return null;
    }

    let res;
    try {
      res = await apiClient.get(
        `/api/v1/users_settings?customer_id=${storeCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      value: JSON.stringify(menuSettings),
      client_type: "bv",
    };

    if (res) {
      const menu = res.data.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_module"
      );

      if (!menu) {
        res = null;
      }
    }

    if (!res) {
      // create because settings don't exist
      const response = await apiClient.post(
        `/api/v1/users_settings?customer_id=${storeCode}`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        return { success: true };
      }
    } else {
      // update existing
      const menu: UserMenuSettings = res.data.user_settings.find(
        (item: UserMenuSettings) => item.type === "custom_module"
      );

      const response = await apiClient.patch(
        `/api/v1/users_settings/${menu.id}?customer_id=${storeCode}`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
