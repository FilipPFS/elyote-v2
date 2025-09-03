"use client";

import { navItems } from "@/constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type Modes = {
  darkMode: boolean;
  weightMode: boolean;
  sizeMode: "normal" | "small" | "big";
  font: "poppins" | "inter" | "roboto";
};

const defaultModes: Modes = {
  darkMode: false,
  weightMode: false,
  sizeMode: "normal",
  font: "poppins",
};

type UserSettingsContextType = {
  allowedIds: string[];
  setAllowedIds: React.Dispatch<React.SetStateAction<string[]>>;
  modes: Modes;
  toggleMode: (key: keyof Omit<Modes, "font" | "sizeMode">) => void;
  changeFont: (font: Modes["font"]) => void;
  changeSize: (size: Modes["sizeMode"]) => void;
};

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(
  undefined
);

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allowedIds, setAllowedIds] = useState<string[]>([]);
  const [modes, setModes] = useState<Modes>(defaultModes);
  const [loading, setLoading] = useState(true);

  const applyModes = (m: Modes) => {
    if (m.darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    if (m.weightMode)
      document.documentElement.setAttribute("data-weight", "on");
    else document.documentElement.removeAttribute("data-weight");

    if (m.sizeMode === "big") {
      document.documentElement.setAttribute("data-big", "on");
      document.documentElement.removeAttribute("data-small");
    } else if (m.sizeMode === "small") {
      document.documentElement.setAttribute("data-small", "on");
      document.documentElement.removeAttribute("data-big");
    } else {
      document.documentElement.removeAttribute("data-big");
      document.documentElement.removeAttribute("data-small");
    }

    document.documentElement.setAttribute("data-font", m.font);
  };

  // Fetch user settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/user-settings"); // replace with your PHP endpoint
        const data = response.data;

        // Example response: { allowedIds: [...], modes: { darkMode: true, ... } }

        const fetchedAllowedIds =
          data.allowedIds || navItems.map((item) => item.labelKey);
        const fetchedModes = data.modes || defaultModes;

        setAllowedIds(fetchedAllowedIds);
        setModes(fetchedModes);

        // Save to localStorage
        localStorage.setItem("allowedIds", JSON.stringify(fetchedAllowedIds));
        localStorage.setItem("appModes", JSON.stringify(fetchedModes));

        // Apply modes to document
        applyModes(fetchedModes);
      } catch (err) {
        console.error("Failed to load user settings:", err);
        // fallback to localStorage or defaults
        const storedIds = localStorage.getItem("allowedIds");
        if (storedIds) setAllowedIds(JSON.parse(storedIds));
        else setAllowedIds(navItems.map((item) => item.labelKey));

        const storedModes = localStorage.getItem("appModes");
        if (storedModes) {
          const parsedModes = JSON.parse(storedModes);
          setModes(parsedModes);
          applyModes(parsedModes);
        } else applyModes(defaultModes);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const toggleMode = (key: keyof Omit<Modes, "font" | "sizeMode">) => {
    const newModes = { ...modes, [key]: !modes[key] };
    setModes(newModes);
    applyModes(newModes);
    localStorage.setItem("appModes", JSON.stringify(newModes));
  };

  const changeFont = (font: Modes["font"]) => {
    const newModes = { ...modes, font };
    setModes(newModes);
    applyModes(newModes);
    localStorage.setItem("appModes", JSON.stringify(newModes));
  };

  const changeSize = (size: Modes["sizeMode"]) => {
    const newModes = { ...modes, sizeMode: size };
    setModes(newModes);
    applyModes(newModes);
    localStorage.setItem("appModes", JSON.stringify(newModes));
  };

  if (loading) return null; // or a loading spinner

  return (
    <UserSettingsContext.Provider
      value={{
        allowedIds,
        setAllowedIds,
        modes,
        toggleMode,
        changeFont,
        changeSize,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context)
    throw new Error(
      "useUserSettings must be used within a UserSettingsProvider"
    );
  return context;
};
