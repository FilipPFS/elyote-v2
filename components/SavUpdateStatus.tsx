"use client";

import ElSelect from "./custom/ElSelect";
import { CgOptions } from "react-icons/cg";
import { filterSavOptions } from "@/constants";
import ElInput from "./custom/ElInput";
import { MdInfo } from "react-icons/md";
import { useActionState, useEffect } from "react";
import { updateSavStatus } from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

type Props = {
  id: string;
};

const SavUpdateStatus = ({ id }: Props) => {
  const [state, action, isPending] = useActionState(updateSavStatus, {});
  const t = useTranslations("sav");

  useEffect(() => {
    if (state.success) {
      toast.success("Modifié avec succès.");
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
    }
  }, [state]);

  return (
    <div className="p-6 bg-yellow-200 rounded-md h-fit">
      <h2 className="font-semibold">{t("updatePage.savStatus.title")}</h2>
      <form action={action} className="mt-3 flex flex-col gap-2">
        <input type="hidden" defaultValue={id} name="id" />
        <ElSelect
          name="status"
          icon={<CgOptions className="text-blue-700" />}
          defaultValue={""}
          required
        >
          <option value="" disabled>
            {t("updatePage.savStatus.select")}
          </option>
          {filterSavOptions.slice(1).map((item) => (
            <option key={item.filterKey} value={item.filterKey}>
              {t(`statues.${item.label}`)}
            </option>
          ))}
        </ElSelect>
        <ElInput
          name="details"
          icon={<MdInfo className="text-blue-700" />}
          placeholder={t("updatePage.savStatus.comment")}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-400 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 duration-500 text-white rounded-sm px-6 py-2 cursor-pointer"
        >
          {t("updatePage.savStatus.btn")}
        </button>
      </form>
    </div>
  );
};

export default SavUpdateStatus;
