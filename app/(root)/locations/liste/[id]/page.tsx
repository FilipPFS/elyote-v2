import RentalUpdateForm from "@/components/RentalUpdateForm";
import { getMaterialById } from "@/lib/actions/actions.material";
import { getRentalById } from "@/lib/actions/actions.rental";
import {
  getPrintersList,
  getSinglePrinter,
} from "@/lib/actions/printer.actions";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleRentalPage = async ({ params }: Props) => {
  const { id } = await params;
  const tRental = await getTranslations("rentals");

  // Parallel fetching (now optimized for Next.js 15)
  const [singleRental, printerList, printFetch] = await Promise.all([
    getRentalById(id),
    getPrintersList(),
    getSinglePrinter("document"),
  ]);

  if (!singleRental) {
    return (
      <div className="p-6">
        <h2>{tRental("updatePage.idNotFound")}</h2>
        <p>{tRental("updatePage.idDeleted")}</p>
        <Link href="/locations/liste">{tRental("updatePage.backToList")}</Link>
      </div>
    );
  }

  const materialUsed = await getMaterialById(String(singleRental.id_material));

  if (!materialUsed) {
    return <div>Materiel n'existe pas.</div>;
  }
  const templateId = process.env.PDF_RENTAL_TEMPLATE_ID;

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <RentalUpdateForm
        singleRental={singleRental}
        materialData={{ name: materialUsed.name, id: materialUsed.id }}
        templateId={String(templateId)}
        pdfModule={printFetch?.data}
        printerList={printerList}
      />
    </div>
  );
};

export default SingleRentalPage;
