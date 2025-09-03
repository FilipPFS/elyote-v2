"use client";
import { useEffect, useState } from "react";

const ToggleWeight = () => {
  const [weightMode, setWeightMode] = useState(false);

  // Au chargement, lire la valeur dans localStorage
  useEffect(() => {
    const saved = localStorage.getItem("weightMode") === "true";
    setWeightMode(saved);
    if (saved) {
      document.documentElement.setAttribute("data-weight", "on");
    } else {
      document.documentElement.removeAttribute("data-weight");
    }
  }, []);

  const toggleWeight = () => {
    const newValue = !weightMode;
    setWeightMode(newValue);

    if (newValue) {
      document.documentElement.setAttribute("data-weight", "on");
    } else {
      document.documentElement.removeAttribute("data-weight");
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("weightMode", String(newValue));
  };

  return (
    <div>
      <button
        onClick={toggleWeight}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-950 transition-all duration-500 cursor-pointer"
      >
        Toggle Weight Mode
      </button>
      <p className="text-sm weight:text-lg">Ceci change de taille 🚀</p>
    </div>
  );
};

export default ToggleWeight;
