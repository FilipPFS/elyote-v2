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

const materialSelectOptions = [
  {
    value: "printer",
    labelKey: "Imprimante",
  },
  {
    value: "phone",
    labelKey: "Téléphone",
  },
  {
    value: "projector",
    labelKey: "Projecteur",
  },
  {
    value: "other",
    labelKey: "Autre",
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
  return (
    <form
      action={action}
      className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 h-fit rounded-md "
    >
      <div className="flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold">
          {updatePage ? "Mettre à jour" : "Ajouter"} un matériel
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="name"
            icon={<MdDevices className="text-blue-700" />}
            defaultValue={updatePage ? materialData?.name : ""}
            placeholder={"Nom de l'appareil"}
          />
          <input type="hidden" name="id" defaultValue={id} />
          <ElSelect
            name="type"
            defaultValue={updatePage ? materialData?.type : ""}
            icon={<CgOptions className="text-blue-700" />}
          >
            <option value="" disabled>
              Choisir le type
            </option>
            {materialSelectOptions.map((item) => (
              <option key={item.labelKey} value={item.value}>
                {item.labelKey}
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
              Disponible pour prêt
            </option>
            <option value={0}>Non</option>
            <option value={1}>Oui</option>
          </ElSelect>
          <ElSelect
            name="rent"
            defaultValue={updatePage ? materialData?.rent : ""}
            icon={<FaRegHandshake className="text-blue-700" />}
          >
            <option value="" disabled>
              Disponible pour location
            </option>
            <option value={0}>Non</option>
            <option value={1}>Oui</option>
          </ElSelect>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="daily_rate"
            defaultValue={updatePage ? materialData?.daily_rate : ""}
            icon={<MdEuro className="text-blue-700" />}
            placeholder={"Prix à la journée en location"}
          />
          <ElInput
            name="deposit"
            icon={<IoPricetagOutline className="text-blue-700" />}
            defaultValue={updatePage ? materialData?.deposit : ""}
            placeholder={"Caution ou prix d'achat"}
          />
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">État:</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="correct-state">Disponible</label>
            <input
              type="radio"
              name="state"
              id="correct-state"
              value="1"
              defaultChecked={!updatePage ? true : materialData?.state === 1}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="bad-state">Non Disponible</label>
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
          label={updatePage ? "Modifier" : "Ajouter"}
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
    </form>
  );
};

export default MaterialForm;
