import FilterButton from "@/components/FilterButton";
import MainPage from "@/components/Mobile/MainPage";
import OrderCard from "@/components/Mobile/OrderCard";
import TableExample from "@/components/TableExample";
import TableFilters from "@/components/TableFilters";
import { TableCell, TableRow } from "@/components/ui/table";
import { orderTableHeaders } from "@/constants";
import { orders } from "@/constants/data";
import Link from "next/link";
import { SearchParamProps } from "@/types";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { RiFilterLine } from "react-icons/ri";

const STATUS_OPTIONS = [
  { label: "Tous", value: "all" },
  { label: "Reçu", value: "recu" },
  { label: "À Commander", value: "a_commander" },
  { label: "Commandé", value: "commande" },
];
const CommandesCahier = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  const selectedStatus = awaitedSearchParams.status || "all";

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <MainPage title="Commandes">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
        <div className="max-sm:order-1 flex border-b border-gray-300">
          {STATUS_OPTIONS.map(({ label, value }) => (
            <FilterButton
              key={value}
              label={label}
              status={value}
              selectedStatus={selectedStatus}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 cursor-pointer transition-all duration-500 bg-blue-600 hover:bg-blue-800 rounded-sm text-white text-[12px] md:hidden flex items-center gap-2">
            <RiFilterLine /> Filtres
          </button>
          <Link href={"/cmd/ajouter"}>
            <button className="px-3 py-1 cursor-pointer transition-all duration-500 bg-blue-600 hover:bg-blue-800 rounded-sm text-white text-[12px] flex items-center gap-2">
              <FiPlus /> Ajouter une commande
            </button>
          </Link>
        </div>
      </div>
      <TableFilters />
      <div className="flex lg:hidden flex-col gap-2">
        {filteredOrders.map((item) => (
          <OrderCard key={item.number} item={item} />
        ))}
      </div>
      <TableExample
        tableBody={
          <>
            {filteredOrders.map((item) => (
              <TableRow key={item.number}>
                <TableCell className="font-medium">{item.number}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell>{item.orderDate}</TableCell>
                <TableCell>{item.itemCount}</TableCell>
                <TableCell>
                  {item.status === "recu" && (
                    <div className="flex gap-3 items-center">
                      <span
                        className={"block w-2 h-2 rounded-full bg-blue-400"}
                      />
                      Recu
                    </div>
                  )}
                  {item.status === "a_commander" && (
                    <div className="flex gap-3 items-center">
                      <span
                        className={"block w-2 h-2 rounded-full bg-red-400"}
                      />
                      A commander
                    </div>
                  )}
                  {item.status === "commande" && (
                    <div className="flex gap-3 items-center">
                      <span
                        className={"block w-2 h-2 rounded-full bg-yellow-500"}
                      />
                      Commandé
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/cmd/cahier/${item.number}`}>Voir Détails</Link>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
        tableHeaders={orderTableHeaders}
        translationsKey="commandes.tableHeaders"
        headerClassnames="first:w-[150px]"
      />
    </MainPage>
  );
};

export default CommandesCahier;
