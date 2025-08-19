import ParcelForm from "@/components/Parcels/ParcelForm";
import { getStorageZone } from "@/lib/actions/actions.parcels";
import { ListeEntrepots } from "@/types";
import React from "react";

const ColisAjout = async () => {
  const storageZone: ListeEntrepots = await getStorageZone();

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <ParcelForm listeEntrepots={storageZone} />
    </div>
  );
};

export default ColisAjout;
