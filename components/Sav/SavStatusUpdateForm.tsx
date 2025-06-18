"use client";

import { CustomSavStatus } from "@/types";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCloseCircleOutline, IoTrashOutline } from "react-icons/io5";
import Modal from "../Global/Modal";
import ElInput from "../custom/ElInput";
import ElButton from "../custom/ElButton";
import {
  deleteCustomStatus,
  updateCustomStatus,
} from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";
import CustomSpinner from "../custom/Spinner";

type Props = {
  item: CustomSavStatus;
};

const SavStatusUpdateForm = ({ item }: Props) => {
  const [visible, setVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(item.statut);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [deletion, setDeletion] = useState(false);
  const [updating, setUpdating] = useState(false);
  const checkStatusLength = newStatus.length >= 3;

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

  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const res = await updateCustomStatus(item.id, newStatus);

    if (res.success) {
      toast.info(tSav("settingsPage.editNotification"));
      setVisible(false);
      setUpdating(false);
    }

    if (res.error) {
      toast.error(res.error);
      setUpdating(false);
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
          <small className="font-semibold block">{tGlobal("editBtn")}</small>
          <FaEdit className="block" />
        </button>

        {/* Delete Button */}
        <button
          className="flex cursor-pointer items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded-full border border-red-300 transition"
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

      {/* Edit Modal */}
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{tSav("settingsPage.editStatus")}</h4>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
              onClick={() => setVisible(false)}
            >
              <IoCloseCircleOutline size={20} />
            </button>
          </div>
          <form className="flex items-center gap-4" onSubmit={updateStatus}>
            <ElInput
              value={newStatus}
              placeholder={tSav("settingsPage.statusPlaceholder")}
              name="status"
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <ElButton
              label={tGlobal("basicModal.confirmBtn")}
              classNames="px-6"
              disabled={updating || !checkStatusLength}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SavStatusUpdateForm;
