import RentalFormAdd from "@/components/RentalFormAdd";
import { getRentMaterials } from "@/lib/actions/actions.material";
import React from "react";

const LocationsAjout = async () => {
  const materials = await getRentMaterials();

  if (!materials) return;

  console.log("materials", materials);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <RentalFormAdd materials={materials} />
    </div>
  );
};

export default LocationsAjout;
