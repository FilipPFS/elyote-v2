import React from "react";
import { Column } from "@/components/Global/ReusableTable";
import Link from "next/link";
import { ServiceClient } from "@/app/(root)/cartes-copies/liste/page";

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowId?: (row: T) => string | number;
  href: string;
};

function MobileTableCard<T extends ServiceClient>({
  data,
  columns,
  href,
}: Props<T>) {
  if (!data.length) {
    return (
      <div className="text-center block md:hidden text-xs text-gray-500 dark:text-gray-400 py-4">
        Aucune donnée
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 md:hidden">
      {data.map((row, index) => (
        <Link
          href={`${href}/${row.id}`}
          key={index}
          className="
            rounded-md border
            bg-white dark:bg-gray-900
            border-gray-200 dark:border-gray-700
            px-3 py-2
          "
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {columns.map((column) => {
              const value = row[column.key];

              if (value === null || value === undefined) return null;

              return (
                <div key={String(column.key)} className="flex flex-col">
                  {/* Label */}
                  <span className="text-[11px] leading-tight text-gray-500 dark:text-gray-400">
                    {column.header}
                  </span>

                  {/* Value */}
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MobileTableCard;
