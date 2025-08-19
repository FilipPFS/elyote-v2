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
import { ListeEntrepots } from "@/types";

type Props = {
  listeEntrepots: ListeEntrepots;
};

const ParcelForm = ({ listeEntrepots }: Props) => {
  const [itemQuantity, setItemQuantity] = useState<null | number>(null);
  const [emplacement, setEmplacement] = useState("");
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
    } else if (!emplacement) {
      setIsSubmitting(false);
      toast.error("Emplacement est obligatoire");
      return;
    }

    const parentIdOfEmplacement = listeEntrepots.find(
      (i) => String(i.id_entrepot) === emplacement
    )?.parent_id;

    if (!parentIdOfEmplacement) {
      setIsSubmitting(false);
      toast.error("Emplacement est obligatoire");
      return;
    }

    const res = await createParcel({
      itemQuantity,
      emplacement,
      parentId: Number(parentIdOfEmplacement),
    });

    if (res?.success) {
      toast.success(t("addPage.notifications.added"));
      setIsSubmitting(false);
      router.push("/cmd/colis");
    } else {
      setIsSubmitting(false);
      toast.error("Erreur survenue");
      return;
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
              value={emplacement}
              onChange={(e) => setEmplacement(e.target.value)}
              name="emplacement"
              icon={<FaLocationDot className="text-blue-700" />}
            >
              <option value="" disabled hidden>
                Aucun emplacement choisi
              </option>
              {listeEntrepots.map((item) => {
                const cheminValue = item.chemin.join(" / ");
                return (
                  <option key={item.id_entrepot} value={item.id_entrepot}>
                    {cheminValue}
                  </option>
                );
              })}
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
