"use client";

import { useTranslations } from "next-intl";
import { JSX, useState } from "react";
import ElButton from "../custom/ElButton";
import Modal from "../Global/Modal";
import ElInput from "../custom/ElInput";
import { CustomSavStatus } from "@/types";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  addNewCustomStatus,
  updateCustomStatus,
} from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";

type Props = {
  item?: CustomSavStatus;
  updatePage: boolean;
  icon: JSX.Element;
};

const StatusForm = ({ item, updatePage, icon }: Props) => {
  const [visible, setVisible] = useState(false);
  const tSav = useTranslations("sav");
  const tGlobal = useTranslations("global");
  const [updating, setUpdating] = useState(false);

  const [newStatus, setNewStatus] = useState(item ? item.statut : "");
  const [bgColor, setBgColor] = useState(item ? item.color_background : "");
  const [fontColor, setFontColor] = useState(
    item ? item.color_font : "#ffffff"
  );

  const checkStatusLength = newStatus.length >= 3;

  const addStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const res = await addNewCustomStatus({
      statut: newStatus,
      colorFont: fontColor,
      colorBackground: bgColor,
    });

    if (res.success) {
      toast.info(tSav("settingsPage.addNotification"));
      setVisible(false);
      setUpdating(false);
    } else if (res.error) {
      toast.error(res.error);
      setUpdating(false);
    }
  };

  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const res = await updateCustomStatus({
      statut: newStatus,
      id: item!.id,
      colorFont: fontColor,
      colorBackground: bgColor,
    });

    if (res.success) {
      toast.info(tSav("settingsPage.editNotification"));
      setVisible(false);
      setUpdating(false);
    } else if (res.error) {
      toast.error(res.error);
      setUpdating(false);
    }
  };

  return (
    <>
      <button
        className="flex cursor-pointer items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 text-gray-700 dark:text-gray-300 px-4 py-1 rounded-full border border-gray-300 dark:border-gray-800 transition"
        onClick={() => setVisible(true)}
      >
        {icon}
        <small className="font-semibold">
          {updatePage ? tGlobal("editBtn") : tSav("settingsPage.addBtn")}
        </small>
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">
              {updatePage
                ? tSav("settingsPage.editStatus")
                : tSav("settingsPage.addBtn")}
            </h4>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
              onClick={() => setVisible(false)}
            >
              <IoCloseCircleOutline size={20} />
            </button>
          </div>
          <form
            className="flex md:flex-row flex-col items-center gap-4"
            onSubmit={updatePage ? updateStatus : addStatus}
          >
            <ElInput
              value={newStatus}
              placeholder={tSav("settingsPage.statusPlaceholder")}
              name="status"
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center md:flex-row flex-col gap-2">
                <label
                  htmlFor="hs-color-input"
                  className="block text-sm font-medium mb-2"
                >
                  {tSav("settingsPage.backgroundColor")}
                </label>
                <input
                  type="color"
                  className="p-1 h-10 w-full md:w-14 block bg-white dark:bg-gray-700 dark:border-gray-950 border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-color-input"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  title="Choose your color"
                  name="color_background"
                />
              </div>
              <div className="flex items-center md:flex-row flex-col gap-2">
                <label
                  htmlFor="hs-color-font-input"
                  className="block text-sm font-medium mb-2"
                >
                  {tSav("settingsPage.textColor")}
                </label>
                <input
                  type="color"
                  className="p-1 h-10 w-full md:w-14 block bg-white dark:bg-gray-700 dark:border-gray-950 border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-color-font-input"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  title="Choose your color"
                  name="color_font"
                />
              </div>
            </div>
            <ElButton
              label={tGlobal("basicModal.confirmBtn")}
              classNames="px-6"
              disabled={updating || !checkStatusLength}
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default StatusForm;
