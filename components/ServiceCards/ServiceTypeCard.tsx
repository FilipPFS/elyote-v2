"use client";

import {
  ServiceCardType,
  updateServiceCardType,
} from "@/lib/actions/services/actions.clients";
import React, { useActionState, useEffect, useState } from "react";
import Modal from "../Global/Modal";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import { toast } from "react-toastify";
import clsx from "clsx";

type Props = {
  cardType: ServiceCardType;
  editable: boolean;
};

const ServiceTypeCard = ({ cardType, editable }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const updateServiceCardTypeWithId = updateServiceCardType.bind(
    null,
    cardType.id
  );

  const [state, action, isPending] = useActionState(
    updateServiceCardTypeWithId,
    {}
  );

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      toast.success("Success.");
      setIsVisible(false);
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
      className={clsx(
        "w-full px-4 py-1.5 rounded-md border flex justify-between items-center gap-4 bg-gray-50 dark:bg-gray-800/50",
        editable
          ? "border-gray-300 dark:border-red-900"
          : "border-gray-300 dark:border-gray-700"
      )}
    >
      <h4>{cardType.type}</h4>
      {editable && (
        <button onClick={() => setIsVisible(true)} className="cursor-pointer">
          Modifier
        </button>
      )}
      <Modal visible={isVisible} setVisible={setIsVisible}>
        <form
          action={action}
          className="flex md:flex-row flex-col items-center gap-5 justify-between"
        >
          <ElInput
            placeholder="Nom du type"
            name="type"
            defaultValue={cardType.type}
          />
          <ElButton label="Modifier" disabled={isPending} />
        </form>
      </Modal>
    </div>
  );
};

export default ServiceTypeCard;
