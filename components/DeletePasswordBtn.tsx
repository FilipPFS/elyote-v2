"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomSpinner from "./custom/Spinner";
import { deleteSingleCredential } from "@/lib/actions/actions.credentials";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  id: string;
};

const DeletePasswordBtn = ({ id }: Props) => {
  const t = useTranslations("credentials.form");
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (id: string) => {
    setIsSubmitting(true);

    const res = await deleteSingleCredential(id);

    if (res?.success) {
      router.push("/identifiants/liste");
      toast.success("L'identifiant a été supprimé avec succès.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="bg-red-500 w-2/3 lg:w-1/4 text-sm cursor-pointer transition-all duration-500 hover:bg-red-700 text-white rounded-md py-1"
      >
        {t("btnDelete")}
      </button>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-6 flex flex-col gap-5 items-center rounded-lg shadow-lg z-10 w-11/12 max-w-md">
            <h2 className="text-xl font-semibold">{t("deleteModal.title")}</h2>
            <p className="text-center">{t("deleteModal.question")}</p>
            <div className="flex items-center gap-4">
              <button
                disabled={isSubmitting}
                onClick={() => handleSubmit(id)}
                className="px-3 py-1.5 flex gap-2 items-center cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
              >
                {isSubmitting && <CustomSpinner />}
                {isSubmitting
                  ? t("deleteModal.pending")
                  : t("deleteModal.confirm")}
              </button>
              <button
                onClick={() => setVisible(false)}
                className="bg-blue-500 text-white px-3 py-1.5 cursor-pointer rounded hover:bg-blue-600"
              >
                {t("deleteModal.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePasswordBtn;
