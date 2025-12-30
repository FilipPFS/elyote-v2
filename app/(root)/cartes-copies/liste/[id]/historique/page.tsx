import ReusableTable, { Column } from "@/components/Global/ReusableTable";
import { getServiceClientHistoryById } from "@/lib/actions/services/actions.clients";
import React from "react";
import { ServiceClientHistory } from "../../page";

type Props = {
  params: Promise<{ id: string }>;
};

const columns: Column<ServiceClientHistory>[] = [
  { key: "date_creation", header: "Date" },
  { key: "carte_type_id", header: "Carte" },
  { key: "type_action", header: "Type" },
  { key: "accompagnement", header: "Main d'oeuvre" },
  { key: "quantite", header: "Quantité" },
  { key: "contact_id", header: "Contact" },
  { key: "bv_id_user", header: "Opérateur" },
];

const Historique = async ({ params }: Props) => {
  const { id } = await params;

  const history: ServiceClientHistory[] = await getServiceClientHistoryById(
    Number(id)
  );

  return (
    <div>
      <ReusableTable data={history} columns={columns} />
      <div className="flex flex-col gap-2 md:hidden">
        {history.map((row, index) => (
          <div
            key={index}
            className="
        rounded-md border
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        px-3 py-2
      "
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {/* Date */}
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Date
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                {row.date_creation}
              </span>

              {/* Carte */}
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Carte
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                {row.carte_type_id}
              </span>

              {/* Type (FULL WIDTH) */}
              <span className="col-span-2 text-[11px] text-gray-500 dark:text-gray-400">
                Type
              </span>
              <span className="col-span-2 text-xs font-medium text-gray-900 dark:text-gray-100">
                {row.type_action}
              </span>

              {/* Main d'oeuvre */}
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Main d'oeuvre
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                {row.accompagnement}
              </span>

              {/* Quantité */}
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Quantité
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                {row.quantite}
              </span>

              {/* Contact */}
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Contact
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                {row.contact_id}
              </span>

              {/* Opérateur */}
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Opérateur
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                {row.bv_id_user}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Historique;
