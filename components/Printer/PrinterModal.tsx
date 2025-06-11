"use client";

import React, { useState, useEffect } from "react";
import { Computer, PrintSettings } from "@/types";
import ElButton from "../custom/ElButton";
import { updateDefaultPrinter } from "@/lib/actions/printer.actions";
import { toast } from "react-toastify";
import clsx from "clsx";
import { IoCloseCircleOutline } from "react-icons/io5";
import CustomSpinner from "../custom/Spinner";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import PrinterSelects from "./PrinterSelects";

type Props = {
  label: string;
  data: PrintSettings | null;
  printerList: Computer[];
};

const PrinterModal = ({ label, data, printerList }: Props) => {
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedPrinter, setSelectedPrinter] = useState<string | undefined>(
    data?.computer_name && data?.printer_name
      ? `${data.computer_name}|||${data.printer_name}`
      : undefined
  );

  const [values, setValues] = useState({
    format: data?.format || "",
    color: String(data?.color) || "",
    orientation: data?.orientation || "",
    scale: "auto",
    side: "auto",
  });

  // Sync state with props when they change
  useEffect(() => {
    if (data?.computer_name && data?.printer_name) {
      setSelectedPrinter(`${data.computer_name}|||${data.printer_name}`);
    } else {
      setSelectedPrinter(undefined);
    }

    setValues({
      format: data?.format || "",
      color: String(data?.color) || "",
      orientation: data?.orientation || "",
      scale: "auto",
      side: "auto",
    });
  }, [data, printerList]); // Run when data or printerList changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedPrinter) {
      toast.error("Veuillez séléctionnez une imprimante.");
      setIsSubmitting(false);
      return;
    }

    const [computerName, printerName] = selectedPrinter.split("|||");

    if (!values.color || !values.orientation || !values.format) {
      setIsSubmitting(false);
      toast.error("Veuillez séléctionnez une option pour chaque choix.");
      return;
    }

    const dataToSend = {
      ...values,
      computer_name: computerName,
      printer_name: printerName,
      module: data?.option,
    };

    const res = await updateDefaultPrinter(dataToSend);

    if (res.success) {
      setIsSubmitting(false);
      toast.success("Modifié avec succès.");
    }
  };

  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3  bg-blue-50 truncate px-4 py-1 rounded-full ">
          <span>
            <MdOutlineInsertPageBreak />
          </span>
          <h3 className="font-semibold truncate max-md:text-sm">{label}</h3>
        </div>
        <button
          className="flex items-center cursor-pointer gap-1.5 md:gap-3 bg-blue-50 px-4 py-1 rounded-full"
          onClick={() => setVisible((prev) => !prev)}
        >
          <small className="font-semibold md:block hidden">Modifier</small>
          <FaEdit className="md:hidden block" />
          <FiPlusCircle
            size={20}
            className={clsx(
              "cursor-pointer transform transition-all duration-500",
              visible && "-rotate-45"
            )}
          />
        </button>
      </div>
      <div
        className={clsx(
          "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out",
          isMounted ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={clsx(
            "fixed inset-0 bg-white/70 transition-opacity duration-300 ease-in-out",
            isMounted ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setVisible(false)}
        />
        {isMounted && (
          <div
            className={clsx(
              "relative bg-white p-6 rounded-lg shadow-lg border-2 border-gray-100 w-[95%] md:w-4/5 transition-all duration-300 ease-in-out transform",
              visible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 id="modal-title" className="font-bold">
                  {label}
                </h3>
                <button
                  className="cursor-pointer"
                  onClick={() => setVisible(false)}
                >
                  <IoCloseCircleOutline size={20} />
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row w-full items-center gap-3"
              >
                <PrinterSelects
                  selectedPrinter={selectedPrinter}
                  setSelectedPrinter={setSelectedPrinter}
                  values={values}
                  setValues={setValues}
                  printerList={printerList}
                />
                <div className="flex flex-col gap-1">
                  <h4 className="opacity-0 md:block hidden">Imprimante</h4>
                  <ElButton
                    disabled={isSubmitting}
                    icon={isSubmitting ? <CustomSpinner /> : undefined}
                    label="Enregistrer"
                    classNames="px-4 md:w-fit w-full"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrinterModal;
