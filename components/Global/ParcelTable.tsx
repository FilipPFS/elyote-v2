"use client";

import React, { useTransition } from "react";
import TableExample from "@/components/TableExample";
import FilterContact from "@/components/FilterContact";
import GoNextButton from "@/components/Global/GoNextButton";
import { FaArrowRight } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { tableHeader } from "@/types";

type Props = {
  tableBody: React.ReactNode;
  tableHeaders: tableHeader[];
  headerClassnames: string;
  translationsKey: string;
};

const ParcelTable = ({
  tableBody,
  tableHeaders,
  translationsKey,
  headerClassnames,
}: Props) => {
  const t = useTranslations("parcels");
  const [isPending, startTransition] = useTransition();

  const filterStatusOptions = [
    {
      label: t("statuses.all"),
      filterKey: "all",
    },
    {
      label: t("statuses.stored"),
      filterKey: "0",
    },
    {
      label: t("statuses.shipped"),
      filterKey: "1",
    },
  ];

  const filterTypeOptions = [
    {
      label: t("statuses.all"),
      filterKey: "all",
    },
    {
      label: "Pick&Collect",
      filterKey: "drive",
    },
    {
      label: "Commande",
      filterKey: "cmd",
    },
    {
      label: "Commande RDC",
      filterKey: "cmd-rdc",
    },
  ];

  return (
    <>
      <div className="flex relative sm:flex-row flex-col gap-3 sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex md:flex-row flex-col md:items-center gap-2">
            <h2 className="font-semibold">{t("filterStatus")}</h2>
            <FilterContact
              keyString="status"
              filterOptions={filterStatusOptions}
              startTransition={startTransition}
              isPending={isPending}
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-2">
            <h2 className="font-semibold">{t("filterType")}</h2>
            <FilterContact
              keyString="type"
              filterOptions={filterTypeOptions}
              startTransition={startTransition}
              isPending={isPending}
            />
          </div>
        </div>
        <GoNextButton
          label={t("addLink")}
          link="/cmd/colis/ajout"
          icon={<FaArrowRight />}
        />
      </div>
      <TableExample
        isPending={isPending}
        tableHeaders={tableHeaders}
        translationsKey={translationsKey}
        headerClassnames={headerClassnames}
        tableBody={tableBody}
      />
    </>
  );
};

export default ParcelTable;
