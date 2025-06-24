"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import ElInput from "./custom/ElInput";
import { FaBarcode, FaTruck } from "react-icons/fa6";
import ElSelect from "./custom/ElSelect";
import {
  MdFileDownload,
  MdOutlineAttachFile,
  MdOutlineComment,
  MdOutlineHandshake,
  MdOutlineMail,
  MdOutlineNumbers,
  MdOutlinePerson,
  MdOutlinePhone,
} from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";
import { SavData } from "@/types";
import { PiClockCountdownBold } from "react-icons/pi";
import { GrStatusInfo } from "react-icons/gr";
import ElTextarea from "./custom/ElTextarea";
import { FiTool } from "react-icons/fi";
import { LuMessageSquare } from "react-icons/lu";
import Link from "next/link";
import { updateSav } from "@/lib/actions/actions.sav";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import ElButton from "./custom/ElButton";
import CustomSpinner from "./custom/Spinner";
import GoBackButton from "./Global/GoBackButton";

type Props = {
  savData: SavData;
  materialName: string;
};

const SavUpdateForm = ({ savData, materialName }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [warranty, setWarranty] = useState(savData.warranty);
  const formattedDate = savData.date_purchase.split(" ")[0];
  const [state, action, isPending] = useActionState(updateSav, {});
  const router = useRouter();
  const t = useTranslations("sav");
  const tGlobal = useTranslations("global");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  useEffect(() => {
    const { errors } = state;

    if (state.success) {
      // router.push("/sav/liste");
      toast.success(tGlobal("notifications.updateSuccess"));
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
            toast.error(t(`${msg}`), {
              className: "bg-amber-700 text-white",
            })
          );
        }
      }
    }
  }, [state, router, t, tGlobal]);

  return (
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {t("updatePage.title")}: {savData.code_sav}
      </h1>
      <div>
        <form action={action} className="flex flex-col gap-4">
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">
              {t("updatePage.clientInfo")}
            </h3>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <input type="hidden" name="id" defaultValue={savData.id} />
              {/* <ElSelect
                icon={<MdOutlineHandshake className="text-blue-700" />}
                name="status"
                defaultValue={savData.status}
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </ElSelect> */}
              <ElInput
                name="client"
                placeholder={t("addPage.secondStep.customer")}
                icon={<MdOutlinePerson className="text-blue-700" />}
                defaultValue={savData.client || ""}
              />
              <ElInput
                name="phone"
                placeholder={t("addPage.secondStep.phone")}
                icon={<MdOutlinePhone className="text-blue-700" />}
                defaultValue={savData.phone || ""}
              />
            </div>
            <ElInput
              name="email"
              placeholder={t("addPage.secondStep.mail")}
              icon={<MdOutlineMail className="text-blue-700" />}
              defaultValue={savData.email || ""}
            />
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">
              {t("updatePage.productInfo")}
            </h3>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElInput
                placeholder="Produit"
                icon={<FaBarcode className="text-blue-700" />}
                name="product"
                defaultValue={savData.product || ""}
              />{" "}
              <ElInput
                placeholder="Fournisseur"
                name="supplier"
                icon={<FaTruck className="text-blue-700" />}
                defaultValue={savData.supplier || ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>{t("addPage.secondStep.warrantyLabel")}</label>
              <ElSelect
                icon={<MdOutlineHandshake className="text-blue-700" />}
                name="warranty"
                defaultValue={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              >
                <option value={"no"}>
                  {t("addPage.secondStep.warrantyOptions.no")}
                </option>
                <option value={"yes"}>
                  {t("addPage.secondStep.warrantyOptions.yes")}
                </option>
              </ElSelect>
              {warranty === "yes" && (
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                  <ElInput
                    placeholder={t("addPage.secondStep.purchaseDate")}
                    type="date"
                    name="date_purchase"
                    icon={<BsCalendarCheck className="text-blue-700" />}
                    defaultValue={formattedDate}
                  />
                  <ElInput
                    placeholder={t("addPage.secondStep.billNumber")}
                    name="bill_number"
                    icon={<TbFileInvoice className="text-blue-700" />}
                    defaultValue={savData.bill_number}
                    disabled
                    parentClassNames="!bg-gray-200 cursor-not-allowed"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElInput
                placeholder={t("addPage.secondStep.serialNumber")}
                icon={<MdOutlineNumbers className="text-blue-700" />}
                name="serial_number"
                defaultValue={savData.serial_number || ""}
              />{" "}
              <ElInput
                placeholder={t("addPage.secondStep.deadline")}
                name="deadline"
                icon={<PiClockCountdownBold className="text-blue-700" />}
                defaultValue={savData.deadline || ""}
                parentClassNames="!bg-gray-200 cursor-not-allowed"
                disabled
              />
            </div>
            <ElInput
              placeholder={t("addPage.secondStep.materialState")}
              name="material_state"
              icon={<GrStatusInfo className="text-blue-700" />}
              defaultValue={savData.material_state}
            />
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElTextarea
                placeholder="Accessoires"
                icon={<FiTool className="text-blue-700" />}
                name="accessories"
                defaultValue={savData.accessories}
              />{" "}
              <ElTextarea
                placeholder={t("addPage.secondStep.description")}
                name="description"
                icon={<LuMessageSquare className="text-blue-700" />}
                defaultValue={savData.description}
              />
            </div>
            <ElTextarea
              placeholder={t("addPage.secondStep.comment")}
              name="comment"
              icon={<MdOutlineComment className="text-blue-700" />}
              defaultValue={savData.comment}
            />
            <div className="flex gap-2">
              <span>Matériel</span>
              {savData.lend_machine !== "no" ? (
                <Link
                  href={`/parc-materiel/liste/${savData.lend_machine}`}
                  className="text-gray-400 hover:underline hover:text-gray-500"
                >
                  {materialName}
                </Link>
              ) : (
                <span>Aucun matériel</span>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-blue-700 hover:underline">
                <MdOutlineAttachFile className="text-xl" />
                <span>{t("addPage.secondStep.addFile")}</span>
                <input
                  type="file"
                  name="attachment"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-2 text-sm text-gray-600 flex flex-col gap-2">
                  {files.map((file, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-300 w-fit py-0.5 px-3 rounded-md"
                    >
                      📎 {file.name}
                    </li>
                  ))}
                </ul>
              )}
              {savData.attachment.length > 0 && (
                <ul className="mt-2 text-sm text-gray-600 flex flex-col gap-2">
                  {savData.attachment.map((url, index) => {
                    const baseUrl = process.env.NEXT_PUBLIC_OPEN_FILE_URL;
                    const filename = url.split("sav//")[1];

                    return (
                      <a
                        key={index}
                        href={`${baseUrl}?url=${url}&filename=${filename}`}
                        className="bg-orange-300 w-fit py-0.5 px-3 rounded-md flex items-center gap-3"
                      >
                        <MdFileDownload /> {filename}
                      </a>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
          <ElButton
            type="submit"
            disabled={isPending}
            icon={isPending ? <CustomSpinner /> : undefined}
            classNames="self-center w-2/3 lg:w-1/3"
            label={t("updatePage.btnUpdate")}
          />
          <GoBackButton link="/sav/liste" />
        </form>
      </div>
    </div>
  );
};

export default SavUpdateForm;
