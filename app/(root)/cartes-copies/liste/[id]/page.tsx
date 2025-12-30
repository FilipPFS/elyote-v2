import {
  getServiceCardTypes,
  getServiceClientById,
} from "@/lib/actions/services/actions.clients";
import React from "react";
import { ServiceCard, ServiceClient, ServiceContact } from "../page";
import ServiceClientData from "@/components/ServiceCards/ServiceClientData";
import DeductionForm from "@/components/ServiceCards/ClientCards";
import AddClientCard from "@/components/ServiceCards/AddClientCard";
import GoBackButton from "@/components/Global/GoBackButton";
import ServiceContacts from "@/components/ServiceCards/ServiceContacts";

type Props = {
  params: Promise<{ id: string }>;
};

const CarteCopiesId = async ({ params }: Props) => {
  const { id } = await params;

  const clientData: {
    client: ServiceClient;
    cards: ServiceCard[];
    contacts: ServiceContact[];
  } = await getServiceClientById(Number(id));

  const cardTypes = await getServiceCardTypes();

  const { client } = clientData;
  const { cards } = clientData;
  const { contacts } = clientData;

  if (!cardTypes) {
    return <div>Error survenue.</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex md:flex-row flex-col gap-8 justify-between">
        <DeductionForm
          cards={cards}
          contacts={clientData.contacts}
          verificationCode={client.code_contact}
          clientName={`${client.prenom} ${client.nom}`}
          id={id}
        />
        <AddClientCard cardTypes={cardTypes} id={id} />
      </div>
      <div className="w-full h-px bg-blue-500 opacity-10" />
      <ServiceClientData clientData={client} id={id} />
      <div className="w-full h-px bg-blue-500 opacity-10" />
      <ServiceContacts contacts={contacts} id={id} />
      <div className="w-full h-px bg-blue-500 opacity-10" />
      <GoBackButton link="/cartes-copies/liste" />
    </div>
  );
};

export default CarteCopiesId;
