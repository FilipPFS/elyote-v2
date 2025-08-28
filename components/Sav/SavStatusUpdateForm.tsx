"use client";

import { CustomSavStatus } from "@/types";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "../Global/Modal";
import ElButton from "../custom/ElButton";
import { deleteCustomStatus } from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";
import CustomSpinner from "../custom/Spinner";
import StatusForm from "./StatusForm";

type Props = {
  item: CustomSavStatus;
};

const SavStatusUpdateForm = ({ item }: Props) => {
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [deletion, setDeletion] = useState(false);

  const tGlobal = useTranslations("global");
  const tSav = useTranslations("sav");

  const deleteStatus = async (id: number) => {
    setDeletion(true);
    const res = await deleteCustomStatus(id);

    if (res.success) {
      toast.info(tSav("settingsPage.deleteNotification"));
      setConfirmCheck(false);
      setDeletion(false);
    }

    if (res.error) {
      toast.error(res.error);
      setDeletion(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:items-center md:flex-row justify-between">
      {/* Status Badge */}
      <div
        style={{ backgroundColor: item.color_background }}
        className={`flex flex-col gap-0 px-3 py-1.5 rounded-sm`}
      >
        <h3 style={{ color: item.color_font }} className={`text-sm`}>
          Statut: {item.statut}
        </h3>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center max-sm:justify-center gap-3">
        {/* Edit Button */}
        <StatusForm item={item} updatePage={true} icon={<FaEdit />} />

        {/* Delete Button */}
        <button
          className="flex cursor-pointer items-center gap-2 bg-red-100 dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-red-200 text-red-700 dark:text-red-300 px-4 py-1 rounded-full border border-red-300 dark:border-red-800 transition"
          onClick={() => setConfirmCheck(true)}
        >
          <small className="font-semibold block">{tGlobal("deleteBtn")}</small>
          <IoTrashOutline className="block" />
        </button>
      </div>

      {/* Confirm Delete Modal */}
      <Modal visible={confirmCheck} setVisible={setConfirmCheck}>
        <div className="flex flex-col text-center gap-3 items-center justify-center">
          <h3 className="font-medium">
            {tGlobal("basicModal.confirmationAction")}
          </h3>
          <div className="flex items-center gap-5">
            <ElButton
              label={tGlobal("yes")}
              classNames="px-4"
              disabled={deletion}
              icon={deletion ? <CustomSpinner /> : undefined}
              onClick={() => deleteStatus(item.id)}
            />
            <ElButton
              label={tGlobal("no")}
              classNames="px-4"
              disabled={deletion}
              onClick={() => setConfirmCheck(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SavStatusUpdateForm;
