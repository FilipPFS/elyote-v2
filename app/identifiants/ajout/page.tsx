import ElButton from "@/components/custom/ElButton";
import ElInput from "@/components/custom/ElInput";
import ElSelect from "@/components/custom/ElSelect";
import ElTextarea from "@/components/custom/ElTextarea";
import React from "react";
import { FiUser } from "react-icons/fi";
import { GoShieldLock } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { LuInfo } from "react-icons/lu";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const IdentifiantsAjout = () => {
  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <form
        action=""
        className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
      >
        <div className="flex flex-col gap-4 ">
          <h1 className="text-xl font-semibold">Formulaire</h1>
          <ElSelect icon={<GoShieldLock className="text-blue-700" />} />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              placeholder="Plateforme (site, logiciel, etc.)"
              icon={<MdOutlinePhonelinkRing className="text-blue-700" />}
            />
            <ElInput
              placeholder="Url du site internet"
              icon={<IoIosLink className="text-blue-700" />}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              placeholder="Nom d'utilisateur"
              icon={<FiUser className="text-blue-700" />}
            />
            <ElInput
              placeholder="Mot de passe"
              icon={<RiLockPasswordLine className="text-blue-700" />}
            />
          </div>
          <ElTextarea
            icon={<LuInfo className="text-blue-700" />}
            placeholder="Informations complémentaires..."
          />
        </div>
        <ElButton
          label="Ajouter"
          type="submit"
          classNames="self-center w-2/3 lg:w-1/4"
        />
      </form>
    </div>
  );
};

export default IdentifiantsAjout;
