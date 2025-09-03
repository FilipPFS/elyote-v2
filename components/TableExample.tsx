"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import clsx from "clsx";
import { tableHeader } from "@/types";
import { useTranslations } from "next-intl";

type Props = {
  tableBody: React.ReactNode;
  tableHeaders: tableHeader[];
  headerClassnames?: string;
  translationsKey: string;
  classNames?: string;
  isPending?: boolean;
};

const TableExample = ({
  tableBody,
  tableHeaders,
  headerClassnames,
  translationsKey,
  classNames,
  isPending,
}: Props) => {
  const t = useTranslations(translationsKey);

  return (
    <div
      className={clsx(
        "hidden lg:block w-full overflow-auto border p-3 bg-white dark:bg-gray-800 rounded-lg shadow dark:border-gray-800",
        classNames
      )}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
          <span className="">Chargement...</span>
        </div>
      ) : (
        <Table className="bg-white text-base small:text-sm big:text-lg w-full dark:bg-gray-800 rounded-md">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  className={clsx("font-semibold", headerClassnames)}
                >
                  <div
                    className={clsx(
                      "flex items-center gap-2",
                      header.classNames
                    )}
                  >
                    {header.icon}
                    {t(`${header.label}`)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="font-medium weight:font-bold">
            {tableBody}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TableExample;
