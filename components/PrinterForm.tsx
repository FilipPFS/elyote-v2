"use client";

import React, { useState } from "react";
import ElSelect from "./custom/ElSelect";
import { Computer, PrintSettings } from "@/types";
import ElButton from "./custom/ElButton";
import { updateDefaultPrinter } from "@/lib/actions/printer.actions";
import { toast } from "react-toastify";

const examplePaperOptions = ["A2", "A3", "A4", "A5"];
const orientationOptions = ["landscape", "portrait"];
const colorOptions = [
  { value: 0, label: "Auto" },
  { value: 1, label: "Couleur" },
  { value: 2, label: "Noir et blanc" },
];
const computerExample = {
  name: "FilipExample",
  printers: {
    BrotherPrint: {
      paperFormats: [
        "Lettre US (215,9 x 279,4 mm)",
        "Legal US",
        "A4",
        "A5",
        "B5 (JIS)",
      ],
      status: "Idle",
    },
    "Microsoft Print to PDF": {
      paperFormats: ["A3", "A4", "A5", "B4 (JIS)", "B5 (JIS)"],
      status: "Idle",
    },
  },
  settings: {
    print: true,
    web: false,
    copy: true,
  },
  notifications: {
    web: {
      sound: "2",
      show_message: true,
    },
    service: {
      sound: "4",
      show_message: false,
    },
  },
  last_seen: "1747405828.615",
  pc_status: "offline",
};

type Props = {
  label: string;
  data: PrintSettings | null;
  printerList: Computer[];
};

const PrinterForm = ({ label, data, printerList }: Props) => {
  const newPrinterList = [...printerList, computerExample];

  const [selectedPrinter, setSelectedPrinter] = useState<string | undefined>(
    data?.computer_name && data?.printer_name
      ? `${data.computer_name}|||${data.printer_name}`
      : undefined
  );

  const [values, setValues] = useState({
    format: data?.format || "",
    color: data?.color || "",
    orientation: data?.orientation || "",
    scale: "auto",
    side: "auto",
  });

  const paperOptions = (() => {
    if (!selectedPrinter) return examplePaperOptions;
    const [computerName, printerName] = selectedPrinter.split("|||");

    const computer = printerList.find((c) => c.name === computerName);
    const printer = computer?.printers?.[printerName];

    return printer?.paperFormats || examplePaperOptions;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPrinter) return;

    const [computerName, printerName] = selectedPrinter.split("|||");

    const dataToSend = {
      ...values,
      computer_name: computerName,
      printer_name: printerName,
      module: data?.option,
    };

    const res = await updateDefaultPrinter(dataToSend);

    if (res.success) {
      toast.success("Modifié avec succès.");
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="font-semibold">{label}</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-3"
      >
        <ElSelect
          defaultValue={selectedPrinter}
          onChange={(e) => setSelectedPrinter(e.target.value)}
        >
          {newPrinterList.map((item) => (
            <optgroup key={item.name} label={item.name}>
              {item.printers ? (
                Object.entries(item.printers).map(([printerName]) => {
                  return (
                    <option
                      key={printerName}
                      value={`${item.name}|||${printerName}`}
                    >
                      {printerName}
                    </option>
                  );
                })
              ) : (
                <option disabled>Aucune imprimante disponible</option>
              )}
            </optgroup>
          ))}
        </ElSelect>

        <ElSelect
          defaultValue={values.format}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, format: e.target.value }))
          }
        >
          {paperOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </ElSelect>

        <ElSelect
          defaultValue={values.color}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, color: e.target.value }))
          }
        >
          {colorOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </ElSelect>
        <ElSelect
          defaultValue={values.orientation}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, orientation: e.target.value }))
          }
        >
          {orientationOptions.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </ElSelect>
        <ElButton label="Enregistrer" classNames="px-4 md:w-fit w-full" />
      </form>
    </div>
  );
};

export default PrinterForm;
