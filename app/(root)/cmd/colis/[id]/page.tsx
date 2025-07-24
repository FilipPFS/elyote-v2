import ParcelCard from "@/components/Parcels/ParcelCard";
import { getParcelById } from "@/lib/actions/actions.parcels";
import { PackageData } from "@/types";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ColisId = async ({ params }: Props) => {
  const { id } = await params;

  const parcel: PackageData = await getParcelById(id);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <ParcelCard parcel={parcel} />
    </div>
  );
};

export default ColisId;
