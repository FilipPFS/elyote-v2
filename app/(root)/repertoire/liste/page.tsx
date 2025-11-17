import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import Search from "@/components/Search";
import { TableCell, TableRow } from "@/components/ui/table";
import { contactsTableHeaders } from "@/constants";
import {
  getContactByFilter,
  getContacts,
  getContactsFromQuery,
} from "@/lib/actions/actions.contacts";
import { accessLevel } from "@/lib/utils";
import { ContactData, SearchParamProps } from "@/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import TableRowCustom from "@/components/Table/TableRowCustom";
import ContactTable from "@/components/Contact/ContactTable";

const RepertoireListe = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  const query = (awaitedSearchParams.query as string) || "";
  const category = (awaitedSearchParams.category as string) || "";
  let contacts: ContactData[] = [];

  if (query) {
    const queryData = await getContactsFromQuery(query);
    if (queryData) {
      contacts = queryData.contacts;
    }
  } else if (category) {
    const filteredData = await getContactByFilter(category);
    if (filteredData) {
      contacts = filteredData.contacts;
    }
  } else {
    const data = await getContacts();
    if (data) {
      contacts = data.contacts;
    }
  }

  console.log("CONTACTS", contacts);

  const tCredentials = await getTranslations("credentials");
  const tContacts = await getTranslations("contacts");
  const tGlobal = await getTranslations("global.search");

  return (
    <MainPage
      title={tContacts("title")}
      headerElement={
        <Suspense fallback={null}>
          <Search
            component="identifiants"
            placeholder={tContacts("searchPlaceholder")}
            classNames="w-full sm:w-2/4"
          />
        </Suspense>
      }
    >
      {query.length > 1 && (
        <span className="text-gray-500 font-semibold">
          {tGlobal("result")} : {query}
        </span>
      )}
      <ContactTable
        tableHeaders={contactsTableHeaders}
        translationsKey="contacts.tableHeaders"
        headerClassnames="w-1/4"
        tableBody={
          <>
            {contacts && contacts.length > 0 ? (
              <>
                {contacts.map((item) => (
                  <TableRowCustom
                    key={item.id}
                    href={`/repertoire/liste/${item.id}`}
                  >
                    <TableCell className="font-medium">
                      {item.corporate_name}
                    </TableCell>
                    <TableCell>{item.firstname}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>
                      {tCredentials(
                        `accessLevel.${accessLevel(item.access_level)}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/repertoire/liste/${item.id}`}>
                        {tCredentials("seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>Données non disponibles.</TableCell>
              </TableRow>
            )}
          </>
        }
      />

      <div className="lg:hidden flex flex-col gap-3">
        {contacts && contacts.length > 0 ? (
          <>
            {contacts.map((item) => (
              <MobileCard key={item.id}>
                <div className="flex flex-col gap-3">
                  <section className="flex justify-between items-center">
                    <h2 className="font-semibold">{item.corporate_name}</h2>
                    <Link href={`/repertoire/liste/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between items-center">
                    <span>
                      {tContacts("tableHeaders.lastName")}:{" "}
                      <span className="font-semibold">{item.lastname}</span>
                    </span>
                    <span>
                      {tCredentials("access")}:{" "}
                      <span className="font-semibold">
                        {tCredentials(
                          `accessLevel.${accessLevel(item.access_level)}`
                        )}
                      </span>
                    </span>
                  </section>
                </div>
              </MobileCard>
            ))}
          </>
        ) : (
          <>
            <p>Données non disponibles.</p>
          </>
        )}
      </div>
    </MainPage>
  );
};

export default RepertoireListe;
