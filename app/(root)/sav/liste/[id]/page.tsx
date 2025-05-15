import SavUpdateForm from "@/components/SavUpdateForm";
import { getMaterialById } from "@/lib/actions/actions.material";
import { getSavById } from "@/lib/actions/actions.sav";
import { MaterialData, SavData } from "@/types";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleSavPage = async ({ params }: Props) => {
  const { id } = await params;

  const singleSav: SavData = await getSavById(id);

  let materialUsed: MaterialData | undefined = undefined;

  if (singleSav.lend_machine && singleSav.lend_machine !== "no") {
    materialUsed = await getMaterialById(String(singleSav.lend_machine));
  }

  return (
    <div className="max-sm:p-5 px-8 py-6 flex md:flex-row flex-col justify-center gap-6">
      <SavUpdateForm
        savData={singleSav}
        materialName={materialUsed ? materialUsed.name : ""}
      />
      <div className="p-6 bg-orange-400 rounded-md h-fit w-1/3">
        <h2 className="font-semibold">SAV Evolution</h2>
      </div>
    </div>
  );
};

export default SingleSavPage;
