"use client";

import { AlertCircle, CreditCard, User, Phone } from "lucide-react";
import {
  ServiceCard,
  ServiceContact,
} from "@/app/(root)/cartes-copies/liste/page";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { deductCardsAction } from "@/lib/actions/services/actions.clients";

interface DeductionFormProps {
  cards: ServiceCard[];
  contacts: ServiceContact[];
  verificationCode: number; // ex: "1234"
  id: string;
  clientName: string;
}

export default function DeductionForm({
  cards,
  contacts,
  verificationCode,
  id,
  clientName,
}: DeductionFormProps) {
  const deductCardsActionWithId = deductCardsAction.bind(null, id);
  const [state, action, isPending] = useActionState(
    deductCardsActionWithId,
    {}
  );

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      toast.success("Déduction effectuée");
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

  console.log("VERIFICATION", verificationCode);

  return (
    <div className="max-w-3xl w-full dark:bg-gray-900 rounded-xl dark:shadow-lg">
      {/* Liste des cartes avec solde */}
      <form action={action} className="flex flex-col gap-6">
        <div className="">
          <div className="flex items-center mb-3 gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            <CreditCard className="w-5 h-5" />
            Cartes disponibles
          </div>

          <div className="grid gap-2 grid-cols-1">
            {cards.length > 0 ? (
              <>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`px-4 h-16 rounded-md border transition-all duration-200 flex items-center md:justify-between md:gap-4 overflow-x-auto remove-scrollbar sm:overflow-visible ${"border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-600"}`}
                  >
                    <div className="flex items-center justify-between gap-12 min-w-0 flex-1">
                      <div className="min-w-[140px] md:w-1/5">
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Carte
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {card.type_name}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Accompagnement
                        </div>
                        <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                          {card.accompagnement}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Solde
                        </div>
                        <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                          {card.solde}
                        </div>
                      </div>
                      <div className="px-4 md:px-0 flex flex-col items-end">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Déduire
                        </div>
                        <input
                          type="number"
                          min="0"
                          max={card.solde}
                          name={`quantite[${card.id}]`}
                          placeholder="0"
                          className="mt-0.5 w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="py-3 text-gray-500 dark:text-gray-400">
                Aucune carte disponible
              </p>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4">
          <div className="w-full">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              <Phone className="w-5 h-5" />
              Opérateur
            </label>
            <select
              name="operateur"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un opérateur</option>
              <option value="Flip P">Flip P</option>
              {/* Ajoute d'autres opérateurs ici */}
            </select>
          </div>
          {contacts.length > 0 && (
            <div className="w-full">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                <User className="w-5 h-5" />
                Contact
              </label>
              <select
                name="contactId"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un contact</option>
                <option value={0}>Contact principal ({clientName})</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.nom}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {verificationCode !== null && verificationCode !== 0 && (
          <>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-300">
                <p>
                  Sur cette fiche, un code de vérification est renseigné. Vous
                  devez demander la confirmation de ce code au client{" "}
                  <strong>(le code est "{verificationCode}")</strong> et cocher
                  la case ci-dessous si le code est OK.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                required
                name="codeConfirmed"
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="code-ok"
                className="text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                J'ai vérifié le code avec le client, il est correct
              </label>
            </div>
          </>
        )}
        <button
          disabled={isPending}
          className="w-full px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-700 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:shadow-none"
        >
          Déduire
        </button>
      </form>
    </div>
  );
}
