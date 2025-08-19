import ParcelCard from "@/components/Parcels/ParcelCard";
import { getParcelById, getStorageZone } from "@/lib/actions/actions.parcels";
import { ListeEntrepots, PackageData } from "@/types";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ColisId = async ({ params }: Props) => {
  const { id } = await params;

  const parcel: PackageData = await getParcelById(id);

  if (!parcel) {
    return (
      <div>
        <h2>Colis non trouvé</h2>
        <p>Il semble que cet colis ait été supprimé.</p>

        <Link href="/cmd/colis">Retour à la liste</Link>
      </div>
    );
  }

  const storageZone: ListeEntrepots = await getStorageZone();

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <ParcelCard parcel={parcel} listeEntrepots={storageZone} />
    </div>
  );
};

export default ColisId;
