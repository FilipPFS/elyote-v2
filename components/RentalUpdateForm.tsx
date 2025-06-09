"use client";

import { RentalData } from "@/types";
import React, { useActionState, useEffect, useState } from "react";
import ElInput from "./custom/ElInput";
import {
  MdEuro,
  MdOutlineCreditCard,
  MdOutlineLocationCity,
  MdOutlineMail,
  MdOutlinePerson,
  MdOutlinePhone,
} from "react-icons/md";
import ElTextarea from "./custom/ElTextarea";
import { FiTool } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { useFormatter, useTranslations } from "next-intl";
import Link from "next/link";
import clsx from "clsx";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { updateRental } from "@/lib/actions/actions.rental";
import ChangeRentalStatusForm from "./ChangeRentalStatusForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import GeneratePdf from "./GeneratePdf";
import ElButton from "./custom/ElButton";
import CustomSpinner from "./custom/Spinner";
import GoBackButton from "./Global/GoBackButton";

type Props = {
  singleRental: RentalData;
  materialData: {
    name: string;
    id: number;
  };
  templateId: string;
};

const RentalUpdateForm = ({
  singleRental,
  materialData,
  templateId,
}: Props) => {
  const [localData, setLocalData] = useState({
    raison_sociale: "",
    capital: "",
    adresse_bv: "",
    cp_bv: "",
    ville_bv: "",
    rcs_ville: "",
    rcs_num: "",
  });

  useEffect(() => {
    setLocalData({
      raison_sociale: localStorage.getItem("customer_social_reason") || "",
      capital: localStorage.getItem("customer_capital") || "",
      adresse_bv: localStorage.getItem("customer_address") || "",
      cp_bv: localStorage.getItem("customer_zipcode") || "",
      ville_bv: localStorage.getItem("customer_city") || "",
      rcs_ville: localStorage.getItem("customer_rcs_city") || "",
      rcs_num: localStorage.getItem("customer_rcs_number") || "",
    });
  }, []);

  const format = useFormatter();
  const startDateTime = new Date(singleRental.start_date);
  const endDateTime = new Date(singleRental.end_date);
  const startDate = format.dateTime(startDateTime, "short");
  const endDate = format.dateTime(endDateTime, "short");
  const timeDiff = endDateTime.getTime() - startDateTime.getTime();
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  const tRental = useTranslations("rentals");
  const [state, action, isPending] = useActionState(updateRental, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/locations/liste");
      toast.success(tRental("updatePage.success"));
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
    }
    if (errors) {
      for (const key in errors) {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) =>
            toast.error(msg, {
              className: "bg-amber-700 text-white",
            })
          );
        }
      }
    }
  }, [state, router, tRental]);

  const pdfObject = {
    type: "invoice",
    template_name: "invoice",
    template_title: "invoice",
    template_id: String(templateId),
    resolution_dpi: 300,
    content: {
      ...localData,
      id_location: singleRental.id,
      client_nom: singleRental.client,
      client_ville: singleRental.client_city,
      telephone: singleRental.phone,
      mail: singleRental.email,
      machine_pret: materialData.name,
      caution: singleRental.deposit,
      duree: days,
      date_debut: startDate,
      date_fin: endDate,
      prix_location_jour: Number(singleRental.rental_price) / days,
      id_materiel: materialData.id,
      accessoires: singleRental.accessories,
      commentaires: singleRental.comment,
      date_creation: "",
      prix_location: singleRental.rental_price,
      code_bv: "",
    },
    pdfType: "Rental" as "SAV" | "Rental",
  };

  return (
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <GoBackButton link="/locations/liste" />
      <div className="flex sm:flex-row flex-col sm:items-center gap-2 justify-between">
        <h1
          className={clsx(
            "text-xl font-semibold flex gap-2",
            singleRental.status === 0 ? "text-red-600" : "text-green-600"
          )}
        >
          {tRental("status.label")}:{" "}
          {singleRental.status === 1 ? (
            <span className="flex items-center gap-1">
              <FaCheck /> {tRental("status.inProgress")}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FaXmark /> {tRental("status.completed")}
            </span>
          )}
        </h1>
        <div className="flex items-center gap-2">
          {singleRental.status === 1 && (
            <ChangeRentalStatusForm id={String(singleRental.id)} />
          )}
          <GeneratePdf pdfObject={pdfObject} />
        </div>
      </div>
      <form action={action} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <input type="hidden" name="id" defaultValue={singleRental.id} />
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
            <ElInput
              name="client"
              placeholder={tRental("addPage.form.customer")}
              icon={<MdOutlinePerson className="text-blue-700" />}
              defaultValue={singleRental.client}
            />
            <ElInput
              name="client_city"
              placeholder={tRental("addPage.form.customerCity")}
              icon={<MdOutlineLocationCity className="text-blue-700" />}
              defaultValue={singleRental.client_city}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
            <ElInput
              name="phone"
              placeholder={tRental("addPage.form.phone")}
              icon={<MdOutlinePhone className="text-blue-700" />}
              defaultValue={singleRental.phone}
            />
            <ElInput
              name="email"
              placeholder="Email"
              icon={<MdOutlineMail className="text-blue-700" />}
              defaultValue={singleRental.email}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
            <div className="w-full sm:w-1/3">
              <label>{tRental("addPage.form.startDate")}</label>
              <ElInput
                type="text"
                disabled
                classNames="disabled:cursor-not-allowed"
                parentClassNames="bg-gray-300 cursor-not-allowed"
                id="date-input"
                defaultValue={startDate}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label>{tRental("addPage.form.endDate")}</label>
              <ElInput
                type="text"
                disabled
                classNames="disabled:cursor-not-allowed"
                parentClassNames="bg-gray-300 cursor-not-allowed"
                id="date-input"
                defaultValue={endDate}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label>{tRental("dates.daysNumber")}</label>
              <ElInput
                type="text"
                disabled
                classNames="disabled:cursor-not-allowed"
                parentClassNames="bg-gray-300 cursor-not-allowed"
                className="p-2 border rounded w-full"
                defaultValue={days}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
            <ElInput
              placeholder="Prix"
              disabled
              classNames="disabled:cursor-not-allowed"
              parentClassNames="bg-gray-300 cursor-not-allowed"
              icon={<MdEuro className="text-blue-700" />}
              defaultValue={singleRental.rental_price}
            />
            <ElInput
              name="acompte"
              placeholder={tRental("addPage.form.deposit")}
              icon={<MdOutlineCreditCard className="text-blue-700" />}
              defaultValue={singleRental.acompte}
            />
          </div>
          <div className="flex gap-1">
            <label>{tRental("material")}</label>
            <Link
              href={`/parc-materiel/liste/${materialData.id}`}
              className="text-gray-400 hover:underline hover:text-gray-500"
            >
              {materialData.name}
            </Link>
          </div>
          <ElTextarea
            name="accessories"
            placeholder={tRental("addPage.form.accessories")}
            icon={<FiTool className="text-blue-700" />}
            defaultValue={singleRental.accessories}
          />
          <ElTextarea
            name="comment"
            placeholder={tRental("addPage.form.comment")}
            icon={<BiComment className="text-blue-700" />}
            defaultValue={singleRental.comment}
          />
        </div>
        <div className="flex flex-col items-center gap-4 lg:gap-7">
          <ElButton
            type="submit"
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
            classNames="w-2/3 lg:w-1/4"
            label={tRental("updatePage.updateBtn")}
          />
        </div>
      </form>
    </div>
  );
};

export default RentalUpdateForm;
