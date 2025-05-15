"use client";

import ElInput from "./custom/ElInput";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaBarcode, FaTruck } from "react-icons/fa6";
import { toast } from "react-toastify";
import ElSelect from "./custom/ElSelect";
import ElTextarea from "./custom/ElTextarea";
import { RentalQuery } from "@/types";
import {
  MdDevices,
  MdOutlineAttachFile,
  MdOutlineComment,
  MdOutlineHandshake,
  MdOutlineMail,
  MdOutlineNumbers,
  MdOutlinePerson,
  MdOutlinePhone,
} from "react-icons/md";
import { PiClockCountdownBold } from "react-icons/pi";
import { LuMessageSquare } from "react-icons/lu";
import { FiTool } from "react-icons/fi";
import { TbFileInvoice } from "react-icons/tb";
import { BsCalendarCheck } from "react-icons/bs";
import { customDateFormat } from "@/lib/utils";
import { savFilesValidation, savFormSchemaValidation } from "@/lib/validation";
import { addNewSav } from "@/lib/actions/actions.sav";
import { useRouter } from "next/navigation";
import { GrStatusInfo } from "react-icons/gr";

export type SavFormData = {
  product: string;
  supplier: string;
  warranty: "yes" | "no";
  date_purchase: string;
  bill_number: string;
  serial_number: string;
  deadline: string;
  material_state: string;
  accessories: string;
  description: string;
  comment: string;
  lend_machine: string;
  client: string;
  phone: string;
  email: string;
  sku: string;
};

const testData = {
  supplier: "Sony Test",
  product: "PS5 Pro Test",
};

type Props = {
  materials: Record<string, RentalQuery[]> | null | undefined;
};

