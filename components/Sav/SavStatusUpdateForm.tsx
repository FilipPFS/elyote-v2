"use client";

import { CustomSavStatus } from "@/types";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCloseCircleOutline, IoTrashOutline } from "react-icons/io5";
import Modal from "../Global/Modal";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import { deleteCustomStatus } from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";

type Props = {
  item: CustomSavStatus;
};

const SavStatusUpdateForm = ({ item }: Props) => {
  const [visible, setVisible] = useState(false);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const t = useTranslations("printer");

  const deleteStatus = async (id: number) => {
    const res = await deleteCustomStatus(id);

    if (res.success) {
      toast.info("Votre statut a été suprimé.");
      setConfirmCheck(false);
    }

    if (res.error) {
      toast.error(res.error);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:items-center md:flex-row justify-between">
      {/* Status Badge */}
      <div className="bg-indigo-100 border border-indigo-300 text-indigo-800 flex flex-col gap-0 px-3 py-1.5 rounded-sm">
        <h3 className="font-semibold text-base">Statut: {item.statut}</h3>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center max-sm:justify-center gap-3">
        {/* Edit Button */}
        <button
          className="flex cursor-pointer items-center gap-2 bg-gray-100 hover:bg-blue-100 text-gray-700 px-4 py-1 rounded-full border border-gray-300 transition"
          onClick={() => setVisible((prev) => !prev)}
        >
          <small className="font-semibold block">{t("modal.editBtn")}</small>
          <FaEdit className="block" />
        </button>

        {/* Delete Button */}
        <button
          className="flex cursor-pointer items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded-full border border-red-300 transition"
          onClick={() => setConfirmCheck(true)}
        >
          <small className="font-semibold block">Supprimer</small>
          <IoTrashOutline className="block" />
        </button>
      </div>

      {/* Confirm Delete Modal */}
      <Modal visible={confirmCheck} setVisible={setConfirmCheck}>
        <div className="flex flex-col text-center gap-3 items-center justify-center">
          <h3 className="font-medium">
            Êtes-vous sûr de vouloir effectuer cette action ?
          </h3>
          <div className="flex items-center gap-5">
            <ElButton
              label="Oui"
              classNames="px-4"
              onClick={() => deleteStatus(item.id)}
            />
            <ElButton
              label="Non"
              classNames="px-4"
              onClick={() => setConfirmCheck(false)}
            />
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Modifier le nom du statut</h4>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
              onClick={() => setVisible(false)}
            >
              <IoCloseCircleOutline size={20} />
            </button>
          </div>
          <form className="flex items-center gap-4">
            <ElInput defaultValue={item.statut} />
            <ElButton label="Confirmer" classNames="px-6" />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SavStatusUpdateForm;
