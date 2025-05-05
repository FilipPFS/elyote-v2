import RentalUpdateForm from "@/components/RentalUpdateForm";
import { getMaterialById } from "@/lib/actions/actions.material";
import { getRentalById } from "@/lib/actions/actions.rental";
import { MaterialData, RentalData } from "@/types";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleRentalPage = async ({ params }: Props) => {
  const { id } = await params;

  const singleRental: RentalData = await getRentalById(id);

  if (!singleRental) {
    return (
      <div>
        <h2>Location non trouvé</h2>
        <p>Il semble que cet Location ait été supprimé.</p>

        <Link href="/locations/liste">Retour à la liste</Link>
      </div>
    );
  }

  const materialUsed: MaterialData = await getMaterialById(
    String(singleRental.id_material)
  );

  console.log("material name", materialUsed.name);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <RentalUpdateForm
        singleRental={singleRental}
        materialData={{ name: materialUsed.name, id: materialUsed.id }}
      />
    </div>
  );
};

export default SingleRentalPage;
