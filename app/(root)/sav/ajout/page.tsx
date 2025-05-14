import SavFormAdd from "@/components/SavFormAdd";
import { getRentMaterials } from "@/lib/actions/actions.material";
import React from "react";

const SavAjout = async () => {
  const materials = await getRentMaterials();

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <SavFormAdd materials={materials} />
    </div>
  );
};

export default SavAjout;
