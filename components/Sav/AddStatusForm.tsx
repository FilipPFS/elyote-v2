"use client";

import React, { useActionState, useEffect, useState } from "react";
import Modal from "../Global/Modal";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import { IoCloseCircleOutline } from "react-icons/io5";
import { addNewCustomStatus } from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

const AddStatusForm = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const checkStatusLength = status.length >= 3;
  const tSav = useTranslations("sav");
  const tGlobal = useTranslations("global");

  const [state, action, isPending] = useActionState(addNewCustomStatus, {});

  useEffect(() => {
    if (state.success) {
      toast.success(tSav("settingsPage.addNotification"));
      setStatus("");
      setVisible(false);
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
    }
  }, [state, tSav]);

  return (
    <>
      <ElButton
        classNames="px-4 !h-8"
        icon={<FiPlusCircle />}
        label={tSav("settingsPage.addBtn")}
        onClick={() => setVisible(true)}
      />
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h4 className="font-semibold">{tSav("settingsPage.addBtn")}</h4>
            <button
              className="cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <IoCloseCircleOutline size={20} />
            </button>
          </div>
          <form className="flex items-center gap-4" action={action}>
            <ElInput
              placeholder={tSav("settingsPage.statusPlaceholder")}
              name="statut"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <ElButton
              label={tGlobal("basicModal.confirmBtn")}
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
