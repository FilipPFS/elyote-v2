import Pagination from "@/components/Global/Pagination";
import ParcelTable from "@/components/Global/ParcelTable";
import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import TableRowCustom from "@/components/Table/TableRowCustom";
import { TableCell, TableRow } from "@/components/ui/table";
import { packageTableHeaders } from "@/constants";
import { getParcels, getStorageZone } from "@/lib/actions/actions.parcels";
import { ListeEntrepots, PackageData, SearchParamProps } from "@/types";
import { getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const CommandesColis = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  const format = await getFormatter();
  const listeEntrepots: ListeEntrepots = await getStorageZone();
  const t = await getTranslations("parcels");
  const status = (awaitedSearchParams.status as string) || "";
  const type = (awaitedSearchParams.type as string) || "";

  const page = Number(awaitedSearchParams.page) || 1;
  let totalPages = 1;

  const packagesData = await getParcels({
    limit: 10,
    page: page,
    status: status,
    type: type,
  });

  const packages: PackageData[] = packagesData?.data;

  if (packagesData) {
    totalPages = packagesData.pagesNumber;
  }

  return (
    <MainPage title={t("title")}>
      <ParcelTable
        tableHeaders={packageTableHeaders}
        translationsKey="parcels.headers"
        headerClassnames="w-1/5 first:w-16"
        tableBody={
          <>
            {packages && packages.length > 0 ? (
              <>
                {packages.map((item) => (
                  <TableRowCustom key={item.id} href={`/cmd/colis/${item.id}`}>
                    <TableCell className=" w-20">{item.id}</TableCell>
                    <TableCell className="">{item.items_qty}</TableCell>
                    <TableCell className="">
                      {item.emplacement === "Livré"
                        ? "Livré"
                        : listeEntrepots
                            .find(
                              (i) => String(i.id_entrepot) === item.emplacement
                            )
                            ?.chemin.join(" / ")}
                    </TableCell>
                    <TableCell className="">{item.parent_type}</TableCell>
                    <TableCell className="">
                      {item.statut === 0 && t("statuses.stored")}{" "}
                      {item.statut === 1 && t("statuses.shipped")}
                    </TableCell>
                    <TableCell className="">
                      {format.dateTime(new Date(item.date_creation), "long")}
                    </TableCell>
                    <TableCell className="">
                      {format.dateTime(new Date(item.date_maj), "long")}
                    </TableCell>
                    <TableCell className="">
                      {item.date_livraison
                        ? format.dateTime(new Date(item.date_livraison), "long")
                        : "N/A"}
                    </TableCell>
                    <TableCell className="">
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
                  <TableCell>Aucun colis disponible.</TableCell>
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
