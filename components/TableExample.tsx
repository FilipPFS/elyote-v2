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
};

const TableExample = ({
  tableBody,
  tableHeaders,
  headerClassnames,
  translationsKey,
  classNames,
}: Props) => {
  const t = useTranslations(translationsKey);

  return (
    <div
      className={clsx(
        "hidden lg:block w-full overflow-auto border p-3 bg-white dark:bg-gray-800 rounded-lg shadow dark:border-gray-800",
        classNames
      )}
    >
      <Table className="bg-white dark:bg-gray-800 rounded-md">
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHead
                key={index}
                className={clsx("font-semibold", headerClassnames)}
              >
                <div
                  className={clsx("flex items-center gap-2", header.classNames)}
                >
                  {header.icon}
                  {t(`${header.label}`)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </div>
  );
};

export default TableExample;
