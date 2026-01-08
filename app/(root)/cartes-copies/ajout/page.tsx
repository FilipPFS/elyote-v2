"use client";

import ClientForm from "@/components/ServiceCards/ClientForm";
import {
  addNewClient,
  ClientFormState,
} from "@/lib/actions/services/actions.clients";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const initialState: ClientFormState = {
  data: {
    societe: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    code_contact: "",
    commentaire: "",
  },
};

const CarteCopiesAjout = () => {
  const [state, action, isPending] = useActionState(addNewClient, initialState);
  const router = useRouter();

  console.log("state", state);

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/cartes-copies/liste");
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
  }, [state, router]);

  return (
    <div className="flex-grow max-sm:p-5 p-14 flex justify-center">
      <ClientForm
        isPending={isPending}
        action={action}
        updatePage={false}
        state={state}
      />
    </div>
  );
};

export default CarteCopiesAjout;
