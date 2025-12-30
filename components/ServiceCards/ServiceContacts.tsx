"use client";

import { ServiceContact } from "@/app/(root)/cartes-copies/liste/page";
import { ContactIcon } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import { toast } from "react-toastify";
import { addContact } from "@/lib/actions/services/actions.clients";
import DeleteServiceContact from "./DeleteServiceContact";

type Props = {
  contacts: ServiceContact[];
  id: string;
};

const ServiceContacts = ({ contacts, id }: Props) => {
  const addContactWithId = addContact.bind(null, id);
  const [state, action, isPending] = useActionState(addContactWithId, {});

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      toast.success("Contact ajouté.");
    }

    if (state.error) {
      toast.error(state.error, {
        className: "bg-amber-700 text-white",
      });
    }

    if (errors) {
      for (const key in errors) {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) =>
            toast.error(msg, {
              className: "bg-amber-700 text-white",
            })
          );
        }
      }
    }
  }, [state]);

  return (
    <div className="flex md:flex-row flex-col gap-10 justify-between">
      <div className="w-full md:w-1/2">
        <div className="flex items-center mb-3 gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          <ContactIcon className="w-5 h-5" />
          Contacts du client
        </div>
        {contacts && contacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {contacts.map((contact) => {
              return (
                <div
                  key={contact.id}
                  className="p-2 px-5 rounded-md border duration-200 flex justify-between items-center gap-4 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 "
                >
                  <h4 className="font-extrabold">
                    {contact.prenom} {contact.nom}
                  </h4>
                  <DeleteServiceContact
                    contactId={contact.id}
                    clientId={contact.client_id}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-2 text-gray-500 dark:text-gray-400">Aucun contact</p>
        )}
      </div>
      <form action={action} className="w-full md:w-1/2">
        <div className="flex items-center mb-3 gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          <ContactIcon className="w-5 h-5" />
          Ajouter un contact
        </div>
        <div className="flex md:flex-row flex-col items-center gap-3">
          <ElInput placeholder="Prénom" name="prenom" />
          <ElInput placeholder="Nom" name="nom" />
          <ElButton label="Ajouter" classNames="px-6" disabled={isPending} />
        </div>
      </form>
    </div>
  );
};

export default ServiceContacts;
