import { getCustomStatuses } from "@/lib/actions/actions.sav";
import { formatSavStatus } from "@/lib/utils";
import { CustomSavStatus, SavEvolutionData } from "@/types";
import clsx from "clsx";
import { getFormatter, getTranslations } from "next-intl/server";

type Props = {
  savEvolution: SavEvolutionData[];
  savDate: string;
};

const SavEvolutionTable = async ({ savEvolution, savDate }: Props) => {
  const format = await getFormatter();
  const t = await getTranslations("sav");
  const customStatuses: CustomSavStatus[] = await getCustomStatuses(true);

  return (
    <div className="flex flex-col text-sm md:text-[10px] gap-2 bg-gray-200 shadow-sm p-4 rounded-sm">
      <div className="flex items-center gap-3">
        <div className="font-bold text-gray-800 w-1/2 rounded uppercase bg-gray-300 p-2">
          Date
        </div>
        <div className="font-bold text-gray-800 w-1/2 rounded uppercase bg-gray-300 p-2">
          {t("updatePage.savEvolution.status")}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {savEvolution && savEvolution.length > 0 && (
          <>
            {savEvolution.map((item) => {
              const statusNumber = Number(item.status);

              const isStandardStatus = statusNumber >= 0 && statusNumber <= 5;

              if (isStandardStatus) {
                return (
                  <div key={item.id} className="flex flex-col gap-0.5">
                    <div className="flex w-full gap-3 items-stretch">
                      <div
                        className={clsx(
                          "flex self-stretch items-center w-1/2 p-2 rounded shadow",
                          "bg-gray-100"
                        )}
                      >
                        {format.dateTime(new Date(item.created_at), "short")}
                      </div>
                      <div
                        className={clsx(
                          "flex self-stretch items-center w-1/2 p-2 rounded shadow",
                          formatSavStatus(String(item.status)).classNames
                        )}
                      >
                        {t(
                          `statuses.${formatSavStatus(String(item.status)).key}`
                        )}
                      </div>
                    </div>
                    {item.details && (
                      <div
                        className={clsx(
                          "p-2 rounded shadow",
                          formatSavStatus(String(item.status)).classNames
                        )}
                      >
                        {item.details}
                      </div>
                    )}
                  </div>
                );
              } else {
                const customStatus = customStatuses.find(
                  (el) => el.id === Number(item.status)
                );

                return (
                  <div key={item.id} className="flex flex-col gap-0.5">
                    <div className="flex w-full gap-3 items-stretch">
                      <div
                        className={clsx(
                          "flex self-stretch items-center w-1/2 p-2 rounded shadow",
                          "bg-gray-100"
                        )}
                      >
                        {format.dateTime(new Date(item.created_at), "short")}
                      </div>
                      <div
                        style={{
                          backgroundColor: customStatus?.color_background,
                          color: customStatus?.color_font,
                        }}
                        className={clsx(
                          "flex self-stretch items-center w-1/2 p-2 rounded shadow"
                        )}
                      >
                        {customStatus
                          ? customStatus.statut
                          : "Statut introuvable"}
                      </div>
                    </div>
                    {item.details && (
                      <div
                        style={{
                          backgroundColor: customStatus?.color_background,
                          color: customStatus?.color_font,
                        }}
                        className={clsx("p-2 rounded shadow")}
                      >
                        {item.details}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </>
        )}

        <div className="flex w-full gap-3 items-stretch">
          <div
            className={clsx(
              "flex self-stretch items-center w-1/2 p-2 rounded shadow",
              "bg-gray-100"
            )}
          >
            {format.dateTime(new Date(savDate), "short")}
          </div>
          <div
            className={clsx(
              "flex self-stretch items-center w-1/2 p-2 rounded shadow",
              formatSavStatus(String(0)).classNames
            )}
          >
            {t(`statuses.${formatSavStatus(String(0)).key}`)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavEvolutionTable;
