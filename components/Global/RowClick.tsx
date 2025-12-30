"use client";

import React from "react";
import { Column } from "./ReusableTable";
import { useRouter } from "next/router";

type TableRowProps<T> = {
  row: T;
  rowIndex: number;
  columns: Column<T>[];
  link: string;
};

export default function TableRow<T extends object>({
  row,
  rowIndex,
  columns,
  link,
}: TableRowProps<T>) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (
      e.target instanceof HTMLTableCellElement ||
      e.target instanceof HTMLTableRowElement ||
      e.target instanceof HTMLDivElement
    ) {
      if (link) {
        router.push(link); // Smooth SPA navigation
      }
    }
  };

  return (
    <tr
      key={rowIndex}
      onClick={handleClick}
      className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
    >
      {columns.map((column) => (
        <td
          key={String(column.key)}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
        >
          {column.render
            ? column.render(row[column.key], row)
            : (row[column.key] as React.ReactNode)}
        </td>
      ))}
    </tr>
  );
}
