import MainPage from "@/components/Mobile/MainPage";
import PrinterModal from "@/components/Printer/PrinterModal";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { printTableHeaders } from "@/constants";
import {
  getPrinterByModule,
  getPrintersList,
  getPrintHistory,
} from "@/lib/actions/printer.actions";
import { Computer, PrintHistory } from "@/types";
import { getFormatter, getTranslations } from "next-intl/server";
import React from "react";
import { CgPrinter } from "react-icons/cg";

const ParametresImprimantes = async () => {
  const printerOptions = await getPrinterByModule();

  console.log("PRINTER OPTIONS", printerOptions);

  const printerList: Computer[] = await getPrintersList();
  const printHistory: PrintHistory[] = await getPrintHistory();
  const format = await getFormatter();
  const t = await getTranslations("printer");

  return (
    <MainPage title={t("title")}>
      <div className="flex flex-col gap-5 mt-6">
        <h2 className="text-lg flex items-center gap-3 font-bold">
          <CgPrinter size={23} />
          {t("historyTitle")}
        </h2>
        <TableExample
          headerClassnames="text-[12px]"
          translationsKey="printer.tableHeaders"
          classNames="!block"
          tableHeaders={printTableHeaders}
          tableBody={
            <>
              {printHistory && printHistory.length > 0 ? (
                <>
                  {printHistory.map((item) => (
                    <TableRow
                      key={item.print_history_id}
                      className="text-[12px]"
                    >
                      <TableCell className="text-[12px]">
                        {item.computer_name}
                      </TableCell>
                      <TableCell>
                        <div className="truncate w-28">{item.printer_name}</div>
                      </TableCell>
                      {/* <TableCell>
                        <div className="truncate w-28">
                          {t(`frKeys.${item.module}`)}
                        </div>
                      </TableCell> */}
                      <TableCell>
                        <a
                          className="text-gray-500 transition-all duration-300 hover:text-gray-700 hover:underline"
                          href={item.file}
                        >
                          {t("view")}
                        </a>
                      </TableCell>
                      <TableCell>
                        {item.status === "done" && t("status.success")}
                        {item.status === "error" && t("status.error")}
                      </TableCell>
                      <TableCell>
                        {format.dateTime(new Date(item.created_at), "long")}
                      </TableCell>
                      <TableCell>
                        {format.dateTime(new Date(item.updated_at), "long")}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell>{t("noData")}</TableCell>
                  </TableRow>
                </>
              )}
            </>
          }
        />
      </div>
      <div className="flex flex-col gap-5 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg flex items-center gap-3 font-bold">
            <CgPrinter size={23} />
            {t("printerTitle")}
          </h2>
        </div>
        <div className="flex bg-white p-3 py-5 md:p-6 rounded-lg shadow flex-col gap-8 md:gap-4">
          {printerOptions &&
            Object.entries(printerOptions).map(([label, data]) => {
              return (
                <PrinterModal
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
