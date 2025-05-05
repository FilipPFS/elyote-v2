"use client";

import { RentalData } from "@/types";
import React from "react";
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
import { useFormatter } from "next-intl";
import { getDateDifferenceInDays } from "@/lib/utils";
import Link from "next/link";
import clsx from "clsx";
import { FaCheck, FaXmark } from "react-icons/fa6";

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

  console.log("difference", differenceHere);

  return (
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1
          className={clsx(
            "text-xl font-semibold flex gap-2",
            singleRental.status === 0 ? "text-red-600" : "text-green-600"
          )}
        >
          Statut:{" "}
          {singleRental.status === 1 ? (
            <span className="flex items-center gap-1">
              <FaCheck /> En Cours
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FaXmark /> Terminée
            </span>
          )}
        </h1>
        {singleRental.status === 1 && (
          <form>
            <button className="bg-green-700 text-white px-4 py-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-800 active:bg-green-900">
              Mettre fin à la location
            </button>
          </form>
        )}
      </div>
      <form action={""} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
            <ElInput
              name="client"
              placeholder="Client"
              icon={<MdOutlinePerson className="text-blue-700" />}
              defaultValue={singleRental.client}
            />
            <ElInput
              name="client_city"
              placeholder="Ville du client"
              icon={<MdOutlineLocationCity className="text-blue-700" />}
              defaultValue={singleRental.client_city}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
            <ElInput
              name="phone"
              placeholder="Tél"
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
            <div className="w-1/3">
              <label>Date de début</label>
              <ElInput
                type="text"
                name="start_date"
                disabled
                classNames="disabled:cursor-not-allowed"
                parentClassNames="bg-gray-300 cursor-not-allowed"
                id="date-input"
                defaultValue={startDate}
              />
            </div>
            <div className="w-1/3">
              <label>Date de fin</label>
              <ElInput
                type="text"
                name="end_date"
                disabled
                classNames="disabled:cursor-not-allowed"
                parentClassNames="bg-gray-300 cursor-not-allowed"
                id="date-input"
                defaultValue={endDate}
              />
            </div>
            <div className="w-1/3">
              <label>Nombre de jours</label>
              <ElInput
                type="text"
                name="difference_date"
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
              name="rental_price"
              placeholder="Prix"
              disabled
              classNames="disabled:cursor-not-allowed"
              parentClassNames="bg-gray-300 cursor-not-allowed"
              icon={<MdEuro className="text-blue-700" />}
              defaultValue={singleRental.rental_price}
            />
            <ElInput
              name="acompte"
              placeholder="acompte"
              icon={<MdOutlineCreditCard className="text-blue-700" />}
              defaultValue={singleRental.acompte}
            />
          </div>
          <div className="flex gap-1">
            <label>Matériel</label>
            <Link
              href={`/parc-materiel/liste/${materialData.id}`}
              className="text-gray-400 hover:underline hover:text-gray-500"
            >
              {materialData.name}
            </Link>
          </div>
          <ElTextarea
            name="accessories"
            placeholder="Accessoires"
            icon={<FiTool className="text-blue-700" />}
            defaultValue={singleRental.accessories}
          />
          <ElTextarea
            name="comment"
            placeholder="Commentaires"
            icon={<BiComment className="text-blue-700" />}
            defaultValue={singleRental.comment}
          />
        </div>
        <div className="flex flex-col gap-4 lg:gap-7">
          <button
            className="w-32 bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 justify-center text-sm cursor-pointer transition-all duration-500 hover:bg-blue-800 text-white rounded-md h-10"
            type="submit"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalUpdateForm;
