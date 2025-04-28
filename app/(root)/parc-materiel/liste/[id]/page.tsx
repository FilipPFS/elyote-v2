import MaterialUpdatePage from "@/components/MaterialUpdatePage";
import { getMaterialById } from "@/lib/actions/actions.material";
import { MaterialData } from "@/types";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ParcMaterielPage = async ({ params }: Props) => {
  const { id } = await params;

  const materialData: MaterialData = await getMaterialById(id);

  if (!materialData) {
    return (
      <div>
        <h2>Materiel non trouvé</h2>
        <p>Il semble que cet Materiel ait été supprimé.</p>

        <Link href="/parc-materiel/liste">Retour à la liste</Link>
      </div>
    );
  }
  return (
    <div>
      <MaterialUpdatePage materialData={materialData} />
    </div>
  );
};

export default ParcMaterielPage;
