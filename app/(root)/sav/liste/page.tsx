import FilterContact from "@/components/FilterContact";
import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import Search from "@/components/Search";
import TableRowCustom from "@/components/Table/TableRowCustom";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { filterSavOptions, savTableHeaders } from "@/constants";
import {
  getSavs,
  getSavsByFilter,
  getSavsByQuery,
  getSavSuppliers,
} from "@/lib/actions/actions.sav";
import { formatSavStatus } from "@/lib/utils";
import { SavData, SearchParamProps } from "@/types";
import clsx from "clsx";
import { getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Sav = async ({ searchParams }: SearchParamProps) => {
  let savs: SavData[] | [] = [];
  const format = await getFormatter();
  const awaitedSearchParams = await searchParams;
  const query = (awaitedSearchParams.query as string) || "";
  const supplier = (awaitedSearchParams.supplier as string) || "";
  const status = (awaitedSearchParams.status as string) || "";
  const savSuppliers = await getSavSuppliers();
  const savTranslations = await getTranslations("sav");

  if (query) {
    const savData: { savs: SavData[] } = await getSavsByQuery(query);
    savs = savData?.savs;
  } else if (supplier || status) {
    const filteredData: { sav: SavData[] } = await getSavsByFilter({
      supplier,
      status,
    });

    savs = filteredData?.sav;
  } else {
    const savData: { sav: SavData[] } = await getSavs();
    savs = savData?.sav;
  }

  return (
    <MainPage
      title={savTranslations("title")}
      headerElement={
        <Suspense fallback={null}>
          <Search
            component="identifiants"
            placeholder={savTranslations("searchPlaceholder")}
            classNames="w-full sm:w-2/4"
          />
        </Suspense>
      }
    >
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          {savTranslations("filterKeys.title")}:
        </h2>
        <div className="flex md:flex-row flex-col gap-2 md:gap-5">
          <div>
            <h3>{savTranslations("filterKeys.byStatus")}</h3>
            <FilterContact
              keyString="status"
              filterOptions={filterSavOptions}
              translationKey="sav.statues"
            />
          </div>
          <div>
            <h3>{savTranslations("filterKeys.bySupplier")}</h3>
            <FilterContact keyString="supplier" oneKeyFilters={savSuppliers} />
          </div>
        </div>
      </section>
      {query.length > 1 && (
        <span className="text-gray-500 font-semibold">
          Résultat pour: {query}
        </span>
      )}
      <TableExample
        translationsKey="sav.tableHeaders"
        tableHeaders={savTableHeaders}
        classNames="!block"
        tableBody={
          <>
            {savs && savs.length > 0 ? (
              <>
                {savs.map((item) => (
                  <TableRowCustom key={item.id} href={`/sav/liste/${item.id}`}>
                    <TableCell className="font-medium">{item.client}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.updated_at), "long")}
                    </TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.created_at), "long")}
                    </TableCell>
                    <TableCell
                      className={formatSavStatus(item.status).classNames}
                    >
                      {savTranslations(
                        `statues.${formatSavStatus(item.status).key}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/sav/liste/${item.id}`}>
                        {savTranslations("seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>Données non disponibles.</TableCell>
                </TableRow>
              </>
            )}
          </>
        }
      />

      <div className="lg:hidden flex flex-col gap-3">
        {savs && savs.length > 0 ? (
          <>
            {savs.map((item) => (
              <MobileCard key={item.id}>
                <div className="flex flex-col gap-4">
                  <section className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold">{item.client}</h2>
                      <small
                        className={clsx(
                          formatSavStatus(item.status).classNames,
                          "rounded-sm py-0.5 px-2"
                        )}
                      >
                        {savTranslations(
                          `statues.${formatSavStatus(item.status).key}`
                        )}
                      </small>
                    </div>
                    <Link href={`/sav/liste/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <small>
                        {savTranslations("tableHeaders.supplier")}:{" "}
                        <span className="font-semibold">{item.supplier}</span>
                      </small>
                      <small>
                        {savTranslations("tableHeaders.product")}:{" "}
                        <span className="font-semibold">{item.product}</span>
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <small>
                        {savTranslations("tableHeaders.updated")} :{" "}
                        <span className="font-semibold">
                          {" "}
                          {format.dateTime(new Date(item.updated_at), "long")}
                        </span>
                      </small>

                      <small>
                        {savTranslations("tableHeaders.created")} :{" "}
                        <span className="font-semibold">
                          {" "}
                          {format.dateTime(new Date(item.created_at), "long")}
                        </span>
                      </small>
                    </div>
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

export default Sav;
