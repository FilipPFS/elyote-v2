import MainPage from "@/components/Mobile/MainPage";
import AddStatusForm from "@/components/Sav/AddStatusForm";
import SavStatusUpdateForm from "@/components/Sav/SavStatusUpdateForm";
import { getCustomStatuses } from "@/lib/actions/actions.sav";
import { CustomSavStatus } from "@/types";
import React from "react";
import { GrStatusDisabled } from "react-icons/gr";

const ReglagesSav = async () => {
  const savStatuses: CustomSavStatus[] = await getCustomStatuses();

  return (
    <MainPage title="Reglages SAV">
      <div className="flex flex-col gap-5 mt-3">
        <div className="flex flex-col gap-2 md:items-center md:flex-row justify-between">
          <h2 className="text-lg flex items-center gap-3 font-bold">
            <span>
              <GrStatusDisabled />
            </span>
            Les status personnalisés
          </h2>
          <AddStatusForm />
        </div>
        <div className="flex bg-white p-3 py-5 md:p-6 rounded-lg shadow flex-col gap-8 md:gap-4">
          {savStatuses.map((item) => (
            <SavStatusUpdateForm key={item.id} item={item} />
          ))}
        </div>
      </div>
    </MainPage>
  );
};

export default ReglagesSav;
