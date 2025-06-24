import React from "react";
import ElSelect from "./custom/ElSelect";
import ElInput from "./custom/ElInput";
import ElButton from "./custom/ElButton";
import { MaterialData } from "@/types";
import CustomSpinner from "./custom/Spinner";
import { MdDevices, MdEuro } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { FaRegHandshake } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";
import DeletePasswordBtn from "./DeletePasswordBtn";
import { deleteSingleMaterial } from "@/lib/actions/actions.material";
import { useTranslations } from "next-intl";
import GoBackButton from "./Global/GoBackButton";

const materialSelectOptions = [
  {
    value: "printer",
  },
  {
    value: "phone",
  },
  {
    value: "projector",
  },
  {
    value: "other",
  },
];

type Props = {
  isPending?: boolean;
  action?: (payload: FormData) => void;
  updatePage: boolean;
  materialData?: MaterialData;
  id?: string;
};

const MaterialForm = ({
  action,
  isPending,
  updatePage,
  materialData,
  id,
}: Props) => {
  const tMaterial = useTranslations("material");
  const tGlobal = useTranslations("global");
  return (
    <form
      action={action}
      className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 h-fit rounded-md "
    >
      <div className="flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold">
          {updatePage ? tMaterial("updateTitle") : tMaterial("addTitle")}
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="name"
            icon={<MdDevices className="text-blue-700" />}
            defaultValue={updatePage ? materialData?.name : ""}
            placeholder={tMaterial("form.namePlaceholder")}
          />
          <input type="hidden" name="id" defaultValue={id} />
          <ElSelect
            name="type"
            defaultValue={updatePage ? materialData?.type : ""}
            icon={<CgOptions className="text-blue-700" />}
          >
            <option value="" disabled>
              {tMaterial("form.selectType")}
            </option>
            {materialSelectOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {tMaterial(`types.${item.value}`)}
              </option>
            ))}
          </ElSelect>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElSelect
            name="lend"
            defaultValue={updatePage ? materialData?.lend : ""}
            icon={<FaRegHandshake className="text-blue-700" />}
          >
            <option value="" disabled>
              {tMaterial("form.lendSelect")}
            </option>
            <option value={0}>{tGlobal("no")}</option>
            <option value={1}>{tGlobal("yes")}</option>
          </ElSelect>
          <ElSelect
            name="rent"
            defaultValue={updatePage ? materialData?.rent : ""}
            icon={<FaRegHandshake className="text-blue-700" />}
          >
            <option value="" disabled>
              {tMaterial("form.rentSelect")}
            </option>
            <option value={0}>{tGlobal("no")}</option>
            <option value={1}>{tGlobal("yes")}</option>
          </ElSelect>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="daily_rate"
            defaultValue={updatePage ? materialData?.daily_rate : ""}
            icon={<MdEuro className="text-blue-700" />}
            placeholder={tMaterial("form.dailyRatePlaceholder")}
          />
          <ElInput
            name="deposit"
            icon={<IoPricetagOutline className="text-blue-700" />}
            defaultValue={updatePage ? materialData?.deposit : ""}
            placeholder={tMaterial("form.depositPlaceholder")}
          />
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">{tMaterial("form.status")}</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="correct-state">{tMaterial("form.available")}</label>
            <input
              type="radio"
              name="state"
              id="correct-state"
              value="1"
              defaultChecked={!updatePage ? true : materialData?.state === 1}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="bad-state">{tMaterial("form.notAvailable")}</label>
            <input
              type="radio"
              name="state"
              id="bad-state"
              value="0"
              defaultChecked={updatePage ? materialData?.state === 0 : false}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <ElButton
          label={updatePage ? tMaterial("btnUpdate") : tMaterial("btnAdd")}
          type="submit"
          disabled={isPending}
          icon={isPending ? <CustomSpinner /> : undefined}
          classNames="self-center w-2/3 lg:w-1/4"
        />
        {updatePage && id && (
          <DeletePasswordBtn
            id={id}
            customAction={deleteSingleMaterial}
            pushLink="/parc-materiel/liste"
          />
        )}
      </div>
      <GoBackButton link="/parc-materiel/liste" />
    </form>
  );
};

export default MaterialForm;
