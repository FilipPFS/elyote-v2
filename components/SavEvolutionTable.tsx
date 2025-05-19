"use client";

import { formatSavStatus } from "@/lib/utils";
import { SavEvolutionData } from "@/types";
import clsx from "clsx";
import { useFormatter } from "next-intl";

type Props = {
  savEvolution: SavEvolutionData[];
  savDate: string;
};

const SavEvolutionTable = ({ savEvolution, savDate }: Props) => {
  const format = useFormatter();

  console.log("SAV", savDate);

  return (
    <div className="flex flex-col text-sm md:text-[10px] gap-2 bg-gray-200 shadow-sm p-4 rounded-sm">
      <div className="flex items-center gap-3">
        <div className="font-bold text-gray-800 w-1/2 rounded uppercase bg-gray-300 p-2">
          Date
        </div>
        <div className="font-bold text-gray-800 w-1/2 rounded uppercase bg-gray-300 p-2">
          Status
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {savEvolution && savEvolution.length > 0 && (
          <>
            {savEvolution.map((item) => (
              <div key={item.id} className="flex flex-col gap-0.5">
                <div className="flex w-full gap-3 items-stretch">
                  <div
                    className={clsx(
                      "flex self-stretch items-center w-1/2 p-2 rounded shadow",
                      "bg-gray-100"
                    )}
                  >
                    {format.dateTime(new Date(item.created_at), "short")}
                  </div>
                  <div
                    className={clsx(
                      "flex self-stretch items-center w-1/2 p-2 rounded shadow",
                      formatSavStatus(String(item.status)).classNames
                    )}
                  >
                    {formatSavStatus(String(item.status)).key}
                  </div>
                </div>
                {item.details && (
                  <div
                    className={clsx(
                      "p-2 rounded shadow",
                      formatSavStatus(String(item.status)).classNames
                    )}
                  >
                    {item.details}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        <div className="flex w-full gap-3 items-stretch">
          <div
            className={clsx(
              "flex self-stretch items-center w-1/2 p-2 rounded shadow",
              "bg-gray-100"
            )}
          >
            {format.dateTime(new Date(savDate), "short")}
          </div>
          <div
            className={clsx(
              "flex self-stretch items-center w-1/2 p-2 rounded shadow",
              formatSavStatus(String(0)).classNames
            )}
          >
            {formatSavStatus(String(0)).key}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavEvolutionTable;
