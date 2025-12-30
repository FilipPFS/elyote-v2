"use client";

import React, { useActionState, useEffect, useState } from "react";
import Modal from "../Global/Modal";
import ElButton from "../custom/ElButton";
import ElInput from "../custom/ElInput";
import { addNewServiceCardType } from "@/lib/actions/services/actions.clients";
import { toast } from "react-toastify";

const AddServiceTypeCard = () => {
  const [visible, setVisible] = useState(false);

  const [state, action, isPending] = useActionState(addNewServiceCardType, {});

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      toast.success("Success.");
      setVisible(false);
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
    <div>
      <ElButton
        label="Ajouter un type"
        onClick={() => setVisible(true)}
        classNames="!h-8 w-full md:w-fit"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <form
          action={action}
          className="flex items-center gap-5 justify-between"
        >
          <ElInput placeholder="Nom du type" name="type" />
          <ElButton label="Ajouter" disabled={isPending} />
        </form>
      </Modal>
    </div>
  );
};

export default AddServiceTypeCard;