const SavFormAdd = ({ materials }: Props) => {
  const [firstPartVisible, setFirstPartVisible] = useState(true);
  const [eanCode, setEanCode] = useState("");
  const [attachment, setAttachment] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [savForm, setSavForm] = useState<SavFormData>({
    product: "",
    supplier: "",
    warranty: "no",
    date_purchase: "",
    bill_number: "",
    serial_number: "",
    deadline: "",
    material_state: "",
    accessories: "",
    description: "",
    comment: "",
    lend_machine: "no",
    client: "",
    phone: "",
    email: "",
    sku: eanCode,
  });

  console.log(savForm);

  const handleResearch = (e: FormEvent) => {
    e.preventDefault();

    if (eanCode === "123456789") {
      setFirstPartVisible(false);
      setSavForm((prev) => ({
        ...prev,
        product: testData.product,
        supplier: testData.supplier,
      }));
    } else {
      toast.error("Code incorrect.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachment(Array.from(files));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("name:", name, "value:", value);
    setSavForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const files = attachment;

    const fileCheck = savFilesValidation.safeParse({ files });

    if (!fileCheck.success) {
      toast.error("Erreur des fichiers.");
      setIsSubmitting(false);
      return;
    }

    let formattedDate: string | undefined = "";
    if (savForm.warranty === "yes") {
      formattedDate = customDateFormat(savForm.date_purchase);
      if (!savForm.bill_number) {
        toast.error("Numéro de série est obligatoire.");
        setIsSubmitting(false);
        return;
      }
      if (!formattedDate) {
        setIsSubmitting(false);
        return;
      }
    }

    const formData = {
      ...savForm,
      date_purchase: formattedDate,
    };

    const result = savFormSchemaValidation.safeParse(formData);

    if (!result.success) {
      result.error.errors.map((item) => toast.error(String(item.message)));
      setIsSubmitting(false);
    } else {
      console.log("att", attachment);

      const res = await addNewSav(formData, attachment);

      if (res.success) {
        setIsSubmitting(false);
        router.push("/sav/liste");
        toast.success("Ajouté avec succès.");
      }
    }
  };

  return (
    <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-md flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Ajouter un sav</h1>
      {firstPartVisible ? (
        <form onSubmit={handleResearch} className="flex flex-col gap-4">
          <ElInput
            placeholder="Code BV / EAN"
            icon={<FaBarcode className="text-blue-700" />}
            value={eanCode}
            onChange={(e) => setEanCode(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 duration-300 text-white rounded-lg px-6 py-2 cursor-pointer"
            >
              Rechercher
            </button>
            <span
              onClick={() => setFirstPartVisible(false)}
              className="px-6 py-2 cursor-pointer rounded-lg text-blue-900 bg-transparent hover:bg-gray-100 transition-all duration-300"
            >
              Passer cette étape
            </span>
          </div>
        </form>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElInput
                placeholder="Produit"
                icon={<FaBarcode className="text-blue-700" />}
                name="product"
                value={savForm.product}
                onChange={handleChange}
              />{" "}
              <ElInput
                placeholder="Fournisseur"
                name="supplier"
                icon={<FaTruck className="text-blue-700" />}
                value={savForm.supplier}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Sous garantie</label>
              <ElSelect
                value={savForm.warranty}
                icon={<MdOutlineHandshake className="text-blue-700" />}
                name="warranty"
                onChange={handleChange}
              >
                <option value={"no"}>Non</option>
                <option value={"yes"}>Oui</option>
              </ElSelect>
              {savForm.warranty === "yes" && (
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                  <ElInput
                    placeholder="Date d'achat"
                    type="text"
                    name="date_purchase"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    icon={<BsCalendarCheck className="text-blue-700" />}
                    value={savForm.date_purchase}
                    onChange={handleChange}
                  />{" "}
                  <ElInput
                    placeholder="Numéro facture"
                    name="bill_number"
                    icon={<TbFileInvoice className="text-blue-700" />}
                    value={savForm.bill_number}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElInput
                placeholder="Numéro de série"
                icon={<MdOutlineNumbers className="text-blue-700" />}
                name="serial_number"
                value={savForm.serial_number}
                onChange={handleChange}
              />{" "}
              <ElInput
                placeholder="Délai estimé du SAV (en jour)"
                name="deadline"
                icon={<PiClockCountdownBold className="text-blue-700" />}
                value={savForm.deadline}
                onChange={handleChange}
              />
            </div>
            <ElInput
              placeholder="Etat du matériel"
              name="material_state"
              icon={<GrStatusInfo className="text-blue-700" />}
              value={savForm.material_state}
              onChange={handleChange}
            />
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
              <ElTextarea
                placeholder="Accessoires"
                icon={<FiTool className="text-blue-700" />}
                name="accessories"
                value={savForm.accessories}
                onChange={handleChange}
              />{" "}
              <ElTextarea
                placeholder="Description de la panne"
                name="description"
                icon={<LuMessageSquare className="text-blue-700" />}
                value={savForm.description}
                onChange={handleChange}
              />
            </div>
            <ElTextarea
              placeholder="Commentaire du vendeur"
              name="comment"
              icon={<MdOutlineComment className="text-blue-700" />}
              value={savForm.comment}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-2">
              <label>Prêt du matériel</label>
              <ElSelect
                name="lend_machine"
                icon={<MdDevices className="text-blue-700" />}
                value={savForm.lend_machine}
                onChange={handleChange}
              >
                <option value={"no"}>Non</option>
                {materials && (
                  <>
                    {Object.entries(materials).map(([section, items]) => (
                      <optgroup key={section} label={section}>
                        {items.length > 0 ? (
                          items.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Aucun matériel disponible.</option>
                        )}
                      </optgroup>
                    ))}
                  </>
                )}
              </ElSelect>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-blue-700 hover:underline">
                <MdOutlineAttachFile className="text-xl" />
                <span>Ajouter une pièce jointe</span>
                <input
                  type="file"
                  name="attachment"
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />
              </label>
              {attachment.length > 0 && (
                <ul className="mt-2 text-sm text-gray-600 flex flex-col gap-2">
                  {attachment.map((file, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-300 w-fit py-0.5 px-3 rounded-md"
                    >
                      📎 {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <section>
              <h3 className="font-semibold">Informations client</h3>
              <div className="mt-2 flex flex-col lg:flex-row gap-4 lg:gap-7">
                <ElInput
                  name="client"
                  placeholder={"Client"}
                  icon={<MdOutlinePerson className="text-blue-700" />}
                  value={savForm.client}
                  onChange={handleChange}
                />
                <ElInput
                  name="phone"
                  placeholder={"Tél"}
                  icon={<MdOutlinePhone className="text-blue-700" />}
                  value={savForm.phone}
                  onChange={handleChange}
                />
                <ElInput
                  name="email"
                  placeholder="Email"
                  icon={<MdOutlineMail className="text-blue-700" />}
                  value={savForm.email}
                  onChange={handleChange}
                />
              </div>
            </section>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-800 duration-300 text-white rounded-lg px-6 py-2 cursor-pointer"
            >
              Ajouter
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SavFormAdd;
