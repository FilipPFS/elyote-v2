import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import Search from "@/components/Search";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { savTableHeaders } from "@/constants";
import { getSavs } from "@/lib/actions/actions.sav";
import { formatSavStatus } from "@/lib/utils";
import { SavData } from "@/types";
import clsx from "clsx";
import { getFormatter } from "next-intl/server";
import Link from "next/link";
import React, { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Sav = async () => {
  const savData: { sav: SavData[] } = await getSavs();
  const savs = savData?.sav;
  const format = await getFormatter();

  return (
    <MainPage
      title="Gestion des SAV"
      headerElement={
        <Suspense fallback={null}>
          <Search
            component="identifiants"
            placeholder={"Rechercher sur le SAV"}
            classNames="w-full sm:w-2/4"
          />
        </Suspense>
      }
    >
      <TableExample
        translationsKey="sav.tableHeaders"
        tableHeaders={savTableHeaders}
        tableBody={
          <>
            {savs && savs.length > 0 ? (
              <>
                {savs.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.client}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.updated_at), "short")}
                    </TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.created_at), "short")}
                    </TableCell>
                    <TableCell
                      className={formatSavStatus(item.status).classNames}
                    >
                      {formatSavStatus(item.status).key}
                    </TableCell>
                    <TableCell>
                      <Link href={`/sav/liste/${item.id}`}>Voir détails</Link>
                    </TableCell>
                  </TableRow>
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
                        {formatSavStatus(item.status).key}
                      </small>
                    </div>
                    <Link href={`/sav/liste/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <small>
                        Fournisseur:{" "}
                        <span className="font-semibold">{item.supplier}</span>
                      </small>
                      <small>
                        Produit:{" "}
                        <span className="font-semibold">{item.product}</span>
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <small>
                        MAJ :{" "}
                        <span className="font-semibold">
                          {" "}
                          {format.dateTime(new Date(item.updated_at), "short")}
                        </span>
                      </small>

                      <small>
                        Créé :{" "}
                        <span className="font-semibold">
                          {" "}
                          {format.dateTime(new Date(item.created_at), "short")}
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
