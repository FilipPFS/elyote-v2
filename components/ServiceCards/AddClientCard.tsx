"use client";

import {
  addCard,
  GroupedServiceCards,
} from "@/lib/actions/services/actions.clients";
import React, { useActionState, useEffect } from "react";
import BalanceSelect from "./BalanceSelect";
import { toast } from "react-toastify";
import ElButton from "../custom/ElButton";

type Props = {
  cardTypes: GroupedServiceCards;
  id: string;
};

const AddClientCard = ({ cardTypes, id }: Props) => {
  const addCardWithId = addCard.bind(null, id);

  const [state, action, isPending] = useActionState(addCardWithId, {});

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      toast.success("Success.");
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
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
    <div
      className="w-full md:w-2/5 p-6 rounded-md border duration-200 flex flex-col gap-4 
    border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 "
    >
      <h2 className="text-xl font-semibold">Ajouter une carte</h2>
      <form className="flex flex-col gap-4" action={action}>
        {/* SOLDE */}
        <BalanceSelect name="quantite" />

        {/* TYPE DE CARTE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Type de carte</label>
          <select
            name="type"
            className="p-2 rounded-md border bg-white dark:bg-gray-900
              border-gray-300 dark:border-gray-700"
          >
            <option value="">Sélectionner un type</option>
            {cardTypes.all.length > 0 && (
              <optgroup label="Cartes communes">
                {cardTypes.all.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.type}
                  </option>
                ))}
              </optgroup>
            )}
            {cardTypes.personal.length > 0 && (
              <optgroup label="Cartes de magasin">
                {cardTypes.personal.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.type}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        {/* MAIN D'OEUVRE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Main d’œuvre</label>
          <select
            name="accompagnement"
            className="p-2 rounded-md border bg-white dark:bg-gray-900
              border-gray-300 dark:border-gray-700"
          >
            <option value="">Sélectionner une option</option>
            <option value="sans">Sans main d’œuvre</option>
            <option value="avec">Avec main d’œuvre</option>
          </select>
        </div>

        <ElButton label="Ajouter la carte" disabled={isPending} />
      </form>
    </div>
  );
};

export default AddClientCard;
