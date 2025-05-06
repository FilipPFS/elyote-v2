"use client";

import { changeStatusOfRental } from "@/lib/actions/actions.rental";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  id: string;
};

const ChangeRentalStatusForm = ({ id }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("rentals");

  const handleSubmit = async (id: string) => {
    setIsSubmitting(true);

    const res = await changeStatusOfRental(id);

    if (res?.success) {
      toast.success(t("updatePage.success"));
    } else if (res?.error) {
      toast.error(res?.error);
    }
  };

  return (
    <button
      disabled={isSubmitting}
      onClick={() => handleSubmit(id)}
      className="bg-green-700 disabled:bg-gray-600 text-white px-4 py-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-800 active:bg-green-900"
    >
      {t("updatePage.statusChangeBtn")}
    </button>
  );
};

export default ChangeRentalStatusForm;
