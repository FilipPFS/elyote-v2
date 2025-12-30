"use client";

import React, { useActionState, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "../Global/Modal";
import { deleteContact } from "@/lib/actions/services/actions.clients";
import { toast } from "react-toastify";

type Props = {
  contactId: number;
  clientId: number;
};

const DeleteServiceContact = ({ contactId, clientId }: Props) => {
  const [confirm, setConfirm] = useState(false);

  const deleteContactWithIds = deleteContact.bind(null, clientId, contactId);
  const [state, action, isPending] = useActionState(deleteContactWithIds, {});

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      setConfirm(false);
      toast.success("Contact supprimé.");
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
    <form className="flex items-center" action={action}>
      <span className="cursor-pointer">
        <MdDelete size={20} onClick={() => setConfirm(true)} />
      </span>
      <Modal visible={confirm} setVisible={setConfirm}>
        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="font-semibold text-lg">
            Etes-vous sûr de vouloir supprimer ce contact?
          </h3>
          <div className="flex items-center gap-4">
            <button
              disabled={isPending}
              className="bg-red-500 py-2 disabled:bg-gray-500 cursor-pointer px-4 font-bold rounded-md"
            >
              Supprimer
            </button>
            <span
              onClick={() => setConfirm(false)}
              className="bg-cyan-700 py-2 cursor-pointer px-4 font-bold rounded-md"
            >
              Annuler
            </span>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default DeleteServiceContact;
