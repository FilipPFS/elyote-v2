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

type Props = {
  savData: SavData;
  materialName: string;
};

const SavUpdateForm = ({ savData, materialName }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [warranty, setWarranty] = useState(savData.warranty);
  const date = new Date(savData.date_purchase);
  const formattedDate = isNaN(date.getTime())
    ? ""
    : date.toISOString().split("T")[0];

  const [state, action, isPending] = useActionState(updateSav, {});
  const router = useRouter();

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
      toast.success("Succes");
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
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Code SAV: {savData.code_sav}</h1>
      <div>
        <form action={action} className="flex flex-col gap-4">
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Informations client</h3>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <input type="hidden" name="id" defaultValue={savData.id} />
              <ElInput
                name="client"
                placeholder={"Client"}
                icon={<MdOutlinePerson className="text-blue-700" />}
                defaultValue={savData.client || ""}
              />
              <ElInput
                name="phone"
                placeholder={"Tél"}
                icon={<MdOutlinePhone className="text-blue-700" />}
                defaultValue={savData.phone || ""}
              />
            </div>
            <ElInput
              name="email"
              placeholder="Email"
              icon={<MdOutlineMail className="text-blue-700" />}
              defaultValue={savData.email || ""}
            />
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Informations produit</h3>
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
              <label>Sous garantie</label>
              <ElSelect
                icon={<MdOutlineHandshake className="text-blue-700" />}
                name="warranty"
                defaultValue={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              >
                <option value={"no"}>Non</option>
                <option value={"yes"}>Oui</option>
              </ElSelect>
              {warranty === "yes" && (
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                  <ElInput
                    placeholder="Date d'achat"
                    type="date"
                    name="date_purchase"
                    icon={<BsCalendarCheck className="text-blue-700" />}
                    defaultValue={formattedDate}
                  />
                  <ElInput
                    placeholder="Numéro facture"
                    name="bill_number"
                    icon={<TbFileInvoice className="text-blue-700" />}
                    defaultValue={savData.bill_number}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElInput
                placeholder="Numéro de série"
                icon={<MdOutlineNumbers className="text-blue-700" />}
                name="serial_number"
                defaultValue={savData.serial_number || ""}
              />{" "}
              <ElInput
                placeholder="Délai estimé du SAV (en jour)"
                name="deadline"
                icon={<PiClockCountdownBold className="text-blue-700" />}
                defaultValue={savData.deadline || ""}
              />
            </div>
            <ElInput
              placeholder="Etat du matériel"
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
                placeholder="Description de la panne"
                name="description"
                icon={<LuMessageSquare className="text-blue-700" />}
              />
            </div>
            <ElTextarea
              placeholder="Commentaire du vendeur"
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
                <span>Ajouter une pièce jointe</span>
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
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-800 duration-300 text-white rounded-lg px-6 py-2 cursor-pointer"
          >
            Mettre à jour le SAV
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavUpdateForm;
