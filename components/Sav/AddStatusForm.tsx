"use client";

import React, { useActionState, useEffect, useState } from "react";
import Modal from "../Global/Modal";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import { IoCloseCircleOutline } from "react-icons/io5";
import { addNewCustomStatus } from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";

const AddStatusForm = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const checkStatusLength = status.length >= 3;

  const [state, action, isPending] = useActionState(addNewCustomStatus, {});

  useEffect(() => {
    if (state.success) {
      toast.success("Ajouté avec succès.");
      setStatus("");
      setVisible(false);
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
    }
  }, [state]);

  return (
    <>
      <ElButton
        classNames="px-4 !h-8"
        icon={<FiPlusCircle />}
        label="Ajouter un statut"
        onClick={() => setVisible(true)}
      />
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h4 className="font-semibold">Ajouter un statut</h4>
            <button
              className="cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <IoCloseCircleOutline size={20} />
            </button>
          </div>
          <form className="flex items-center gap-4" action={action}>
            <ElInput
              placeholder="Nom du statut"
              name="statut"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <ElButton
              label="Confirmer"
              classNames="px-6"
              disabled={isPending || !checkStatusLength}
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddStatusForm;
