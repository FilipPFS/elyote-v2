"use client";

import React, { useState } from "react";
import GoBackButton from "../Global/GoBackButton";
import ElButton from "../custom/ElButton";
import ElInput from "../custom/ElInput";
import { FaBox, FaLocationDot } from "react-icons/fa6";
import ElSelect from "../custom/ElSelect";
import { createParcel } from "@/lib/actions/actions.parcels";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomSpinner from "../custom/Spinner";
import { useTranslations } from "next-intl";

const ParcelForm = () => {
  const [itemQuantity, setItemQuantity] = useState<null | number>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const t = useTranslations("parcels");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (itemQuantity === null) {
      setIsSubmitting(false);
      toast.error(t("addPage.notifications.quantityCondition"));
      return;
    }

    const res = await createParcel(itemQuantity);

    if (res?.success) {
      toast.success(t("addPage.notifications.added"));
      setIsSubmitting(false);
      router.push("/cmd/colis");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-xl font-semibold">{t("addPage.title")}</h1>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              name="itemQuantity"
              type="number"
              placeholder={t("addPage.quantityPlaceholder")}
              icon={<FaBox className="text-blue-700" />}
              value={itemQuantity ?? ""}
              onChange={(e) =>
                setItemQuantity(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElSelect
              defaultValue={t("addPage.select")}
              name="firstname"
              icon={<FaLocationDot className="text-blue-700" />}
            >
              <option disabled>{t("addPage.select")}</option>
            </ElSelect>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <ElButton
            label={t("addPage.addBtn")}
            type="submit"
            disabled={isSubmitting}
            icon={isSubmitting ? <CustomSpinner /> : undefined}
            classNames="self-center w-2/3 lg:w-1/4"
          />
        </div>
      </div>
      <GoBackButton link="/cmd/colis" />
    </form>
  );
};

export default ParcelForm;
