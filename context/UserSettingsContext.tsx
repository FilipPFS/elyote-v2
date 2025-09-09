"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Modes = {
  darkMode: boolean;
  weightMode: boolean;
  sizeMode: "normal" | "small" | "big";
  font: "poppins" | "inter" | "roboto";
};

export const defaultModes: Modes = {
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
  initializeSettings: (settings: Modes, ids: string[]) => void; // 👈 ajout
  saveStyleSettings: (settings: Modes) => void;
  saveMenuSettings: (ids: string[]) => void; // 👈 ajout
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

  // Charger depuis localStorage au démarrage (pas d’appel API !)
  useEffect(() => {
    const storedModes = localStorage.getItem("appModes");
    const storedIds = localStorage.getItem("allowedIds");

    if (storedModes) {
      const parsedModes: Modes = JSON.parse(storedModes);
      setModes(parsedModes);
      applyModes(parsedModes);
    }

    if (storedIds) {
      setAllowedIds(JSON.parse(storedIds));
    }
  }, []);

  const applyModes = (m: Modes) => {
    document.documentElement.classList.toggle("dark", m.darkMode);
    document.documentElement.setAttribute(
      "data-weight",
      m.weightMode ? "on" : ""
    );
    document.documentElement.setAttribute("data-font", m.font);

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
  };

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

  // 👇 appelée uniquement après le login
  const initializeSettings = (settings: Modes, ids: string[]) => {
    setModes(settings);
    applyModes(settings);
    setAllowedIds(ids);

    localStorage.setItem("appModes", JSON.stringify(settings));
    localStorage.setItem("allowedIds", JSON.stringify(ids));
  };

  const saveStyleSettings = (settings: Modes) => {
    setModes(settings);
    applyModes(settings);

    localStorage.setItem("appModes", JSON.stringify(settings));
  };

  const saveMenuSettings = (ids: string[]) => {
    setAllowedIds(ids);
    localStorage.setItem("allowedIds", JSON.stringify(ids));
  };

  return (
    <UserSettingsContext.Provider
      value={{
        allowedIds,
        setAllowedIds,
        modes,
        toggleMode,
        changeFont,
        changeSize,
        initializeSettings,
        saveMenuSettings,
        saveStyleSettings,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error(
      "useUserSettings must be used within a UserSettingsProvider"
    );
  }
  return context;
};
