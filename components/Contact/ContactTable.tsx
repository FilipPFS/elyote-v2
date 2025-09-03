"use client";

import React, { useTransition } from "react";
import TableExample from "@/components/TableExample";
import FilterContact from "@/components/FilterContact";
import GoNextButton from "@/components/Global/GoNextButton";
import { useTranslations } from "next-intl";
import { tableHeader } from "@/types";
import { filterContactOptions } from "@/constants";

type Props = {
  tableBody: React.ReactNode;
  tableHeaders: tableHeader[];
  headerClassnames?: string;
  classNames?: string;
  translationsKey: string;
};

const ContactTable = ({
  tableBody,
  tableHeaders,
  translationsKey,
  headerClassnames,
  classNames,
}: Props) => {
  const tContacts = useTranslations("contacts");
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{tContacts("sortKey")}:</h2>
          <FilterContact
            keyString="category"
            translationKey="contacts.filterKeys"
            filterOptions={filterContactOptions}
            isPending={isPending}
            startTransition={startTransition}
          />
        </div>
        <GoNextButton label="Ajouter un contact" link="/repertoire/ajout" />
      </div>
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

export default ContactTable;
