import React from "react";
import ElSelect from "./custom/ElSelect";
import { GoShieldLock } from "react-icons/go";
import ElInput from "./custom/ElInput";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuInfo } from "react-icons/lu";
import ElTextarea from "./custom/ElTextarea";
import ElButton from "./custom/ElButton";
import { PasswordData } from "@/types";
import DeletePasswordBtn from "./DeletePasswordBtn";
import CustomSpinner from "./custom/Spinner";
import { useTranslations } from "next-intl";
import { deleteSingleCredential } from "@/lib/actions/actions.credentials";
import GoBackButton from "./Global/GoBackButton";

type Props = {
  isPending?: boolean;
  action?: (payload: FormData) => void;
  updatePage: boolean;
  passwordData?: PasswordData;
  id?: string;
};

const PasswordForm = ({
  action,
  isPending,
  updatePage,
  passwordData,
  id,
}: Props) => {
  const t = useTranslations("credentials.form");
  return (
    <form
      action={action}
      className="flex flex-col justify-between gap-8 w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md "
    >
      <GoBackButton link="/identifiants/liste" />
      <div className="flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold">
          {updatePage ? t("titleUpdate") : t("titleAdd")}
        </h1>
        <ElSelect
          name="access_level"
          defaultValue={passwordData?.access_level}
          icon={<GoShieldLock className="text-blue-700" />}
        >
          <option value={0}>{t("select.one")}</option>
          <option value={1}>{t("select.two")}</option>
          <option value={2}>{t("select.three")}</option>
        </ElSelect>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            placeholder={t("platformPlaceholder")}
            icon={<MdOutlinePhonelinkRing className="text-blue-700" />}
            name="site"
            defaultValue={updatePage ? passwordData?.site : ""}
          />
          {updatePage && <input name="id" defaultValue={id} type="hidden" />}
          <ElInput
            placeholder={t("urlPlaceholder")}
            icon={<IoIosLink className="text-blue-700" />}
            name="url"
            defaultValue={updatePage ? passwordData?.url : ""}
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-7">
          <ElInput
            placeholder={t("usernamePlaceholder")}
            icon={<FiUser className="text-blue-700" />}
            name="login"
            defaultValue={updatePage ? passwordData?.login : ""}
          />
          <ElInput
            placeholder={t("passwordPlaceholder")}
            icon={<RiLockPasswordLine className="text-blue-700" />}
            name="password"
            defaultValue={
              updatePage
                ? passwordData?.password === false
                  ? ""
                  : String(passwordData?.password ?? "")
                : ""
            }
          />
        </div>
        <ElTextarea
          icon={<LuInfo className="text-blue-700" />}
          placeholder={t("description")}
          name="additional_data"
          defaultValue={updatePage ? passwordData?.additional_data : ""}
        />
      </div>
      <div className="flex justify-center gap-5">
        <ElButton
          label={updatePage ? t("btnUpdate") : t("btnAdd")}
          icon={isPending ? <CustomSpinner /> : undefined}
          disabled={isPending}
          type="submit"
          classNames="self-center w-2/3 lg:w-1/4"
        />
        {updatePage && id && (
          <DeletePasswordBtn
            id={id}
            customAction={deleteSingleCredential}
            pushLink="/identifiants/liste"
          />
        )}
      </div>
    </form>
  );
};

export default PasswordForm;
