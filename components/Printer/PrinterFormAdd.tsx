"use client";

import { HiOutlineBuildingOffice } from "react-icons/hi2";
import ElInput from "../custom/ElInput";

const PrinterFormAdd = () => {
  return (
    <form
      action={""}
      className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
    >
      <div className="flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold">Ajouter une imprimante</h1>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="module"
            placeholder={"Nom du module"}
            icon={<HiOutlineBuildingOffice className="text-blue-700" />}
          />
        </div>
      </div>
    </form>
  );
};

export default PrinterFormAdd;
