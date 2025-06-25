import GoNextButton from "@/components/Global/GoNextButton";
import MainPage from "@/components/Mobile/MainPage";
import MobileCard from "@/components/Mobile/MobileCard";
import TableRowCustom from "@/components/Table/TableRowCustom";
import TableExample from "@/components/TableExample";
import { TableCell, TableRow } from "@/components/ui/table";
import { rentalsTableHeaders } from "@/constants";
import { getRentals } from "@/lib/actions/actions.rental";
import { RentalData } from "@/types";
import { getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

const LocationsListe = async () => {
  const rentals: RentalData[] = await getRentals();
  const tRental = await getTranslations("rentals");
  const tCredentials = await getTranslations("credentials");
  const format = await getFormatter();

  return (
    <MainPage
      title="Locations"
      headerElement={
        <div className="max-sm:w-full">
          <GoNextButton link="/locations/ajout" label="Ajouter une location" />
        </div>
      }
    >
      <TableExample
        translationsKey="rentals.tableHeaders"
        tableHeaders={rentalsTableHeaders}
        tableBody={
          <>
            {rentals && rentals.length > 0 ? (
              <>
                {rentals.map((item) => (
                  <TableRowCustom
                    key={item.id}
                    href={`/locations/liste/${item.id}`}
                  >
                    <TableCell className="font-medium">{item.client}</TableCell>
                    <TableCell>{item.id_material}</TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.created_at), "long")}
                    </TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.start_date), "short")}
                    </TableCell>
                    <TableCell>
                      {format.dateTime(new Date(item.end_date), "short")}
                    </TableCell>
                    <TableCell>
                      {item.status === 1 && (
                        <span className="flex items-center gap-2 text-green-700">
                          <FaCheck /> {tRental("status.inProgress")}
                        </span>
                      )}
                      {item.status === 0 && (
                        <span className="flex items-center gap-2 text-red-700">
                          <FaXmark /> {tRental("status.completed")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/locations/liste/${item.id}`}>
                        {tCredentials("seeDetails")}
                      </Link>
                    </TableCell>
                  </TableRowCustom>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>{tRental("noData")}</TableCell>
              </TableRow>
            )}
          </>
        }
      />

      <div className="lg:hidden flex flex-col gap-3">
        {rentals && rentals.length > 0 ? (
          <>
            {rentals.map((item) => (
              <MobileCard key={item.id}>
                <div className="flex flex-col gap-3">
                  <small>
                    {tRental("tableHeaders.createdAt")}:{" "}
                    {format.dateTime(new Date(item.created_at), "long")}
                  </small>
                  <section className="flex justify-between items-center">
                    <h2 className="font-semibold">{item.client}</h2>
                    <Link href={`/locations/liste/${item.id}`}>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  </section>
                  <section className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <small>{tRental("material")}: </small>
                      <small>{item.id_material}</small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <small>
                        {tRental("dates.startDate")}:{" "}
                        {format.dateTime(new Date(item.start_date), "short")}
                      </small>

                      <small>
                        {tRental("dates.endDate")}:{" "}
                        {format.dateTime(new Date(item.end_date), "short")}
                      </small>
                    </div>
                  </section>
                </div>
              </MobileCard>
            ))}
          </>
        ) : (
          <>
            <p>{tRental("noData")}</p>
          </>
        )}
      </div>
    </MainPage>
  );
};

export default LocationsListe;
