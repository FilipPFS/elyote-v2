"use client";

import React, { useState } from "react";

const PRESET_VALUES = [50, 100, 200, 500, 1000, 2000, 5000];

type Props = {
  name: string;
};

const BalanceSelect = ({ name }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | "">("");
  const [customValue, setCustomValue] = useState("");

  const handleSelect = (val: number) => {
    setValue(val);
    setCustomValue("");
    setOpen(false);
  };

  const handleCustomAdd = () => {
    const num = Number(customValue);
    if (!num || num <= 0) return;

    setValue(num);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* HIDDEN INPUT FOR FORM SUBMIT */}
      <input type="hidden" name={name} value={value} />

      {/* SELECT DISPLAY */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full p-2 rounded-md border text-left
          bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
      >
        {value || "Sélectionner un solde"}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="absolute z-10 mt-1 w-full rounded-md border shadow-md
          bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
        >
          {/* PRESET VALUES */}
          <ul className="max-h-48 overflow-y-auto">
            {PRESET_VALUES.map((amount) => (
              <li
                key={amount}
                onClick={() => handleSelect(amount)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {amount}
              </li>
            ))}
          </ul>

          {/* CUSTOM INPUT */}
          <div className="flex gap-2 p-2 border-t dark:border-gray-700">
            <input
              type="number"
              placeholder="Autre montant"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="flex-1 p-2 rounded-md border
                bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
            <button
              type="button"
              onClick={handleCustomAdd}
              className="px-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceSelect;
