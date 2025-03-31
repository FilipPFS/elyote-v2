"use client";

import { scanData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const ScanContent = () => {
  const [action, setAction] = useState("");

  return (
    <div className="sm:p-4 p-8 flex flex-col gap-7">
      <Image
        src={scanData.img}
        alt={scanData.title}
        width={200}
        className="self-center"
        height={200}
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{scanData.title}</h2>
        <span>
          Code bv: <span className="font-semibold">{scanData.bvCode}</span>
        </span>
        <span>
          Prix TTC:{" "}
          <span className="font-semibold">
            {scanData.ttcPrice} Prix HT: {scanData.htPrice}
          </span>
        </span>
        <span>
          Eco Taxe:{" "}
          <span className="font-semibold">
            {scanData.ecoTaxe} TVA: {scanData.tvaPrice}
          </span>
        </span>
        <span className="font-semibold">
          Stock: <span>{scanData.quantity}</span>
        </span>
      </div>
      <Link href={"#"} className="self-center">
        <button className="bg-blue-700 px-5 py-1.5 rounded-lg text-white">
          Voir Plus
        </button>
      </Link>
      <select
        id="competition"
        name="competition"
        className="p-2 rounded-lg text-black border-gray-300 border-2"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      >
        <option value="" disabled>
          Choisir une action
        </option>
      </select>
      <form className="flex flex-col gap-7">
        <div className="flex items-center gap-4 w-full p-2 border-gray-300 border-2 rounded-lg">
          <span>
            <CiSearch size={24} className="block text-black" />
          </span>
          <input
            type="text"
            placeholder="Numéro EAN..."
            className="focus:outline-none focus:ring-0 w-full text-black text-sm"
          />
        </div>
        <button className="self-center bg-blue-700 px-5 py-1.5 rounded-lg text-white">
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default ScanContent;
