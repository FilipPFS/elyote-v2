"use client";

import { RentalData } from "@/types";
import React, { useActionState, useEffect } from "react";
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
import { getDateDifferenceInDays } from "@/lib/utils";
import Link from "next/link";
import clsx from "clsx";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { updateRental } from "@/lib/actions/actions.rental";
import ChangeRentalStatusForm from "./ChangeRentalStatusForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  singleRental: RentalData;
  materialData: {
    name: string;
    id: number;
  };
};

const RentalUpdateForm = ({ singleRental, materialData }: Props) => {
  const format = useFormatter();
  const startDateTime = new Date(singleRental.start_date);
  const endDateTime = new Date(singleRental.end_date);
  const startDate = format.dateTime(startDateTime, "short");
  const endDate = format.dateTime(endDateTime, "short");
  const differenceHere = getDateDifferenceInDays(startDateTime, endDateTime);
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

  return (
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
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
        {singleRental.status === 1 && (
          <ChangeRentalStatusForm id={String(singleRental.id)} />
        )}
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
                defaultValue={differenceHere}
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
        <div className="flex flex-col gap-4 lg:gap-7">
          <button
            className="w-32 bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 justify-center text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10"
            type="submit"
            disabled={isPending}
          >
            {tRental("updatePage.updateBtn")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalUpdateForm;
