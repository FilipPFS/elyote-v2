"use client";

import React, { useTransition } from "react";
import TableExample from "@/components/TableExample";
import FilterContact from "@/components/FilterContact";
import GoNextButton from "@/components/Global/GoNextButton";
import { useTranslations } from "next-intl";
import { tableHeader } from "@/types";
import { filterSavOptions } from "@/constants";
import { FiPlusCircle, FiSettings } from "react-icons/fi";

type Props = {
  tableBody: React.ReactNode;
  tableHeaders: tableHeader[];
  headerClassnames?: string;
  classNames?: string;
  translationsKey: string;
  savSuppliers: string[] | null | undefined;
};

const SavTable = ({
  tableBody,
  tableHeaders,
  translationsKey,
  headerClassnames,
  classNames,
  savSuppliers,
}: Props) => {
  const savTranslations = useTranslations("sav");
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          {savTranslations("filterKeys.title")}:
        </h2>
        <div className="flex md:flex-row flex-col gap-3 md:justify-between md:items-end">
          <div className="flex md:flex-row flex-col gap-2 md:gap-5">
            <div>
              <h3>{savTranslations("filterKeys.byStatus")}</h3>
              <FilterContact
                keyString="status"
                filterOptions={filterSavOptions}
                translationKey="sav.statuses"
                isPending={isPending}
                startTransition={startTransition}
              />
            </div>
            <div>
              <h3>{savTranslations("filterKeys.bySupplier")}</h3>
              <FilterContact
                keyString="supplier"
                oneKeyFilters={savSuppliers}
                isPending={isPending}
                startTransition={startTransition}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GoNextButton
              icon={<FiSettings />}
              label={savTranslations("manageStatusesBtn")}
              link="/profile/reglages/sav"
            />
            <GoNextButton
              icon={<FiPlusCircle />}
              label={savTranslations("addSavBtn")}
              link="/sav/ajout"
            />
          </div>
        </div>
      </section>
      <TableExample
        isPending={isPending}
        tableHeaders={tableHeaders}
        translationsKey={translationsKey}
        headerClassnames={headerClassnames}
        tableBody={tableBody}
        classNames={classNames}
      />
    </>
  );
};

export default SavTable;
