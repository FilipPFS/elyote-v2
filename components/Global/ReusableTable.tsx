import Link from "next/link";
import React from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  link?: string;
  rowId?: (row: T) => string | number; // 🔥 Added: safely get an ID for links
};

export default function ReusableTable<T>({
  data,
  columns,
  className,
  link,
  rowId,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500 dark:text-gray-400">
        Aucune donnée
      </p>
    );
  }

  return (
    <div className={`md:block hidden overflow-x-auto ${className || ""}`}>
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 whitespace-nowrap text-sm transition-all hover:underline text-gray-900 dark:text-gray-100"
                >
                  {rowId && link ? (
                    <Link href={`/${link}/${rowId(row)}`}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : (row[column.key] as React.ReactNode)}
                    </Link>
                  ) : (
                    <span>
                      {column.render
                        ? column.render(row[column.key], row)
                        : (row[column.key] as React.ReactNode)}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
