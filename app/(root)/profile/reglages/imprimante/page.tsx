import MainPage from "@/components/Mobile/MainPage";
import PrinterForm from "@/components/PrinterForm";
import {
  getPrinterByModule,
  getPrintersList,
} from "@/lib/actions/printer.actions";
import { Computer } from "@/types";
import React from "react";
import { CgPrinter } from "react-icons/cg";

const ParametresImprimantes = async () => {
  const printerOptions = await getPrinterByModule();
  const printerList: Computer[] = await getPrintersList();

  console.log("Printer", printerOptions);
  console.log("Printer List", printerList);

  return (
    <MainPage title="Historique et réglages de l'impression directe">
      <div className="flex flex-col gap-5 mt-1 bg-white rounded-md p-3 md:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg flex items-center gap-3 font-bold">
            <CgPrinter size={23} />
            Imprimantes par défaut
          </h2>
        </div>
        <div className="w-full bg-gray-700 h-[1.5px]" />
        <div className="flex flex-col gap-8 md:gap-4">
          {printerOptions &&
            Object.entries(printerOptions).map(([label, data]) => {
              return (
                <PrinterForm
                  key={label}
                  label={label}
                  data={data}
                  printerList={printerList}
                />
              );
            })}
        </div>
      </div>
    </MainPage>
  );
};

export default ParametresImprimantes;
