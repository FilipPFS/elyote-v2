import FilterContact from "@/components/FilterContact";
import GoNextButton from "@/components/Global/GoNextButton";
import Pagination from "@/components/Global/Pagination";
import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import TableRowCustom from "@/components/Table/TableRowCustom";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { packageTableHeaders } from "@/constants";
import { getParcels } from "@/lib/actions/actions.parcels";
import { PackageData, SearchParamProps } from "@/types";
import { getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

const CommandesColis = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  const format = await getFormatter();
  const t = await getTranslations("parcels");
  const status = (awaitedSearchParams.status as string) || "";

  const page = Number(awaitedSearchParams.page) || 1;
  let totalPages = 1;

  const packagesData = await getParcels({
    limit: 10,
    page: page,
    status: status,
  });
  const packages: PackageData[] = packagesData?.data;

  if (packagesData) {
    totalPages = packagesData.pagesNumber;
  }

  const filterOptions = [
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

  return (
    <MainPage title={t("title")}>
      <div className="flex sm:flex-row flex-col gap-3 sm:items-center justify-between">
        <div className="flex md:flex-row flex-col md:items-center gap-2">
          <h2 className="font-semibold">{t("filterStatus")}</h2>
          <FilterContact keyString="status" filterOptions={filterOptions} />
        </div>
        <GoNextButton
          label={t("addLink")}
          link="/cmd/colis/ajout"
          icon={<FaArrowRight />}
        />
      </div>
      <TableExample
        tableHeaders={packageTableHeaders}
        translationsKey="parcels.headers"
        headerClassnames="w-1/5 first:w-16"
        tableBody={
          <>
            {packages && packages.length > 0 ? (
              <>
                {packages.map((item) => (
                  <TableRowCustom key={item.id} href={`/cmd/colis/${item.id}`}>
                    <TableCell className="font-medium w-20">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.items_qty}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.emplacement}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.parent_type}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.statut === 0 && t("statuses.stored")}{" "}
                      {item.statut === 1 && t("statuses.shipped")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.date_creation}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.date_maj}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.date_livraison ? item.date_livraison : "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`/cmd/colis/${item.id}`}
                        className="hover:underline transition-all duration-300"
                      >
                        {t("viewParcel")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>No data</TableCell>
                </TableRow>
              </>
            )}
          </>
        }
      />
      <div className="lg:hidden flex flex-col gap-3">
        {packages && packages.length > 0 ? (
          <>
            {packages.map((item) => (
              <MobileCard key={item.id}>
                <div className="flex flex-col gap-4">
                  <section className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold">ID: {item.id}</h2>
                      <span className="text-sm">
                        Statut : {item.statut === 0 && t("statuses.stored")}{" "}
                        {item.statut === 1 && t("statuses.shipped")}
                      </span>
                    </div>
                    <Link href={`/cmd/colis/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between text-[13px] items-center">
                    <div className="flex flex-col gap-1">
                      <small>
                        {t("headers.type")}:{" "}
                        <span className="font-semibold">
                          {item.parent_type}
                        </span>
                      </small>
                      <small>
                        {t("headers.location")}:{" "}
                        <span className="font-semibold">
                          {item.emplacement}
                        </span>
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <small>
                        {t("headers.updatedAt")} :{" "}
                        <span className="font-semibold">
                          {" "}
                          {format.dateTime(new Date(item.date_maj), "long")}
                        </span>
                      </small>

                      <small>
                        {t("headers.createdAt")} :{" "}
                        <span className="font-semibold">
                          {" "}
                          {format.dateTime(
                            new Date(item.date_creation),
                            "long"
                          )}
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
            <p>No data</p>
          </>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </MainPage>
  );
};

export default CommandesColis;
