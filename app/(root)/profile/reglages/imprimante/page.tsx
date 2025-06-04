import ElButton from "@/components/custom/ElButton";
import MainPage from "@/components/Mobile/MainPage";
import PrinterForm from "@/components/PrinterForm";
import {
  getPrinterByModule,
  getPrintersList,
} from "@/lib/actions/printer.actions";
import { Computer } from "@/types";
import Link from "next/link";
import React from "react";

const ParametresImprimantes = async () => {
  const printerOptions = await getPrinterByModule("common");
  const printerList: Computer[] = await getPrintersList();

  console.log("Printer", printerOptions);
  console.log("Printer List", printerList);

  return (
    <MainPage title="Historique et réglages de l'impression directe">
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Imprimantes par défaut</h2>
          <Link href={"/profile/reglages/imprimante/ajout"}>
            <ElButton label="Ajouter une imprimante" classNames="px-4 !h-8" />
          </Link>
        </div>
        <div className="flex flex-col gap-8 md:gap-3 mt-4">
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
