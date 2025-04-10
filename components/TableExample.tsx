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
};

const TableExample = ({ tableBody, tableHeaders, headerClassnames }: Props) => {
  const t = useTranslations("global.credentials");

  return (
    <div className="hidden lg:block bg-white p-3">
      <Table className="bg-white rounded-md">
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
                  {t(`headers.${header.label}`)}
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
