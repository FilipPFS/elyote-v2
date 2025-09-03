import Pagination from "@/components/Global/Pagination";
import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import SavTable from "@/components/Sav/SavTable";
import Search from "@/components/Search";
import TableRowCustom from "@/components/Table/TableRowCustom";
import { TableCell, TableRow } from "@/components/ui/table";
import { savTableHeaders } from "@/constants";
import {
  getCustomStatuses,
  getSavs,
  getSavsByFilter,
  getSavsByQuery,
  getSavSuppliers,
} from "@/lib/actions/actions.sav";
import { formatSavStatus } from "@/lib/utils";
import { CustomSavStatus, SavData, SearchParamProps } from "@/types";
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
  const page = Number(awaitedSearchParams.page) || 1;
  const supplier = (awaitedSearchParams.supplier as string) || "";
  const status = (awaitedSearchParams.status as string) || "";
  const savSuppliers = await getSavSuppliers();
  let totalPages = 1;

  const savTranslations = await getTranslations("sav");
  const customStatuses: CustomSavStatus[] = await getCustomStatuses(true);

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
    const savData = await getSavs({ limit: 3, page: page });
    if (savData) {
      savs = savData.data.sav;
      totalPages = savData.pagesNumber;
    }
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
      {query.length > 1 && (
        <span className="text-gray-500 font-semibold">
          Résultat pour: {query}
        </span>
      )}
      <SavTable
        savSuppliers={savSuppliers}
        translationsKey="sav.tableHeaders"
        tableHeaders={savTableHeaders}
        classNames="hidden md:block"
        tableBody={
          <>
            {savs && savs.length > 0 ? (
              <>
                {savs.map((item) => {
                  const customStatus = customStatuses.find(
                    (el) => el.id === Number(item.status)
                  );

                  return (
                    <TableRowCustom
                      key={item.id}
                      href={`/sav/liste/${item.id}`}
                    >
                      <TableCell className="font-medium">
                        {item.client}
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>
                        {format.dateTime(new Date(item.updated_at), "long")}
                      </TableCell>
                      <TableCell>
                        {format.dateTime(new Date(item.created_at), "long")}
                      </TableCell>
                      {Number(item.status) >= 0 && Number(item.status) <= 5 ? (
                        <TableCell
                          className={formatSavStatus(item.status).classNames}
                        >
                          {savTranslations(
                            `statuses.${formatSavStatus(item.status).key}`
                          )}
                        </TableCell>
                      ) : (
                        <TableCell
                          style={{
                            backgroundColor: customStatus?.color_background,
                            color: customStatus?.color_font,
                          }}
                        >
                          {customStatus
                            ? customStatus.statut
                            : "Statut introuvable"}
                        </TableCell>
                      )}
                      <TableCell>
                        <Link href={`/sav/liste/${item.id}`}>
                          {savTranslations("seeDetails")}
                        </Link>
                      </TableCell>
                    </TableRowCustom>
                  );
                })}
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
            {savs.map((item) => {
              const customStatus = customStatuses.find(
                (el) => el.id === Number(item.status)
              );

              return (
                <MobileCard key={item.id}>
                  <div className="flex flex-col gap-4">
                    <section className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <h2 className="font-semibold">{item.client}</h2>
                        {Number(item.status) >= 0 &&
                        Number(item.status) <= 5 ? (
                          <small
                            className={clsx(
                              formatSavStatus(item.status).classNames,
                              "rounded-sm py-0.5 px-2"
                            )}
                          >
                            {savTranslations(
                              `statuses.${formatSavStatus(item.status).key}`
                            )}
                          </small>
                        ) : (
                          <small
                            style={{
                              backgroundColor: customStatus?.color_background,
                              color: customStatus?.color_font,
                            }}
                            className={clsx("rounded-sm py-0.5 px-2")}
                          >
                            {customStatus
                              ? customStatus.statut
                              : "Statut introuvable"}
                          </small>
                        )}
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
              );
            })}
          </>
        ) : (
          <>
            <p>Données non disponibles.</p>
          </>
        )}
      </div>
      <Pagination totalPages={totalPages} page={page} />
    </MainPage>
  );
};

export default Sav;
