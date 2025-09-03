"use client";

import { navItems } from "@/constants";
import React, { createContext, useContext, useEffect, useState } from "react";

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

  // Load allowedIds from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("allowedIds");
    if (stored && stored.length > 0) {
      setAllowedIds(JSON.parse(stored));
    } else {
      setAllowedIds(navItems.map((item) => item.labelKey));
    }
  }, []);

  // Save allowedIds
  useEffect(() => {
    localStorage.setItem("allowedIds", JSON.stringify(allowedIds));
  }, [allowedIds]);

  // Load modes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("appModes");
    if (saved) {
      const parsed: Modes = JSON.parse(saved);
      setModes(parsed);
      applyModes(parsed);
    } else {
      applyModes(defaultModes);
    }
  }, []);

  const applyModes = (m: Modes) => {
    // Dark mode
    if (m.darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Weight mode
    if (m.weightMode)
      document.documentElement.setAttribute("data-weight", "on");
    else document.documentElement.removeAttribute("data-weight");

    // Size mode
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

    // Font
    document.documentElement.setAttribute("data-font", m.font);
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
  if (!context) {
    throw new Error(
      "useUserSettings must be used within a UserSettingsProvider"
    );
  }
  return context;
};
