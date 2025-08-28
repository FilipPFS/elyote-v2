"use client";

import React, { useState } from "react";
import ElSelect from "../custom/ElSelect";
import { FaLocationDot } from "react-icons/fa6";
import ElButton from "../custom/ElButton";
import GoBackButton from "../Global/GoBackButton";
import { ListeEntrepots, PackageData } from "@/types";
import { useFormatter, useTranslations } from "next-intl";
import clsx from "clsx";
import {
  deleteParcelById,
  updateParcel,
  updateParcelEmplacement,
} from "@/lib/actions/actions.parcels";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomSpinner from "../custom/Spinner";

type Props = {
  parcel: PackageData;
  listeEntrepots: ListeEntrepots;
};

const ParcelCard = ({ parcel, listeEntrepots }: Props) => {
  const format = useFormatter();
  const [status, setStatus] = useState(parcel.statut);
  const [emplacement, setEmplacement] = useState(parcel.emplacement);
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [updatingEmplacement, setUpdatingEmplacement] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const t = useTranslations("parcels");

  const handleUpdateStatus = async () => {
    setUpdating(true);
    const res = await updateParcel(String(parcel.id));

    if (res?.success) {
      setUpdating(false);
      setStatus(1);
      toast.success(t("cardPage.notifications.delivered"));
    }
  };

  const handleUpdateParcelEmplacement = async () => {
    setUpdatingEmplacement(true);
    const res = await updateParcelEmplacement({
      id: String(parcel.id),
      emplacement,
    });

    if (res?.success) {
      setUpdatingEmplacement(false);
      toast.success("L'emplacement a été mis à jour.");
      router.push("/cmd/colis");
    }
  };

  const handleDeleteParcel = async () => {
    setDeleting(true);
    const res = await deleteParcelById(String(parcel.id));

    if (res?.success) {
      setDeleting(false);
      router.push("/cmd/colis");
      toast.success(t("cardPage.notifications.deleted"));
    }
  };

  return (
    <div className="flex flex-col justify-between w-full lg:w-2/3 bg-white dark:bg-gray-950 p-6 lg:p-10 rounded-md ">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          {t("title")}: {parcel.id}
        </h1>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2 w-1/2">
            <span>{t("cardPage.source")}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 w-full py-2 rounded-md shadow-sm px-2">
              {parcel.parent_type}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <span>{t("addPage.quantityPlaceholder")}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 w-full py-2 rounded-md shadow-sm px-2">
              {parcel.items_qty}
            </span>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2 w-1/2">
            <span>{t("headers.createdAt")}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 w-full py-2 rounded-md shadow-sm px-2">
              {format.dateTime(new Date(parcel.date_creation), "long")}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <span>{t("headers.updatedAt")}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 w-full py-2 rounded-md shadow-sm px-2">
              {format.dateTime(new Date(parcel.date_maj), "long")}
            </span>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2 w-1/2">
            <span>{t("headers.status")}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 w-full py-2 rounded-md shadow-sm px-2">
              {status === 0 && "Entreposé"} {status === 1 && "Livre/Expedié"}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <span>{t("cardPage.deliveryDate")}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 w-full py-2 rounded-md shadow-sm px-2">
              {parcel.date_livraison ? parcel.date_livraison : "N/A"}
            </span>
          </div>
        </div>
        {status === 0 && (
          <form className="flex flex-col lg:flex-row items-center justify-between m-2 gap-4 lg:gap-7">
            <ElSelect
              value={emplacement}
              onChange={(e) => setEmplacement(e.target.value)}
              name="emplacement"
              icon={<FaLocationDot className="text-blue-700" />}
            >
              <option disabled>{t("addPage.select")}</option>
              {listeEntrepots.map((item) => {
                const chemin = item.chemin;

                const cheminValue = chemin.join(" / ");
                return (
                  <option key={item.id_entrepot} value={item.id_entrepot}>
                    {cheminValue}
                  </option>
                );
              })}
            </ElSelect>
            <ElButton
              label={t("addPage.selectBtn")}
              type="submit"
              disabled={updatingEmplacement}
              icon={updatingEmplacement ? <CustomSpinner /> : undefined}
              onClick={handleUpdateParcelEmplacement}
              classNames="self-center w-2/5"
            />
          </form>
        )}
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 gap-x-8 justify-center gap-y-2 py-5",
          status === 0 ? "md:grid-cols-2" : "md:grid-cols-1"
        )}
      >
        <ElButton
          label={t("cardPage.buttons.ship")}
          type="submit"
          //   disabled={isPending}
          //   icon={isPending ? <CustomSpinner /> : undefined}
          classNames="self-center w-full"
        />
        {status === 0 && (
          <>
            <ElButton
              label={t("cardPage.buttons.deliver")}
              type="submit"
              disabled={updating}
              icon={updating ? <CustomSpinner /> : undefined}
              classNames="self-center w-full bg-orange-400 hover:bg-orange-500"
              onClick={handleUpdateStatus}
            />
            <ElButton
              label={t("cardPage.buttons.print")}
              type="submit"
              //   disabled={isPending}
              //   icon={isPending ? <CustomSpinner /> : undefined}
              classNames="self-center w-full bg-gray-700 hover:bg-gray-800"
            />
            <ElButton
              label={t("cardPage.buttons.delete")}
              type="submit"
              disabled={deleting}
              icon={deleting ? <CustomSpinner /> : undefined}
              onClick={handleDeleteParcel}
              classNames="self-center w-full bg-red-700 hover:bg-red-800"
            />
          </>
        )}
      </div>
      <GoBackButton link="/cmd/colis" />
    </div>
  );
};

export default ParcelCard;
