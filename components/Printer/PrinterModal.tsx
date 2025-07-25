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
import { useTranslations } from "next-intl";
import Modal from "../Global/Modal";

type Props = {
  label: string;
  data: PrintSettings | null;
  printerList: Computer[];
};

const PrinterModal = ({ data, printerList }: Props) => {
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("printer");
  const tGlobal = useTranslations("global");

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
      toast.error(t("printerError"));
      setIsSubmitting(false);
      return;
    }

    const [computerName, printerName] = selectedPrinter.split("|||");

    if (!values.color || !values.orientation || !values.format) {
      setIsSubmitting(false);
      toast.error(t("errorMsg"));
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
      toast.success(tGlobal("notifications.updateSuccess"));
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 bg-blue-50 truncate px-4 py-1 rounded-full ">
          <div className="flex items-center gap-2">
            <span>
              <MdOutlineInsertPageBreak />
            </span>
            <h3 className="font-semibold truncate max-md:text-sm">
              {t(`frKeys.${data?.option}`)}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {selectedPrinter ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <small>{selectedPrinter?.split("|||")[1]}</small>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <small>{t("noPrinterAvailable")}</small>
              </>
            )}
          </div>
        </div>
        <button
          className="flex items-center cursor-pointer gap-1.5 md:gap-3 bg-blue-50 px-4 py-1 rounded-full"
          onClick={() => setVisible((prev) => !prev)}
        >
          <small className="font-semibold md:block hidden">
            {t("modal.editBtn")}
          </small>
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
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 id="modal-title" className="font-bold">
              {t(`frKeys.${data?.option}`)}
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
              <h4 className="md:block text-sm opacity-0 hidden">Imprimante</h4>
              <ElButton
                disabled={isSubmitting}
                icon={isSubmitting ? <CustomSpinner /> : undefined}
                label={t("modal.saveBtn")}
                classNames="px-4 !h-8 md:w-fit w-full"
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PrinterModal;
