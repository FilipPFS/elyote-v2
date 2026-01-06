import GoNextButton from "@/components/Global/GoNextButton";
import MobileTableCard from "@/components/Global/MobileTableCard";
import Pagination from "@/components/Global/Pagination";
import ReusableTable, { Column } from "@/components/Global/ReusableTable";
import MainPage from "@/components/Mobile/MainPage";
import Search from "@/components/Search";
import AlphabetFilter from "@/components/ServiceCards/AlphabetFilter";
import { getServiceClientsFromQuery } from "@/lib/actions/services/actions.clients";
import { SearchParamProps } from "@/types";
import React from "react";

export type ServiceClient = {
  id: number;
  customer_id: string;
  societe: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  commentaire: string;
  code_contact: number;
  date_creation: string;
  status: number;
};

export type ServiceCard = {
  id: number;
  carte_type_id: number;
  type_name: string;
  accompagnement: string;
  solde: number;
  client_id: number;
  date_creation: string;
};

export type ServiceContact = {
  id: number;
  nom: string;
  prenom: string;
  client_id: number;
  status: number;
  customer_id: string;
  date_creation: string;
};

export type ServiceClientHistory = {
  id: number;
  type_action:
    | string
    | {
        modifier_client: {
          old_data: Record<string, string | number | null>;
          new_data: Record<string, string | number | null>;
        };
      };
  carte_type_id: number | null;
  carte_type: string | null;
  accompagnement: string | null;
  quantite: number | null;
  client_id: number;
  contact_id: number;
  contact_nom: string | null;
  bv_id_user: number;
  date_creation: string; // ISO-like datetime from backend
};

const columns: Column<ServiceClient>[] = [
  { key: "id", header: "ID" },
  { key: "societe", header: "Société" },
  { key: "nom", header: "Nom" }, // corrected: was "Prénom" but key is "nom"
  { key: "prenom", header: "Prénom" },
  {
    key: "customer_id",
    header: "Action",
    render: () => (
      <span className="text-blue-600 dark:text-blue-400 font-medium">
        Action
      </span>
    ),
  },
];

const CarteCopiesListe = async ({ searchParams }: SearchParamProps) => {
  const awaitedSearchParams = await searchParams;
  let serviceClients: ServiceClient[] = [];
  const page = Number(awaitedSearchParams.page) || 1;

  const query = (awaitedSearchParams.query as string) || "";
  const filterBy = (awaitedSearchParams.filterby as string) || "";

  const clients = await getServiceClientsFromQuery({
    query: query,
    page: page,
    limit: 20,
    filterBy: filterBy,
  });

  serviceClients = clients?.data ?? [];
  const totalPages = clients?.pagesNumber ?? 1;

  return (
    <MainPage
      title="Gestion de cartes copies"
      headerElement={
        <div className="flex md:flex-row flex-col md:w-fit w-full items-center gap-2">
          <GoNextButton link="/cartes-copies/ajout" label="Ajouter un client" />
          <GoNextButton
            link="/cartes-copies/reglages"
            label="Réglages du module"
          />
        </div>
      }
    >
      <Search placeholder="Recherche par les mots clès" />
      <AlphabetFilter />
      <ReusableTable
        data={serviceClients}
        columns={columns}
        link={"cartes-copies/liste"}
        rowId={(row) => row.id}
      />
      <MobileTableCard
        data={serviceClients}
        columns={columns}
        rowId={(row) => row.id}
        href="/cartes-copies/liste"
      />
      <Pagination page={page} totalPages={totalPages} />
    </MainPage>
  );
};

export default CarteCopiesListe;
