"use client";
import { useEffect, useState } from "react";

const ToggleSize = () => {
  const [sizeMode, setSizeMode] = useState(false);

  // Au chargement, lire la valeur dans localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sizeMode") === "true";
    setSizeMode(saved);
    if (saved) {
      document.documentElement.setAttribute("data-size", "on");
    } else {
      document.documentElement.removeAttribute("data-size");
    }
  }, []);

  const togglesize = () => {
    const newValue = !sizeMode;
    setSizeMode(newValue);

    if (newValue) {
      document.documentElement.setAttribute("data-size", "on");
    } else {
      document.documentElement.removeAttribute("data-size");
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("sizeMode", String(newValue));
  };

  return (
    <div>
      <button
        onClick={togglesize}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-950 transition-all duration-500 cursor-pointer"
      >
        Toggle size Mode
      </button>
      <p className="text-sm size:text-lg">Ceci change de taille 🚀</p>
    </div>
  );
};

export default ToggleSize;
