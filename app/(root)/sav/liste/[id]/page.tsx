import GeneratePdf from "@/components/GeneratePdf";
import SavEvolutionTable from "@/components/SavEvolutionTable";
import SavUpdateForm from "@/components/SavUpdateForm";
import SavUpdateStatus from "@/components/SavUpdateStatus";
import { pdfContent } from "@/constants/data";
import { getMaterialById } from "@/lib/actions/actions.material";
import { getSavById, getSavEvolutionById } from "@/lib/actions/actions.sav";
import { MaterialData, SavData, SavEvolutionData } from "@/types";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleSavPage = async ({ params }: Props) => {
  const { id } = await params;

  const singleSav: SavData = await getSavById(id);
  const savEvolutionFetch: { sav_evolution: SavEvolutionData[] } =
    await getSavEvolutionById(id);
  const savEvolution = savEvolutionFetch?.sav_evolution;

  console.log("evolution", savEvolution);

  let materialUsed: MaterialData | undefined = undefined;

  if (singleSav.lend_machine && singleSav.lend_machine !== "no") {
    materialUsed = await getMaterialById(String(singleSav.lend_machine));
  }

  const templateId = process.env.PDF_SAV_TEMPLATE_ID;

  const pdfObject = {
    type: "invoice",
    template_name: "invoice",
    template_title: "invoice",
    template_id: String(templateId),
    resolution_dpi: 300,
    content: pdfContent,
    pdfType: "SAV" as "SAV" | "Rental",
  };

  return (
    <div className="max-sm:p-5 px-8 py-6 flex md:flex-row flex-col justify-center gap-6">
      <SavUpdateForm
        savData={singleSav}
        materialName={materialUsed ? materialUsed.name : ""}
      />
      <div className="flex flex-col gap-4 w-full md:w-2/5">
        <GeneratePdf pdfObject={pdfObject} />
        <SavUpdateStatus id={id} />
        <SavEvolutionTable
          savEvolution={savEvolution}
          savDate={singleSav.created_at}
        />
      </div>
    </div>
  );
};

export default SingleSavPage;
