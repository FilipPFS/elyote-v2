import React from "react";
import ElSelect from "./custom/ElSelect";
import { GoShieldLock } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import ElInput from "./custom/ElInput";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { RxMobile } from "react-icons/rx";
import ElTextarea from "./custom/ElTextarea";
import { LuInfo } from "react-icons/lu";
import ElButton from "./custom/ElButton";
import { ContactData } from "@/types";

type Props = {
  isPending?: boolean;
  action?: (payload: FormData) => void;
  updatePage: boolean;
  contactData?: ContactData;
  id?: string;
};

const ContactForm = ({
  isPending,
  action,
  updatePage,
  contactData,
  id,
}: Props) => {
  return (
    <form
      action={action}
      className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
    >
      <div className="flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold">
          {updatePage ? "Modifier" : "Ajouter"} un contact
        </h1>
        <ElSelect
          name="access_level"
          defaultValue={updatePage ? contactData?.access_level : ""}
          icon={<GoShieldLock className="text-blue-700" />}
        >
          <option value={0}>Tout Public</option>
          <option value={1}>Manager</option>
          <option value={2}>Direction</option>
        </ElSelect>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          {updatePage && <input name="id" defaultValue={id} type="hidden" />}
          <ElInput
            name="corporate_name"
            defaultValue={updatePage ? contactData?.corporate_name : ""}
            placeholder="Société"
            icon={<HiOutlineBuildingOffice className="text-blue-700" />}
          />
          <ElInput
            name="email"
            placeholder="Email"
            defaultValue={updatePage ? contactData?.email : ""}
            icon={<MdOutlineMail className="text-blue-700" />}
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="firstname"
            placeholder="Prénom"
            defaultValue={updatePage ? contactData?.firstname : ""}
            icon={<PiIdentificationBadge className="text-blue-700" />}
          />
          <ElInput
            name="lastname"
            placeholder="Nom"
            defaultValue={updatePage ? contactData?.lastname : ""}
            icon={<PiIdentificationBadge className="text-blue-700" />}
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            name="landline"
            placeholder="Tel"
            defaultValue={updatePage ? contactData?.landline : ""}
            icon={<MdOutlinePhone className="text-blue-700" />}
          />
          <ElInput
            name="mobile"
            placeholder="Mobile"
            defaultValue={updatePage ? contactData?.mobile : ""}
            icon={<RxMobile className="text-blue-700" />}
          />
        </div>
        <ElTextarea
          icon={<LuInfo className="text-blue-700" />}
          placeholder={"Infomations complétemantaires"}
          defaultValue={updatePage ? contactData?.additional_data : ""}
          name="additional_data"
        />
      </div>
      <div className="flex justify-center gap-5">
        <ElButton
          label={updatePage ? "Modifier" : "Ajouter"}
          type="submit"
          disabled={isPending}
          classNames="self-center w-2/3 lg:w-1/4"
        />
      </div>
    </form>
  );
};

export default ContactForm;
