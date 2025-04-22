"use client";

import ElButton from "@/components/custom/ElButton";
import ElInput from "@/components/custom/ElInput";
import ElSelect from "@/components/custom/ElSelect";
import ElTextarea from "@/components/custom/ElTextarea";
import { addNewContact } from "@/lib/actions/actions.contacts";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { GoShieldLock } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { LuInfo } from "react-icons/lu";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { RxMobile } from "react-icons/rx";
import { toast } from "react-toastify";

const RepertoireAjout = () => {
  const [state, action, isPending] = useActionState(addNewContact, {});
  const router = useRouter();

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      router.push("/repertoire/liste");
      toast.success("Ajouté avec succès.");
    }
    if (state.error) {
      toast.error(`${state.error.toString()}`, {
        className: "bg-amber-700 text-white",
      });
    }
    if (errors) {
      for (const key in errors) {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) =>
            toast.error(msg, {
              className: "bg-amber-700 text-white",
            })
          );
        }
      }
    }
  }, [state, router]);

  return (
    <div className="flex-grow max-sm:p-5 py-6 flex justify-center">
      <form
        action={action}
        className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
      >
        <div className="flex flex-col gap-4 ">
          <h1 className="text-xl font-semibold">Ajouter un contact</h1>
          <ElSelect
            name="access_level"
            icon={<GoShieldLock className="text-blue-700" />}
          >
            <option value={0}>Tout Public</option>
            <option value={1}>Manager</option>
            <option value={2}>Direction</option>
          </ElSelect>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              name="corporate_name"
              placeholder="Société"
              icon={<HiOutlineBuildingOffice className="text-blue-700" />}
            />
            <ElInput
              name="email"
              placeholder="Email"
              icon={<MdOutlineMail className="text-blue-700" />}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              name="firstname"
              placeholder="Prénom"
              icon={<PiIdentificationBadge className="text-blue-700" />}
            />
            <ElInput
              name="lastname"
              placeholder="Nom"
              icon={<PiIdentificationBadge className="text-blue-700" />}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
            <ElInput
              name="landline"
              placeholder="Tel"
              icon={<MdOutlinePhone className="text-blue-700" />}
            />
            <ElInput
              name="mobile"
              placeholder="Mobile"
              icon={<RxMobile className="text-blue-700" />}
            />
          </div>
          <ElTextarea
            icon={<LuInfo className="text-blue-700" />}
            placeholder={"Infomations complétemantaires"}
            name="additional_data"
          />
        </div>
        <div className="flex justify-center gap-5">
          <ElButton
            label="Ajouter"
            type="submit"
            disabled={isPending}
            classNames="self-center w-2/3 lg:w-1/4"
          />
        </div>
      </form>
    </div>
  );
};

export default RepertoireAjout;
