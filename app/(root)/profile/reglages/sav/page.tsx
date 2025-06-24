import MainPage from "@/components/Mobile/MainPage";
import SavStatusUpdateForm from "@/components/Sav/SavStatusUpdateForm";
import StatusForm from "@/components/Sav/StatusForm";
import { filterSavOptions } from "@/constants";
import { getCustomStatuses } from "@/lib/actions/actions.sav";
import { CustomSavStatus } from "@/types";
import { getTranslations } from "next-intl/server";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { GrStatusDisabled } from "react-icons/gr";

const ReglagesSav = async () => {
  const savStatuses: CustomSavStatus[] = await getCustomStatuses(false);

  console.log("sav", savStatuses);

  const t = await getTranslations("sav");

  const colorMap: Record<string, string> = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
  };

  return (
    <MainPage title={t("settingsPage.title")}>
      <div className="flex flex-col gap-5 mt-3">
        <div className="flex flex-col gap-2 md:items-center md:flex-row justify-between">
          <h2 className="text-lg flex items-center gap-3 font-bold">
            <span>
              <GrStatusDisabled />
            </span>
            {t("settingsPage.miniTitle")}
          </h2>
          <StatusForm icon={<FaPlusCircle />} updatePage={false} />
        </div>
        <div className="flex bg-white p-3 py-5 md:p-6 rounded-lg shadow flex-col gap-10 md:gap-6">
          <section className="flex flex-col gap-4">
            <h3 className="text-[17px] font-semibold">
              {t("settingsPage.defaultTitle")}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {filterSavOptions.slice(1).map((item) => (
                <span
                  key={item.filterKey}
                  className={`${
                    colorMap[item.color] || "bg-gray-400"
                  } py-1.5 px-4 text-sm rounded md:w-fit w-full text-white`}
                >
                  {t(`statuses.${item.label}`)}
                </span>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="text-[17px] font-semibold">
              {t("settingsPage.customTitle")}
            </h3>
            {savStatuses?.map((item) => (
              <SavStatusUpdateForm key={item.id} item={item} />
            ))}
          </section>
        </div>
      </div>
    </MainPage>
  );
};

export default ReglagesSav;
