"use client";

import React, { useState } from "react";
import Modal from "../Global/Modal";
import clsx from "clsx";

type Props = {
  new_data: Record<string, string | number | null>;
  old_data: Record<string, string | number | null>;
};

const getChangedFields = (
  oldData: Record<string, string | number | null>,
  newData: Record<string, string | number | null>
) => {
  return Object.keys(newData).filter((key) => oldData[key] !== newData[key]);
};

const ClientHistoryModal = ({ new_data, old_data }: Props) => {
  const [open, setOpen] = useState(false);

  const changedFields = getChangedFields(old_data, new_data);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="
    inline-flex items-center gap-2
    rounded-md px-3 py-0.5
    text-xs font-medium
    text-blue-700 dark:text-blue-400
    bg-blue-50 dark:bg-blue-900/30
    border border-blue-200 dark:border-blue-800
    hover:bg-blue-100 dark:hover:bg-blue-900/50
    transition-colors cursor-pointer
  "
      >
        Client modifié
        <span className="underline text-[11px]">(voir)</span>
      </button>

      <Modal visible={open} setVisible={setOpen}>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Modifications client</h3>

          {changedFields.length === 0 && (
            <p className="text-sm text-gray-500">
              Aucune modification détectée
            </p>
          )}

          {changedFields.map((key) => {
            console.log("KEY", typeof old_data[key]);

            return (
              <div
                key={key}
                className="flex md:flex-row flex-col md:items-center justify-between gap-2 md:gap-4 text-sm"
              >
                <span className="font-medium capitalize">
                  {key.replace("_", " ")}
                </span>
                <div className="w-full h-px block bg-blue-500 opacity-10" />
                <div className="flex gap-2 items-center">
                  <span
                    className={clsx(
                      "text-red-500",
                      old_data[key] && "line-through"
                    )}
                  >
                    {String(
                      old_data[key] === "" || old_data[key] == null
                        ? "/"
                        : old_data[key]
                    )}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="text-green-600 font-semibold">
                    {String(
                      new_data[key] === "" || new_data[key] == null
                        ? "null"
                        : new_data[key]
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ClientHistoryModal;
