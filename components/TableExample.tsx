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

type Props = {
  tableBody: React.ReactNode;
  tableHeaders: tableHeader[];
};

const TableExample = ({ tableBody, tableHeaders }: Props) => {
  return (
    <div>
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHead
                key={index}
                className={"font-semibold first:w-[150px] last:text-right"}
              >
                <div
                  className={clsx("flex items-center gap-2", header.classNames)}
                >
                  {header.icon}
                  {header.label}
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
