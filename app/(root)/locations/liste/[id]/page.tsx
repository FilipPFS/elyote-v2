import RentalUpdateForm from "@/components/RentalUpdateForm";
import { getMaterialById } from "@/lib/actions/actions.material";
import { getRentalById } from "@/lib/actions/actions.rental";
import { MaterialData, RentalData } from "@/types";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleRentalPage = async ({ params }: Props) => {
  const { id } = await params;
  const tRental = await getTranslations("rentals");

  const singleRental: RentalData = await getRentalById(id);

  if (!singleRental) {
    return (
      <div>
        <h2>{tRental("updatePage.idNotFound")}</h2>
        <p>{tRental("updatePage.idDeleted")}</p>

        <Link href="/locations/liste">{tRental("updatePage.backToList")}</Link>
      </div>
    );
  }

  const materialUsed: MaterialData = await getMaterialById(
    String(singleRental.id_material)
  );

  const templateId = process.env.PDF_RENTAL_TEMPLATE_ID;

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <RentalUpdateForm
        singleRental={singleRental}
        materialData={{ name: materialUsed.name, id: materialUsed.id }}
        templateId={String(templateId)}
      />
    </div>
  );
};

export default SingleRentalPage;
